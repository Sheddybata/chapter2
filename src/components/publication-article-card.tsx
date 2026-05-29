type PublicationArticleCardProps = {
  title: string;
  source: string;
  author: string;
  url: string;
  excerpt: string;
  date?: string;
  reporter?: string;
};

export function PublicationArticleCard({
  title,
  source,
  author,
  url,
  excerpt,
  date,
  reporter,
}: PublicationArticleCardProps) {
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
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 rounded-full bg-emerald-800 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-emerald-900"
        >
          Read article
        </a>
      </div>
    </article>
  );
}
