'use client'
import { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'

interface RingConfig {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  speedX: number
  speedY: number
  speedZ: number
  tubeRadius: number
  color1: string
  color2: string
  floatAmp: number
  floatFreq: number
  phase: number
}

interface ThreeRingsProps {
  configs?: RingConfig[]
  className?: string
  scrollY?: number
  scrollInfluence?: number
}

const DEFAULT_CONFIGS: RingConfig[] = [
  {
    position: [3.5, 1.5, -1],
    rotation: [0.4, 0.2, -0.3],
    scale: 1.4,
    speedX: 0.003, speedY: 0.005, speedZ: 0.002,
    tubeRadius: 0.08,
    color1: '#00C9A7', color2: '#7B4FD8',
    floatAmp: 0.18, floatFreq: 0.7, phase: 0,
  },
  {
    position: [2.5, -1.2, -2],
    rotation: [-0.6, 0.8, 0.4],
    scale: 1.1,
    speedX: -0.004, speedY: 0.003, speedZ: 0.005,
    tubeRadius: 0.07,
    color1: '#7B4FD8', color2: '#00C9A7',
    floatAmp: 0.22, floatFreq: 0.5, phase: 1.8,
  },
  {
    position: [-1.5, 2.5, -3],
    rotation: [1.0, -0.3, 0.6],
    scale: 0.9,
    speedX: 0.006, speedY: -0.004, speedZ: 0.003,
    tubeRadius: 0.065,
    color1: '#00C9A7', color2: '#9B6FE8',
    floatAmp: 0.15, floatFreq: 0.9, phase: 3.2,
  },
]

export default function ThreeRings({ configs = DEFAULT_CONFIGS, className = '', scrollY = 0, scrollInfluence = 0.002 }: ThreeRingsProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    rings: Array<{ mesh: THREE.Mesh; config: RingConfig; time: number }>
    mouse: THREE.Vector2
    targetMouse: THREE.Vector2
    frameId: number
    clock: THREE.Clock
  } | null>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const el = mountRef.current
    const w = el.offsetWidth
    const h = el.offsetHeight

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100)
    camera.position.set(0, 0, 5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // Build rings
    const rings: typeof sceneRef.current extends null ? never : NonNullable<typeof sceneRef.current>['rings'] = []

    configs.forEach((cfg) => {
      const geometry = new THREE.TorusGeometry(1, cfg.tubeRadius, 64, 128)

      // Gradient-like material using vertex colors
      const c1 = new THREE.Color(cfg.color1)
      const c2 = new THREE.Color(cfg.color2)
      const posArr = geometry.attributes.position
      const colors: number[] = []
      for (let i = 0; i < posArr.count; i++) {
        const t = (i / posArr.count)
        const c = new THREE.Color().lerpColors(c1, c2, t)
        colors.push(c.r, c.g, c.b)
      }
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

      const material = new THREE.MeshBasicMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(...cfg.position)
      mesh.rotation.set(...cfg.rotation)
      mesh.scale.setScalar(cfg.scale)
      scene.add(mesh)
      rings.push({ mesh, config: cfg, time: cfg.phase })
    })

    const mouse = new THREE.Vector2(0, 0)
    const targetMouse = new THREE.Vector2(0, 0)
    const clock = new THREE.Clock()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      targetMouse.x = ((e.clientX - rect.left) / w - 0.5) * 2
      targetMouse.y = -((e.clientY - rect.top) / h - 0.5) * 2
    }
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      const rect = el.getBoundingClientRect()
      targetMouse.x = ((t.clientX - rect.left) / w - 0.5) * 2
      targetMouse.y = -((t.clientY - rect.top) / h - 0.5) * 2
    }

    window.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('touchmove', handleTouchMove, { passive: true })

    let frameId: number
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const dt = clock.getDelta()

      mouse.x += (targetMouse.x - mouse.x) * 0.05
      mouse.y += (targetMouse.y - mouse.y) * 0.05

      rings.forEach(({ mesh, config }, i) => {
        rings[i].time += dt
        const t = rings[i].time

        // Continuous rotation
        mesh.rotation.x += config.speedX + mouse.y * 0.004
        mesh.rotation.y += config.speedY + mouse.x * 0.004
        mesh.rotation.z += config.speedZ

        // Floating
        mesh.position.y = config.position[1] + Math.sin(t * config.floatFreq) * config.floatAmp
        mesh.position.x = config.position[0] + Math.cos(t * config.floatFreq * 0.6) * (config.floatAmp * 0.5) + mouse.x * 0.12
      })

      // Subtle camera parallax
      camera.position.x += (mouse.x * 0.15 - camera.position.x) * 0.04
      camera.position.y += (mouse.y * 0.1 - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    // Resize
    const handleResize = () => {
      const w2 = el.offsetWidth
      const h2 = el.offsetHeight
      camera.aspect = w2 / h2
      camera.updateProjectionMatrix()
      renderer.setSize(w2, h2)
    }
    window.addEventListener('resize', handleResize)

    sceneRef.current = { renderer, scene, camera, rings, mouse, targetMouse, frameId, clock }

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      el.removeEventListener('touchmove', handleTouchMove)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  // React to scroll
  useEffect(() => {
    if (!sceneRef.current) return
    sceneRef.current.rings.forEach(({ mesh, config }) => {
      mesh.position.y = config.position[1] + scrollY * scrollInfluence * (config.floatAmp * 2)
    })
  }, [scrollY, scrollInfluence])

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  )
}
