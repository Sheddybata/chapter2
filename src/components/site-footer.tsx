import Link from "next/link";

import { navigation, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-emerald-950/10 bg-emerald-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-200">
            {site.name}
          </p>
          <p className="mt-4 max-w-xl text-3xl font-black tracking-tight">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-50/80">
            An educational microsite about the Fundamental Objectives and
            Directive Principles of State Policy in Chapter II of Nigeria&apos;s
            1999 Constitution.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-bold text-emerald-50 transition hover:border-emerald-300 hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-emerald-50/60">
        Achieving Chapter II - Adewole 2027 all rights reserved.
      </div>
    </footer>
  );
}
