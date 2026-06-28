"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  AlertOctagon,
  ArrowRight,
  BrainCircuit,
  Car,
  Flame,
  Gauge,
  Radar,
  ShieldAlert,
  Snowflake,
  Zap,
} from "lucide-react";
import { AppNavbar } from "./AppNavbar";
import { BatteryModel } from "./BatteryModel";
import { FloatingParticles, GlowCard, PageShell } from "./MotionShell";

type ScenarioLevel = "Safe" | "Warning" | "Critical";

type Scenario = {
  name: string;
  label: string;
  risk: number;
  level: ScenarioLevel;
  icon: LucideIcon;
  signal: string;
  chain: string[];
  recommendation: string[];
  action: string;
};

const scenarios: Scenario[] = [
  {
    name: "Pothole Impact",
    label: "Road shock event",
    risk: 46,
    level: "Warning",
    icon: ShieldAlert,
    signal: "High-frequency vibration detected across lower module rails.",
    chain: ["Pothole Impact", "Micro Crack", "Resistance Rise", "Heat Spike", "Thermal Runaway"],
    recommendation: ["Reduce torque by 30%", "Run pack isolation check", "Avoid high-load acceleration"],
    action: "Limit drivetrain peaks for the next 6 km.",
  },
  {
    name: "Heat Wave",
    label: "Ambient thermal load",
    risk: 62,
    level: "Warning",
    icon: Flame,
    signal: "Cooling margin compressed under sustained high ambient temperature.",
    chain: ["Heat Wave", "Coolant Saturation", "Thermal Gradient", "Cell Aging", "Heat Spike"],
    recommendation: ["Enable active cooling", "Lower fast-charge ceiling", "Precondition pack before parking"],
    action: "Prioritize active cooling and reduce charge intake.",
  },
  {
    name: "Crash Event",
    label: "Critical impact vector",
    risk: 86,
    level: "Critical",
    icon: AlertOctagon,
    signal: "Impact vector indicates possible enclosure deformation near busbar path.",
    chain: ["Crash Event", "Separator Damage", "Internal Short", "Gas Venting", "Thermal Runaway"],
    recommendation: ["Enter safe mode if critical", "Open high-voltage contactors", "Request service inspection"],
    action: "Trigger safe mode and isolate high-voltage systems.",
  },
  {
    name: "Aggressive Driving",
    label: "Discharge stress pattern",
    risk: 28,
    level: "Safe",
    icon: Gauge,
    signal: "Repeated torque bursts detected, but thermal headroom remains healthy.",
    chain: ["Aggressive Driving", "Current Spike", "Cell Imbalance", "Resistance Drift", "Range Loss"],
    recommendation: ["Smooth torque delivery", "Maintain regenerative braking", "Continue AI monitoring"],
    action: "Keep vehicle in monitored performance mode.",
  },
];

const levelStyles: Record<
  ScenarioLevel,
  {
    text: string;
    ring: string;
    bg: string;
    glow: string;
    bar: string;
    pulseSpeed: number;
  }
> = {
  Safe: {
    text: "text-emerald-100",
    ring: "border-emerald-300/45",
    bg: "bg-emerald-300/10",
    glow: "rgba(52,211,153,0.34)",
    bar: "from-emerald-300 via-cyan-300 to-blue-400",
    pulseSpeed: 1.8,
  },
  Warning: {
    text: "text-amber-100",
    ring: "border-amber-300/45",
    bg: "bg-amber-300/10",
    glow: "rgba(250,204,21,0.34)",
    bar: "from-amber-300 via-purple-400 to-cyan-300",
    pulseSpeed: 2.7,
  },
  Critical: {
    text: "text-rose-100",
    ring: "border-rose-300/55",
    bg: "bg-rose-400/10",
    glow: "rgba(251,113,133,0.44)",
    bar: "from-rose-400 via-red-500 to-amber-300",
    pulseSpeed: 5.2,
  },
};

