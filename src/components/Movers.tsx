import { useMarkets } from "@/hooks/useMarkets";

export const Movers = () => {
  const { coins } = useMarkets(50);
  if (!coins.length) return null;

  const sorted = [...coins].sort(
    (a, b) => (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0)
  );
  const gainers = sorted.slice(0, 4);
  const losers = sorted.slice(-4).reverse();

  const Card = ({ title, list, positive }: { title: string; list: typeof coins; positive: boolean }) => (
    <div className="brutalist-box bg-card p-4">
      <div className="mb-3 flex items-center justify-between border-b border-border pb-2 text-xs uppercase text-muted-foreground">
        <span>// {title}</span>
        <span className={positive ? "text-up" : "text-down"}>{positive ? "▲" : "▼"} 24H</span>
      </div>
      <ul className="space-y-2">
        {list.map((c) => (
          <li key={c.id} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <img src={c.image} alt="" className="h-4 w-4" loading="lazy" />
              <span className="font-bold">{c.symbol.toUpperCase()}</span>
            </span>
            <span className={`tabular-nums ${positive ? "text-up" : "text-down"}`}>
              {positive ? "+" : ""}
              {(c.price_change_percentage_24h ?? 0).toFixed(2)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section id="movers" className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-4 flex items-end justify-between border-b border-border pb-3">
        <h2 className="font-display text-2xl font-bold tracking-tight">// MOVERS</h2>
        <span className="text-xs text-muted-foreground">top-50 universe</span>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card title="GAINERS" list={gainers} positive />
        <Card title="LOSERS" list={losers} positive={false} />
      </div>
    </section>
  );
};
