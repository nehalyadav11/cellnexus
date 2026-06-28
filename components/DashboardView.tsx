"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  BatteryCharging,
  Gauge,
  Radio,
  Route,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Waves,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppNavbar } from "./AppNavbar";
import { BatteryModel } from "./BatteryModel";
import { FloatingParticles, GlowCard, PageShell } from "./MotionShell";

type Metric = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  accent: string;
};

type AlertItem = {
  title: string;
  time: string;
  severity: "Medium" | "Watch" | "Low" | "Stable";
  tone: string;
};

const metrics: Metric[] = [
  {
    label: "SOH",
    value: "91%",
    detail: "Module health index",
    icon: BatteryCharging,
    accent: "from-cyan-300 to-blue-500",
  },
  {
    label: "Thermal Risk",
    value: "LOW",
    detail: "Cooling loop stable",
    icon: Thermometer,
    accent: "from-emerald-300 to-cyan-400",
  },
  {
    label: "Stress Score",
    value: "22",
    detail: "Road load estimate",
    icon: Gauge,
    accent: "from-purple-300 to-fuchsia-500",
  },
  {
    label: "Safe Range",
    value: "280 km",
    detail: "AI-adjusted reserve",
    icon: Route,
    accent: "from-sky-300 to-violet-500",
  },
];

const temperatureTrend = [34, 35, 36, 37, 36, 38, 39, 38, 37, 38, 38, 37];
const stressTrend = [18, 24, 21, 32, 28, 26, 35, 30, 24, 22, 20, 22];

