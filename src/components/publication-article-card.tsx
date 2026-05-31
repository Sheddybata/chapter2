import Link from "next/link";

type PublicationArticleCardProps = {
  title: string;
  source: string;
  author: string;
  url: string;
  excerpt: string;
  date?: string;
  reporter?: string;
  kind?: "article" | "document";
  readHref?: string;
};

export function PublicationArticleCard({
  title,
  source,
  author,
  url,
  excerpt,
  date,
  reporter,
  kind = "article",
  readHref,
}: PublicationArticleCardProps) {
  const isDocument = kind === "document";
  const downloadHref = isDocument ? encodeURI(url) : url;

  return (
    <article className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:border-emerald-700/40">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
            {source}
            {date ? ` · ${date}` : ""}
          </p>
          <h3 className="mt-3 text-2xl font-black tracking-tight text-emerald-950">
            {title}
          </h3>
          <p className="mt-2 text-sm font-bold text-stone-500">
            {author}
            {reporter ? ` · reported by ${reporter}` : ""}
          </p>
          <p className="mt-4 text-sm leading-7 text-stone-600">{excerpt}</p>
        </div>

        {isDocument && readHref ? (
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a
              href={downloadHref}
              download
              className="inline-flex rounded-full bg-stone-100 px-6 py-3 text-center text-sm font-black text-stone-800 transition hover:bg-stone-200"
            >
              Download document
            </a>
            <Link
              href={readHref}
              className="inline-flex rounded-full bg-emerald-800 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-emerald-900"
            >
              Read document
            </Link>
          </div>
        ) : (
          <a
            href={downloadHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 rounded-full bg-emerald-800 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-emerald-900"
          >
            Read article
          </a>
        )}
      </div>
    </article>
  );
}
