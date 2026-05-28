"use client";

import Link from "next/link";
import { useState } from "react";

import { navigation, site } from "@/lib/site";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-800 text-sm font-black text-white shadow-sm">
            II
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-black uppercase tracking-[0.18em] text-emerald-950">
              {site.name}
            </span>
            <span className="block text-xs font-semibold text-emerald-800">
              Adebayo 2027
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-stone-700 transition hover:text-emerald-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/action"
            className="rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-900"
          >
            Join the Movement
          </Link>
        </div>

        <button
          type="button"
          className="rounded-full border border-emerald-900/15 px-4 py-2 text-sm font-bold text-emerald-950 lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          Menu
        </button>
      </div>

      {isOpen ? (
        <nav
          id="mobile-navigation"
          className="border-t border-emerald-950/10 bg-white px-4 py-4 lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-base font-bold text-stone-800 hover:bg-emerald-50"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/action"
              className="mt-2 rounded-2xl bg-emerald-800 px-4 py-3 text-center text-base font-black text-white"
              onClick={() => setIsOpen(false)}
            >
              Sign the Petition
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
