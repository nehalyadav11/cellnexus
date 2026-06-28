"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, ArrowRight } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/simulation", label: "Simulation" },
];

export function AppNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1220]/75 backdrop-blur-2xl">
      <nav className="mx-auto flex min-h-20 w-full max-w-[1500px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-8 md:flex-nowrap md:py-0">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md border border-cyan-300/40 bg-cyan-300/10 shadow-[0_0_32px_rgba(0,217,255,0.25)]">
            <Activity className="h-5 w-5 text-cyan-200" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-semibold text-white">
              CellNexus Guardian
            </span>
            <span className="hidden text-xs text-slate-400 sm:block">
              AI Battery Safety Co-Pilot
            </span>
          </span>
        </Link>

        <div className="order-3 flex w-full items-center justify-between gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/[0.04] p-1 md:order-none md:w-auto md:gap-3 md:overflow-visible">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} active={pathname === item.href} />
          ))}
        </div>

        <Link
          href="/dashboard"
          className="group flex shrink-0 items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-[#07111f] shadow-[0_0_34px_rgba(0,217,255,0.32)] transition hover:bg-white"
        >
          Launch
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </nav>
    </header>
  );
}

function NavLink({
  item,
  active,
}: {
  item: (typeof navItems)[number];
  active: boolean;
}) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] ${
        active
          ? "bg-cyan-300/15 text-cyan-100 shadow-[0_0_28px_rgba(0,217,255,0.30),0_0_0_1px_rgba(56,189,248,0.25)] ring-1 ring-cyan-300/50"
          : "text-slate-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {item.label}
    </Link>
  );
}
