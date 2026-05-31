import Image from "next/image";

export function ConstitutionExplorerIntro() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
          Constitution explorer
        </p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-emerald-950 sm:text-5xl">
          Achieving Chapter II with Prince Adewole Adebayo.
        </h2>
        <p className="mt-5 text-lg leading-8 text-stone-600">
          Read each constitutional objective, compare it with Nigerian reality,
          and connect it to Adebayo&apos;s policy commitments.
        </p>
      </div>
      <div className="rounded-[2rem] border border-emerald-950/10 bg-white p-4 shadow-sm">
        <div className="relative min-h-[360px] overflow-hidden rounded-[1.5rem] bg-emerald-950">
          <Image
            src="/princewole.jpg"
            alt="Prince Adewole Adebayo"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950 via-emerald-950/75 to-transparent p-6 text-white">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-100">
              Prince Adewole Adebayo
            </p>
            <p className="mt-2 text-2xl font-black tracking-tight">
              Constitutional leadership for Chapter II.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
