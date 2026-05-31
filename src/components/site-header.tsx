"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  moreNavigation,
  navigation,
  primaryNavigation,
} from "@/lib/site";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setIsMoreOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-800 text-sm font-black text-white shadow-sm">
            II
          </span>
          <span className="hidden min-w-0 leading-tight sm:block">
            <span className="block text-sm font-black uppercase tracking-[0.12em] text-emerald-950">
              Achieving Chapter II
            </span>
            <span className="block text-xs font-semibold text-emerald-800">
              Adewole 2027
            </span>
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-bold text-stone-700 transition hover:text-emerald-800"
            >
              {item.label}
            </Link>
          ))}

          <div className="relative" ref={moreMenuRef}>
            <button
              type="button"
              className="flex items-center gap-1 whitespace-nowrap text-sm font-bold text-stone-700 transition hover:text-emerald-800"
              onClick={() => setIsMoreOpen((value) => !value)}
              aria-expanded={isMoreOpen}
              aria-haspopup="true"
            >
              More
              <span
                className={[
                  "inline-block text-[10px] transition-transform",
                  isMoreOpen ? "rotate-180" : "",
                ].join(" ")}
              >
                v
              </span>
            </button>

            {isMoreOpen ? (
              <div className="absolute left-0 top-[calc(100%+0.75rem)] min-w-[220px] rounded-[1.25rem] border border-emerald-950/10 bg-white p-2 shadow-xl">
                {moreNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-4 py-3 text-sm font-bold text-stone-700 transition hover:bg-emerald-50 hover:text-emerald-900"
                    onClick={() => setIsMoreOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/action"
            className="hidden rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-900 lg:inline-flex"
          >
            Join the Movement
          </Link>

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
              Join the Movement
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