const alerts: AlertItem[] = [
  {
    title: "Pothole impact detected",
    time: "12:42:08",
    severity: "Medium",
    tone: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  },
  {
    title: "Micro crack probability increased",
    time: "12:41:54",
    severity: "Watch",
    tone: "border-purple-300/30 bg-purple-300/10 text-purple-100",
  },
  {
    title: "Thermal risk stable",
    time: "12:40:33",
    severity: "Stable",
    tone: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  },
  {
    title: "Route stress low",
    time: "12:39:16",
    severity: "Low",
    tone: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
  },
];

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, delay, ease: "easeOut" },
  }),
};

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const Icon = metric.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -5, borderColor: "rgba(125, 211, 252, 0.45)" }}
      transition={{ duration: 0.48, delay: 0.12 + index * 0.07, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-md border border-white/10 bg-white/[0.06] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
    >
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${metric.accent} opacity-80`} />
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-300/10 blur-2xl transition group-hover:bg-purple-300/15" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            {metric.label}
          </p>
          <p className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            {metric.value}
          </p>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-md border border-cyan-200/20 bg-cyan-200/10 text-cyan-100 shadow-[0_0_28px_rgba(0,217,255,0.18)]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="relative mt-5 text-sm text-slate-300">{metric.detail}</p>
    </motion.article>
  );
}

function TrendChart({
  title,
  subtitle,
  data,
  gradientId,
  unit,
}: {
  title: string;
  subtitle: string;
  data: number[];
  gradientId: string;
  unit: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 84 - ((value - min) / Math.max(max - min, 1)) * 58;
      return `${x},${y}`;
    })
    .join(" ");
  const area = `0,92 ${points} 100,92`;

  return (
    <GlowCard className="overflow-hidden p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{subtitle}</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{title}</h2>
        </div>
        <span className="rounded-md border border-cyan-200/20 bg-cyan-200/10 px-3 py-2 text-sm font-semibold text-cyan-100">
          {data[data.length - 1]}
          {unit}
        </span>
      </div>
      <div className="relative mt-7 h-52 overflow-hidden rounded-md border border-white/10 bg-[#07111f]/70">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:100%_25%,16.66%_100%]" />
        <svg
          className="absolute inset-0 h-full w-full overflow-visible p-4"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#00D9FF" />
              <stop offset="54%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#F0ABFC" />
            </linearGradient>
            <linearGradient id={`${gradientId}-area`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.polygon
            points={area}
            fill={`url(#${gradientId}-area)`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          />
          <motion.polyline
            points={points}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.15, delay: 0.18, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
          <span>12 min</span>
          <span>Live</span>
          <span>Now</span>
        </div>
      </div>
    </GlowCard>
  );
}

function BatteryStatusPanel() {
  return (
    <motion.aside
      custom={0.04}
      initial="hidden"
      animate="visible"
      variants={panelVariants}
      className="min-w-0"
    >
      <GlowCard className="relative overflow-hidden p-5 lg:p-6">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">3D Battery Digital Twin</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">Pack CNX-G91</h2>
          </div>
          <span className="grid h-12 w-12 place-items-center rounded-md border border-cyan-200/25 bg-cyan-200/10 text-cyan-100 shadow-[0_0_34px_rgba(0,217,255,0.22)]">
            <ShieldCheck className="h-6 w-6" />
          </span>
        </div>

        <div className="relative mt-4">
          <div className="absolute inset-6 rounded-full bg-cyan-300/20 blur-3xl" />
          <BatteryModel compact risk={22} />
        </div>

        <div className="mt-2 grid gap-3">
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-sm font-medium text-slate-300">Battery Status</span>
            <motion.span
              animate={{
                boxShadow: [
                  "0 0 16px rgba(52,211,153,0.18)",
                  "0 0 34px rgba(52,211,153,0.42)",
                  "0 0 16px rgba(52,211,153,0.18)",
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-md border border-emerald-300/30 bg-emerald-300/10 px-3 py-1.5 text-sm font-semibold text-emerald-100"
            >
              STABLE
            </motion.span>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-sm font-medium text-slate-300">Cell Temperature</span>
            <motion.span
              animate={{
                textShadow: [
                  "0 0 12px rgba(0,217,255,0.25)",
                  "0 0 28px rgba(0,217,255,0.7)",
                  "0 0 12px rgba(0,217,255,0.25)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl font-semibold text-cyan-100"
            >
              38°C
            </motion.span>
          </div>
        </div>
      </GlowCard>
    </motion.aside>
  );
}

function CenterPanel() {
  return (
    <motion.section
      custom={0.12}
      initial="hidden"
      animate="visible"
      variants={panelVariants}
      className="grid min-w-0 gap-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <TrendChart
          title="Temperature Trend"
          subtitle="Cell thermal curve"
          data={temperatureTrend}
          gradientId="temperature-trend"
          unit="°C"
        />
        <TrendChart
          title="Battery Stress Trend"
          subtitle="Chassis shock profile"
          data={stressTrend}
          gradientId="stress-trend"
          unit=""
        />
      </div>
    </motion.section>
  );
}

function AlertFeedPanel() {
  return (
    <motion.aside
      custom={0.2}
      initial="hidden"
      animate="visible"
      variants={panelVariants}
      className="min-w-0"
    >
      <GlowCard className="h-full overflow-hidden p-5 lg:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">AI Alerts Feed</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">Live Sentinel</h2>
          </div>
          <span className="relative grid h-12 w-12 place-items-center rounded-md border border-purple-200/25 bg-purple-300/10 text-purple-100">
            <Radio className="h-6 w-6" />
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(0,217,255,0.85)]" />
          </span>
        </div>

        <div className="mt-6 space-y-3">
          {alerts.map((alert, index) => (
            <motion.article
              key={alert.title}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -4, borderColor: "rgba(216,180,254,0.45)" }}
              transition={{ duration: 0.42, delay: 0.24 + index * 0.09, ease: "easeOut" }}
              className="group border-l border-white/10 bg-white/[0.035] px-4 py-4 transition"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(0,217,255,0.85)] transition group-hover:bg-purple-200" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-white">{alert.title}</p>
                    <span className={`rounded border px-2 py-1 text-xs font-semibold ${alert.tone}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{alert.time} IST</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
          <div>
            <Waves className="h-5 w-5 text-cyan-200" />
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">Signal</p>
            <p className="mt-1 font-semibold text-white">Clean</p>
          </div>
          <div>
            <Zap className="h-5 w-5 text-purple-200" />
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">Latency</p>
            <p className="mt-1 font-semibold text-white">18 ms</p>
          </div>
        </div>
      </GlowCard>
    </motion.aside>
  );
}

export function DashboardView() {
  return (
    <PageShell>
      <FloatingParticles />
      <AppNavbar />
      <main className="mx-auto w-full max-w-[1500px] px-5 py-8 sm:px-8 lg:py-10">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200"
            >
              <Sparkles className="h-4 w-4" />
              CellNexus
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="mt-3 max-w-4xl text-4xl font-semibold text-white sm:text-5xl lg:text-6xl"
            >
              CellNexus Dashboard
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="inline-flex w-fit items-center gap-3 rounded-md border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100 shadow-[0_0_36px_rgba(0,217,255,0.16)]"
          >
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
            AI Sentinel Online
          </motion.div>
        </div>

        <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-[0.82fr_1.48fr_0.9fr]">
          <BatteryStatusPanel />
          <CenterPanel />
          <AlertFeedPanel />
        </section>
      </main>
    </PageShell>
  );
}
