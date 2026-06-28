"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Cpu,
  RadioTower,
  Route,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { AppNavbar } from "./AppNavbar";
import { BatteryModel } from "./BatteryModel";
import { FloatingParticles, GlowCard, PageShell, Reveal } from "./MotionShell";

const features = [
  {
    title: "Failure Chain Prediction",
    text: "Models micro-cracks, cell imbalance, and heat signatures as one evolving risk chain.",
    icon: BrainCircuit,
  },
  {
    title: "Route-Aware Battery Intelligence",
    text: "Understands potholes, elevation, climate, and driving load before the pack is stressed.",
    icon: Route,
  },
  {
    title: "AI Crash Prevention",
    text: "Recommends cooling, torque limits, routing, or emergency isolation before danger escalates.",
    icon: ShieldCheck,
  },
];

const architecture = [
  { label: "Sensors", icon: RadioTower, text: "Cell, thermal, vibration, GPS" },
  { label: "AI Models", icon: BrainCircuit, text: "Failure chain and road stress inference" },
  { label: "Decision Engine", icon: Cpu, text: "Risk scoring and intervention logic" },
  { label: "Safety Action", icon: ShieldCheck, text: "Cooling, route, torque, isolation" },
];

export function LandingPage() {
  return (
    <PageShell>
      <FloatingParticles />
      <AppNavbar />
      <main>
        <section className="mx-auto grid min-h-[calc(100vh-80px)] w-full max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.03fr_0.97fr] lg:py-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 rounded-md border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100"
            >
              <Zap className="h-4 w-4" />
              EV battery intelligence for safer roads
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-8 max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl"
            >
              AI Battery Safety Co-Pilot for EVs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
            >
              Predict hidden failures, understand road stress, and prevent
              battery-related EV accidents.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/dashboard"
                className="inline-flex min-w-[11rem] h-12 items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 text-sm font-bold text-[#07111f] shadow-[0_0_42px_rgba(0,217,255,0.36)] transition hover:bg-white"
              >
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/simulation"
                className="inline-flex min-w-[11rem] h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-6 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-purple-300/60 hover:bg-purple-400/10"
              >
                Run Simulation
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="relative"
          >
            <div className="absolute inset-6 rounded-full bg-cyan-300/20 blur-3xl" />
            <motion.div
              className="absolute -left-4 top-12 hidden rounded-md border border-cyan-300/25 bg-[#0B1220]/70 px-4 py-3 text-sm text-cyan-100 shadow-[0_0_30px_rgba(0,217,255,0.22)] backdrop-blur-xl sm:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              Predictive SOH 91%
            </motion.div>
            <motion.div
              className="absolute -right-2 bottom-16 hidden rounded-md border border-purple-300/25 bg-[#0B1220]/70 px-4 py-3 text-sm text-purple-100 shadow-[0_0_30px_rgba(124,58,237,0.25)] backdrop-blur-xl sm:block"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut" }}
            >
              Stress Score 22
            </motion.div>
            <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.04] shadow-[0_30px_110px_rgba(0,217,255,0.16)] backdrop-blur-2xl">
              <div className="absolute inset-x-10 top-10 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
              <BatteryModel />
            </div>
          </motion.div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
          <Reveal>
            <div className="mb-8 max-w-3xl">
              <p className="text-sm font-semibold uppercase text-cyan-200">
                Co-Pilot Capabilities
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Built to see battery danger before drivers can feel it.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <GlowCard
                    key={feature.title}
                    className="group relative overflow-hidden p-6 transition hover:border-cyan-300/45 hover:shadow-[0_0_56px_rgba(0,217,255,0.18)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-transparent to-purple-500/10 opacity-0 transition group-hover:opacity-100" />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <Icon className="h-9 w-9 text-cyan-200" />
                        <span className="text-sm font-bold text-purple-200">
                          0{index + 1}
                        </span>
                      </div>
                    <h2 className="mt-5 text-xl font-semibold text-white">
                      {feature.title}
                    </h2>
                    <p className="mt-3 leading-7 text-slate-300">{feature.text}</p>
                    </div>
                  </GlowCard>
                );
              })}
            </div>
          </Reveal>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 pb-24 pt-8 sm:px-8">
          <Reveal>
            <div className="border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl sm:p-8">
              <p className="text-sm font-semibold uppercase text-cyan-200">
                Safety Architecture
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Real-time intelligence from signal to safety response.
              </h2>
              <div className="mt-9 grid gap-4 md:grid-cols-4">
                {architecture.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative rounded-md border border-cyan-300/20 bg-[#0B1220]/70 p-5 shadow-[0_0_34px_rgba(0,217,255,0.08)]"
                  >
                    {index < architecture.length - 1 ? (
                      <motion.div
                        className="absolute left-[calc(100%+0.25rem)] top-1/2 z-10 hidden h-px w-3 bg-cyan-300/70 md:block"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.3 + index * 0.12 }}
                      />
                    ) : null}
                    <span className="text-xs font-bold text-purple-200">
                      0{index + 1}
                    </span>
                    <item.icon className="mt-5 h-7 w-7 text-cyan-200" />
                    <h3 className="mt-3 text-lg font-semibold text-white">
                      {item.label}
                    </h3>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
                      {item.text}
                    </p>
                    <div className="mt-5 h-1 rounded-full bg-slate-800">
                      <motion.div
                        className="h-full rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(0,217,255,0.8)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 + index * 0.12 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </PageShell>
  );
}
