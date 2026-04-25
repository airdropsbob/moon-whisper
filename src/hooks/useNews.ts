import { useEffect, useState } from "react";

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
  source: string;
}

const FEEDS = [
  { url: "https://cointelegraph.com/rss", source: "Cointelegraph" },
  { url: "https://www.coindesk.com/arc/outboundfeeds/rss/", source: "CoinDesk" },
  { url: "https://decrypt.co/feed", source: "Decrypt" },
  { url: "https://bitcoinmagazine.com/.rss/full/", source: "Bitcoin Magazine" },
];

const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

export const useNews = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const all = await Promise.all(
          FEEDS.map(async (f) => {
            try {
              const res = await fetch(
                `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(f.url)}`
              );
              const data = await res.json();
              if (data.status !== "ok") return [];
              return (data.items as Array<Record<string, unknown>>).slice(0, 8).map((it) => ({
                title: String(it.title ?? ""),
                link: String(it.link ?? ""),
                pubDate: String(it.pubDate ?? ""),
                description: stripHtml(String(it.description ?? "")).slice(0, 220),
                thumbnail:
                  (typeof it.thumbnail === "string" && it.thumbnail) ||
                  ((it.enclosure as { link?: string } | undefined)?.link) ||
                  undefined,
                source: f.source,
              })) as NewsItem[];
            } catch {
              return [];
            }
          })
        );
        const merged = all.flat().sort(
          (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );
        if (alive) setItems(merged);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return { items, loading };
};
