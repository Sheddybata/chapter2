import Link from "next/link";

export function AcceptanceSpeechFeature() {
  return (
    <div
      id="acceptance-speech"
      className="grid gap-6 rounded-[2rem] border border-emerald-950/10 bg-white p-5 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:p-6"
    >
      <div className="w-full overflow-hidden rounded-[1.5rem] bg-black">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 h-full w-full border-0"
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
        <blockquote className="mt-4 border-l-4 border-emerald-800/40 pl-4 text-sm leading-7 text-stone-700">
          There is a book that brought us together. It&apos;s called the
          Constitution of Nigeria. That book has a chapter called chapter two,
          Fundamental Objectives and Directive Principles of State Policy from
          section 13 to section 23. Read that and use that to choose your
          government. It starts by saying that power belongs to the people of
          Nigeria and it is from the people that power and government will
          derive. Do you agree? So, the power that will be given to the SDP and
          the Adebayo presidency will come from the people of Nigeria. We will
          not snatch it. We will not grab it. We will not run away with it. And
          it says next; The fundamental principle of Nigeria will be Justice and
          Social Democracy. It is in our constitution. We are the Social
          Democratic Party. We derive from the Constitution. It says that the
          resources of Nigeria will be used for the welfare and security of
          Nigerians.
        </blockquote>
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
