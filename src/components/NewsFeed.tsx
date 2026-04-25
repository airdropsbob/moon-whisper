import { useNews } from "@/hooks/useNews";

const timeAgo = (dateStr: string) => {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export const NewsFeed = () => {
  const { items, loading } = useNews();
  const lead = items[0];
  const sub = items.slice(1, 4);
  const rest = items.slice(4, 16);

  return (
    <section id="news" className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-4 flex items-end justify-between border-b border-border pb-3">
        <h2 className="font-display text-2xl font-bold tracking-tight">// NEWSWIRE</h2>
        <span className="text-xs text-muted-foreground">
          {loading ? "syncing feeds..." : `${items.length} dispatches`}
        </span>
      </div>

      {loading && !items.length && (
        <div className="text-sm text-muted-foreground">
          decoding upstream feeds<span className="blink">_</span>
        </div>
      )}

      {lead && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <a
            href={lead.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group brutalist-box relative col-span-2 block overflow-hidden bg-card transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_hsl(var(--primary))]"
          >
            {lead.thumbnail && (
              <div className="relative aspect-video overflow-hidden border-b border-border">
                <img
                  src={lead.thumbnail}
                  alt=""
                  className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
            )}
            <div className="p-5">
              <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="bg-primary px-2 py-0.5 text-primary-foreground">FEATURED</span>
                <span>{lead.source}</span>
                <span>// {timeAgo(lead.pubDate)}</span>
              </div>
              <h3 className="font-display text-3xl font-bold leading-tight group-hover:text-primary">
                {lead.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{lead.description}</p>
            </div>
          </a>

          <div className="space-y-4">
            {sub.map((n) => (
              <a
                key={n.link}
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-b border-border pb-4"
              >
                <div className="mb-1 flex gap-3 text-xs text-muted-foreground">
                  <span className="text-accent">{n.source}</span>
                  <span>// {timeAgo(n.pubDate)}</span>
                </div>
                <h4 className="font-display text-lg font-bold leading-snug group-hover:text-primary">
                  {n.title}
                </h4>
              </a>
            ))}
          </div>
        </div>
      )}

      <ul className="mt-10 divide-y divide-border border-y border-border">
        {rest.map((n) => (
          <li key={n.link}>
            <a
              href={n.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 py-3 text-sm transition hover:bg-secondary/40 sm:flex-row sm:items-center sm:gap-4"
            >
              <span className="w-32 shrink-0 text-xs text-muted-foreground">
                {timeAgo(n.pubDate)}
              </span>
              <span className="w-32 shrink-0 text-xs uppercase text-accent">{n.source}</span>
              <span className="flex-1 group-hover:text-primary">{n.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
