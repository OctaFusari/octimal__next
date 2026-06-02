"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import SplitText from "@/components/ui/SplitText";
import AnimateInView from "@/components/ui/AnimateInView";
import { fadeUp, fadeRight, staggerContainer } from "@/lib/motionVariants";

const ThreeRings = dynamic(() => import("@/components/three/ThreeRings"), {
  ssr: false,
});

export default function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Three.js rings */}
      <div className="absolute inset-0">
        <ThreeRings
          className="opacity-80"
          scrollY={scrollY}
          scrollInfluence={0.003}
        />
      </div>

      {/* Gradient vignette left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(10,10,10,0.85) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 px-[8vw] "
      >
        {/* Eyebrow 
        <AnimateInView variants={fadeUp} delay={0.1}>
          <p className="section-label mb-6">UX/UI agency</p>
        </AnimateInView>*/}

        {/* Headline */}
        <div>
          <SplitText
            text="Developing"
            tag="h1"
            once={false}
            delay={0.15}
            className="text-light"
            style={
              {
                fontFamily: "var(--font-montserrat)",
                fontSize: "clamp(3rem, 7.5vw, 6rem)",
                fontWeight: 300,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              } as React.CSSProperties
            }
          />
        </div>
        <div className="mb-6">
          <SplitText
            text="dreams"
            tag="h1"
            once={false}
            delay={0.15}
            className="text-light"
            style={
              {
                fontFamily: "var(--font-montserrat)",
                fontSize: "clamp(3rem, 7.5vw, 6rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              } as React.CSSProperties
            }
          />
        </div>

        {/* Sub */}
        <AnimateInView variants={fadeUp} delay={0.4}>
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "1.5rem",
              color: "var(--muted)",
              lineHeight: 1.85,
              maxWidth: "480px",
              fontWeight: 300,
              letterSpacing: "0.03em",
            }}
          >
            We design digital experiences starting with what really matters,
          </p>
        </AnimateInView>
        <AnimateInView variants={fadeUp} delay={0.4} className="mb-10">
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "2rem",
              color: "var(--muted)",
              lineHeight: 1.85,
              maxWidth: "480px",
              fontWeight: 300,
              letterSpacing: "0.03em",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #1bA97a, #FF00E5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0px 2px 12px rgba(58, 47, 136, 0.5))",
              }}
            >
              people.
            </span>
          </p>
        </AnimateInView>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-[10vw] z-10 flex items-center gap-4"
      >
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "rgba(255,255,255,0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={{ y: ["−100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "50%",
              background:
                "linear-gradient(to bottom, transparent, var(--teal))",
            }}
          />
        </div>
        <span
          style={{
            writingMode: "vertical-rl",
            fontSize: "0.65rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          Scroll
        </span>
      </motion.div>

      {/* Bottom counter line */}
      <AnimateInView
        variants={fadeUp}
        delay={0.8}
        className="absolute bottom-10 right-[10vw] z-10 flex gap-10"
      >
        {[
          ["3+", "continents"],
          ["20+", "projects"],
          ["6", "sectors"],
        ].map(([n, l]) => (
          <div key={l} style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 700,
                fontSize: "1.6rem",
                background:
                  "linear-gradient(135deg, var(--teal), var(--purple))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {n}
            </div>
            <div
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "0.7rem",
                color: "var(--muted)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              {l}
            </div>
          </div>
        ))}
      </AnimateInView>
    </section>
  );
}
