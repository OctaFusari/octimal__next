"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";

interface RingConfig {
  // Initial orientation — baked into geometry so vertex colors reflect true Z depth
  bakeRotX: number;
  bakeRotY: number;
  bakeRotZ: number;
  // World position
  position: [number, number, number];
  // Ongoing rotation speeds (rad/frame)
  speedX: number;
  speedY: number;
  speedZ: number;
  // Geometry
  radius: number;
  tubeRadius: number;
  // Colors: color1 = deep/low Z, color2 = near/high Z
  color1: string;
  color2: string;
  // Floating breath
  floatAmp: number;
  floatFreq: number;
  phase: number;
}

interface RingState {
  mesh: THREE.Mesh;
  config: RingConfig;
  time: number;
  spinVel: number;
  wobbleVel: number;
  wobbleAng: number;
}

interface ThreeRingsProps {
  configs?: RingConfig[];
  className?: string;
  scrollY?: number;
  scrollInfluence?: number;
}

const DEFAULT_CONFIGS: RingConfig[] = [
  {
    // Large center ring — tall & tilted (the logo ring)
    bakeRotX: Math.PI * 0.10,
    bakeRotY: 0.04,
    bakeRotZ: 0.05,
    position: [2.8, -0.5, 0],
    speedX: 0.000,
    speedY: 0.004,
    speedZ: 0.000,
    radius: 1.8,
    tubeRadius: 0.175,
    color1: "#3a2f88",
    color2: "#1bA97a",
    floatAmp: 0.12,
    floatFreq: 0.5,
    phase: 0,
  },
  {
    // Small upper-right ring — moderately tilted
    bakeRotX: Math.PI * 0.20,
    bakeRotY: 0.08,
    bakeRotZ: -0.18,
    position: [4.5, 3.1, -0.5],
    speedX: 0.000,
    speedY: -0.006,
    speedZ: 0.000,
    radius: 1.15,
    tubeRadius: 0.115,
    color1: "#3a2f88",
    color2: "#1bA97a",
    floatAmp: 0.10,
    floatFreq: 0.7,
    phase: 1.8,
  },
  {
    // Flat bottom-left ring — nearly horizontal
    bakeRotX: Math.PI * 0.44,
    bakeRotY: 0.0,
    bakeRotZ: -0.38,
    position: [-0, -3.05, 0.3],
    speedX: 0.000,
    speedY: 0.003,
    speedZ: 0.000,
    radius: 1.15,
    tubeRadius: 0.085,
    color1: "#3a2f88",
    color2: "#1bA97a",
    floatAmp: 0.08,
    floatFreq: 0.4,
    phase: 3.2,
  },
];