function ScenarioControls({
  active,
  onSelect,
}: {
  active: Scenario;
  onSelect: (scenario: Scenario) => void;
}) {
  return (
    <GlowCard className="h-full p-5 lg:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Scenario Controls</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">Stress Triggers</h2>
        </div>
        <Radar className="h-6 w-6 text-cyan-200" />
      </div>

      <div className="mt-6 grid gap-3">
        {scenarios.map((scenario, index) => {
          const Icon = scenario.icon;
          const selected = active.name === scenario.name;
          const styles = levelStyles[scenario.level];

          return (
            <motion.button
              key={scenario.name}
              type="button"
              onClick={() => onSelect(scenario)}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: 5, borderColor: "rgba(125, 211, 252, 0.48)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.42, delay: index * 0.06, ease: "easeOut" }}
              className={`relative overflow-hidden rounded-md border p-4 text-left transition ${
                selected
                  ? `${styles.ring} ${styles.bg} shadow-[0_0_38px_rgba(0,217,255,0.16)]`
                  : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
              }`}
            >
              {selected ? (
                <motion.span
                  layoutId="scenario-active-glow"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-300 via-purple-300 to-transparent"
                />
              ) : null}
              <div className="relative flex items-start gap-4">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-md border ${selected ? styles.ring : "border-white/10"} bg-[#07111f]/70`}>
                  <Icon className={`h-5 w-5 ${selected ? styles.text : "text-slate-300"}`} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-white">{scenario.name}</span>
                  <span className="mt-1 block text-sm text-slate-400">{scenario.label}</span>
                </span>
                <span className={`rounded border px-2 py-1 text-xs font-semibold ${styles.ring} ${styles.bg} ${styles.text}`}>
                  {scenario.level}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </GlowCard>
  );
}

function BatteryVisualization({ active }: { active: Scenario }) {
  const styles = levelStyles[active.level];

  return (
    <GlowCard className="relative h-full overflow-hidden p-5 lg:p-6">
      <motion.div
        key={`${active.name}-glow`}
        className="absolute inset-8 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.84 }}
        animate={{
          opacity: active.level === "Critical" ? [0.36, 0.72, 0.36] : [0.24, 0.48, 0.24],
          scale: active.level === "Critical" ? [0.92, 1.12, 0.92] : [0.96, 1.04, 0.96],
          backgroundColor: styles.glow,
        }}
        transition={{ duration: active.level === "Critical" ? 0.8 : 2.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex flex-col gap-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Battery Visualization</p>
            <AnimatePresence mode="wait">
              <motion.h2
                key={active.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="mt-1 text-2xl font-semibold text-white sm:text-3xl"
              >
                {active.name}
              </motion.h2>
            </AnimatePresence>
          </div>
          <span className={`rounded-md border px-3 py-2 text-sm font-semibold ${styles.ring} ${styles.bg} ${styles.text}`}>
            {active.level}
          </span>
        </div>

        <div className="relative min-h-[360px] lg:min-h-[430px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="relative"
            >
              <BatteryModel
                risk={active.risk}
                safetyGlow
                pulseSpeed={styles.pulseSpeed}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${active.name}-signal`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-md border border-white/10 bg-[#07111f]/75 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Live Sensor Signal
            </p>
            <p className="mt-2 leading-7 text-slate-200">{active.signal}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </GlowCard>
  );
}

function RiskScore({ active }: { active: Scenario }) {
  const styles = levelStyles[active.level];

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Risk Score</p>
          <p className="mt-1 text-sm font-medium text-slate-300">AI confidence 94%</p>
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={active.risk}
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.94 }}
            transition={{ duration: 0.28 }}
            className="text-5xl font-semibold text-white"
          >
            {active.risk}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-900">
        <motion.div
          key={active.name}
          className={`h-full rounded-full bg-gradient-to-r ${styles.bar} shadow-[0_0_24px_rgba(0,217,255,0.28)]`}
          initial={{ width: 0 }}
          animate={{ width: `${active.risk}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function FailureChain({ active }: { active: Scenario }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-center gap-2">
        <BrainCircuit className="h-5 w-5 text-purple-200" />
        <h3 className="font-semibold text-white">Failure Chain Prediction</h3>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="mt-5 space-y-3"
        >
          {active.chain.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, delay: index * 0.06 }}
              className="flex items-center gap-3"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-cyan-300/20 bg-cyan-300/10 text-xs font-semibold text-cyan-100">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 text-sm font-medium text-slate-200">{step}</span>
              {index < active.chain.length - 1 ? <ArrowRight className="h-4 w-4 shrink-0 text-purple-200" /> : null}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function RecommendationPanel({ active }: { active: Scenario }) {
  return (
    <div className="rounded-md border border-cyan-300/20 bg-cyan-300/10 p-4">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-cyan-100" />
        <h3 className="font-semibold text-white">Recommended Safety Action</h3>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
        >
          <p className="mt-4 leading-7 text-cyan-50">{active.action}</p>
          <div className="mt-4 space-y-2">
            {active.recommendation.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.06 }}
                className="flex items-center gap-3 text-sm text-slate-200"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(0,217,255,0.85)]" />
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PredictionPanel({ active }: { active: Scenario }) {
  return (
    <GlowCard className="h-full p-5 lg:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">AI Prediction Panel</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">Guardian Output</h2>
        </div>
        <BrainCircuit className="h-6 w-6 text-purple-200" />
      </div>

      <div className="mt-6 grid gap-4">
        <RiskScore active={active} />
        <FailureChain active={active} />
        <RecommendationPanel active={active} />
      </div>
    </GlowCard>
  );
}

export function SimulationView() {
  const [active, setActive] = useState<Scenario>(scenarios[0]);
  const statusCopy = useMemo(() => {
    if (active.level === "Critical") return "Emergency decisioning active";
    if (active.level === "Warning") return "Preventive control engaged";
    return "Pack operating inside safe envelope";
  }, [active]);

  return (
    <PageShell>
      <FloatingParticles />
      <AppNavbar />
      <main className="mx-auto w-full max-w-[1500px] px-5 py-8 sm:px-8 lg:py-10">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              <Car className="h-4 w-4" />
              Simulation Center
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              Trigger battery stress and watch AI predictions update live.
            </h1>
          </div>
          <motion.div
            key={active.level}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-flex w-fit items-center gap-3 rounded-md border px-4 py-3 text-sm font-semibold ${levelStyles[active.level].ring} ${levelStyles[active.level].bg} ${levelStyles[active.level].text}`}
          >
            <Snowflake className="h-4 w-4" />
            {statusCopy}
          </motion.div>
        </div>

        <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-[0.86fr_1.38fr_0.9fr]">
          <ScenarioControls active={active} onSelect={setActive} />
          <BatteryVisualization active={active} />
          <PredictionPanel active={active} />
        </section>
      </main>
    </PageShell>
  );
}
