import Link from "next/link";

export function AcceptanceSpeechFeature() {
  return (
    <div
      id="acceptance-speech"
      className="grid gap-6 rounded-[2rem] border border-emerald-950/10 bg-white p-5 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-6"
    >
      <div className="overflow-hidden rounded-[1.5rem] bg-black">
        <div className="aspect-video">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/CBb5wehpX3k?si=JUI582o6WNmUudvh"
            title="Prince Adewole Adebayo acceptance speech"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
      <div className="flex flex-col justify-center p-2 sm:p-4">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
          Acceptance speech
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-emerald-950">
          The speech that frames the constitutional mission.
        </h2>
        <p className="mt-4 text-sm leading-6 text-stone-600">
          Watch the video and keep the acceptance speech document close as the
          platform grows into publications, events, and organizing tools.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="/acceptancespeech.docx"
            className="rounded-full bg-emerald-800 px-5 py-3 text-center text-sm font-black text-white"
          >
            Download speech
          </a>
          <Link
            href="/acceptance-speech"
            className="rounded-full bg-stone-100 px-5 py-3 text-center text-sm font-black text-stone-800"
          >
            Read full speech
          </Link>
        </div>
      </div>
    </div>
  );
}
