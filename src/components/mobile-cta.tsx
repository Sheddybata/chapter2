import Link from "next/link";

export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-emerald-950/10 bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <Link
          href="/sections"
          className="rounded-full bg-stone-100 px-3 py-3 text-center text-xs font-black text-stone-800"
        >
          Explore
        </Link>
        <Link
          href="/action"
          className="rounded-full bg-emerald-800 px-3 py-3 text-center text-xs font-black text-white"
        >
          Join
        </Link>
        <Link
          href="/students"
          className="rounded-full bg-stone-100 px-3 py-3 text-center text-xs font-black text-stone-800"
        >
          Students
        </Link>
      </div>
    </div>
  );
}