export default function ThreeRings({
  configs = DEFAULT_CONFIGS,
  className = "",
  scrollY = 0,
  scrollInfluence = 0.002,
}: ThreeRingsProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    rings: RingState[];
    mouse: THREE.Vector2;
    targetMouse: THREE.Vector2;
    raycaster: THREE.Raycaster;
    prevHovered: Set<THREE.Mesh>;
    meshes: THREE.Mesh[];
    frameId: number;
    clock: THREE.Clock;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;
    const w = el.offsetWidth;
    const h = el.offsetHeight;

    // ── Scene ──────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // Camera pulled back to match the HTML version's framing
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // ── Rings ──────────────────────────────────────────────────────────────────
    const rings: RingState[] = [];
    const meshes: THREE.Mesh[] = [];

    configs.forEach((cfg) => {
      const geometry = new THREE.TorusGeometry(cfg.radius, cfg.tubeRadius, 128, 256);

      // Bake the initial orientation INTO the geometry so that vertex Z values
      // already reflect the visual depth before we compute the gradient.
      geometry.rotateX(cfg.bakeRotX);
      geometry.rotateY(cfg.bakeRotY);
      geometry.rotateZ(cfg.bakeRotZ);

      // Find Z range after baking
      const posArr = geometry.attributes.position;
      let zMin = Infinity, zMax = -Infinity;
      for (let i = 0; i < posArr.count; i++) {
        const z = posArr.getZ(i);
        if (z < zMin) zMin = z;
        if (z > zMax) zMax = z;
      }

      // Per-vertex color: lerp from color1 (deep) → color2 (near)
      const c1 = new THREE.Color(cfg.color1);
      const c2 = new THREE.Color(cfg.color2);
      const colorBuf = new Float32Array(posArr.count * 3);
      const tmp = new THREE.Color();
      for (let i = 0; i < posArr.count; i++) {
        const t = (posArr.getZ(i) - zMin) / (zMax - zMin);
        tmp.lerpColors(c1, c2, t);
        colorBuf[i * 3]     = tmp.r;
        colorBuf[i * 3 + 1] = tmp.g;
        colorBuf[i * 3 + 2] = tmp.b;
      }
      geometry.setAttribute("color", new THREE.BufferAttribute(colorBuf, 3));

      const material = new THREE.MeshBasicMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...cfg.position);
      // mesh.rotation starts at (0,0,0) — the tilt is already baked into geometry
      scene.add(mesh);
      meshes.push(mesh);

      rings.push({
        mesh,
        config: cfg,
        time: cfg.phase,
        spinVel: 0,
        wobbleVel: 0,
        wobbleAng: 0,
      });
    });

    // ── Input tracking ─────────────────────────────────────────────────────────
    const mouse       = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    const raycaster   = new THREE.Raycaster();
    const prevHovered = new Set<THREE.Mesh>();
    const clock       = new THREE.Clock();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      targetMouse.x =  ((e.clientX - rect.left) / w - 0.5) * 2;
      targetMouse.y = -((e.clientY - rect.top)  / h - 0.5) * 2;

      // Hover — trigger spin only on cursor-enter
      raycaster.setFromCamera(targetMouse, camera);
      const hits       = raycaster.intersectObjects(meshes);
      const nowHovered = new Set(hits.map((h) => h.object as THREE.Mesh));

      rings.forEach((r) => {
        if (nowHovered.has(r.mesh) && !prevHovered.has(r.mesh)) {
          r.spinVel   = 0.05 * (Math.random() > 0.5 ? 1 : -1);
          r.wobbleVel = 0.02;
        }
      });

      prevHovered.clear();
      nowHovered.forEach((m) => prevHovered.add(m));
    };

    const handleClick = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cm = new THREE.Vector2(
         ((e.clientX - rect.left) / w - 0.5) * 2,
        -((e.clientY - rect.top)  / h - 0.5) * 2,
      );
      raycaster.setFromCamera(cm, camera);
      raycaster.intersectObjects(meshes).forEach((h) => {
        const ring = rings.find((r) => r.mesh === h.object);
        if (ring) {
          ring.spinVel   = 0.22 * (Math.random() > 0.5 ? 1 : -1);
          ring.wobbleVel = 0.1;
        }
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t    = e.touches[0];
      const rect = el.getBoundingClientRect();
      targetMouse.x =  ((t.clientX - rect.left) / w - 0.5) * 2;
      targetMouse.y = -((t.clientY - rect.top)  / h - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click",     handleClick);
    el.addEventListener("touchmove", handleTouchMove, { passive: true });

    // ── Animation loop ─────────────────────────────────────────────────────────
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const dt = clock.getDelta();

      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      rings.forEach((r) => {
        r.time += dt;
        const { mesh, config: cfg } = r;

        // Constant ambient Y rotation + mouse parallax + hover spin impulse
        mesh.rotation.x += cfg.speedX + mouse.y * 0.003;
        mesh.rotation.y += cfg.speedY + mouse.x * 0.003 + r.spinVel;
        mesh.rotation.z += cfg.speedZ;

        // Hover spin deceleration
        r.spinVel *= 0.962;
        if (Math.abs(r.spinVel) < 0.0001) r.spinVel = 0;

        // Coin-precession wobble
        r.wobbleAng  += r.wobbleVel * 1.8;
        mesh.rotation.z += Math.sin(r.wobbleAng) * Math.min(0.22, r.wobbleVel * 3.5);
        r.wobbleVel  *= 0.96;
        if (Math.abs(r.wobbleVel) < 0.0001) r.wobbleVel = 0;

        // Floating breath
        mesh.position.y =
          cfg.position[1] + Math.sin(r.time * cfg.floatFreq) * cfg.floatAmp;
        mesh.position.x =
          cfg.position[0] +
          Math.cos(r.time * cfg.floatFreq * 0.6) * (cfg.floatAmp * 0.4) +
          mouse.x * 0.1;
      });

      // Subtle camera parallax
      camera.position.x += (mouse.x * 0.15 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 0.10 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ─────────────────────────────────────────────────────────────────
    const handleResize = () => {
      const w2 = el.offsetWidth;
      const h2 = el.offsetHeight;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    };
    window.addEventListener("resize", handleResize);

    sceneRef.current = {
      renderer, scene, camera,
      rings, mouse, targetMouse,
      raycaster, prevHovered, meshes,
      frameId, clock,
    };

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click",     handleClick);
      window.removeEventListener("resize",    handleResize);
      el.removeEventListener("touchmove", handleTouchMove);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  // ── Scroll influence ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.rings.forEach(({ mesh, config }) => {
      mesh.position.y =
        config.position[1] + scrollY * scrollInfluence * (config.floatAmp * 2);
    });
  }, [scrollY, scrollInfluence]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}