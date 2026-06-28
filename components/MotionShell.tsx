"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function GlowCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`rounded-md border border-white/10 bg-white/[0.055] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function FloatingParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,217,255,0.18),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(124,58,237,0.18),transparent_30%),linear-gradient(180deg,#0B1220_0%,#111827_58%,#070b14_100%)]" />
      {Array.from({ length: 22 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-cyan-200/70 shadow-[0_0_18px_rgba(0,217,255,0.9)]"
          style={{
            left: `${(index * 37) % 100}%`,
            top: `${(index * 19) % 100}%`,
          }}
          animate={{
            y: [0, -26, 0],
            opacity: [0.22, 0.85, 0.22],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 4 + (index % 5),
            repeat: Infinity,
            delay: index * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
