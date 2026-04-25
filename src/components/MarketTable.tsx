import { useMarkets } from "@/hooks/useMarkets";

const fmtBig = (n: number) => {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toLocaleString()}`;
};

export const MarketTable = () => {
  const { coins, loading } = useMarkets(15);

  return (
    <section id="markets" className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-4 flex items-end justify-between border-b border-border pb-3">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          // TOP_MARKETS
        </h2>
        <span className="text-xs text-muted-foreground">refresh: 60s</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase text-muted-foreground">
            <tr className="border-b border-border">
              <th className="py-2 text-left">#</th>
              <th className="py-2 text-left">Asset</th>
              <th className="py-2 text-right">Price</th>
              <th className="py-2 text-right">24h</th>
              <th className="hidden py-2 text-right md:table-cell">Mkt Cap</th>
              <th className="hidden py-2 text-right md:table-cell">Volume 24h</th>
            </tr>
          </thead>
          <tbody>
            {loading && !coins.length &&
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td colSpan={6} className="py-3 text-xs text-muted-foreground">
                    fetching row_{i}<span className="blink">_</span>
                  </td>
                </tr>
              ))}
            {coins.map((c) => {
              const up = (c.price_change_percentage_24h ?? 0) >= 0;
              return (
                <tr
                  key={c.id}
                  className="group border-b border-border/60 transition hover:bg-secondary/40"
                >
                  <td className="py-3 text-muted-foreground">{c.market_cap_rank.toString().padStart(2, "0")}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img src={c.image} alt={c.name} className="h-6 w-6" loading="lazy" />
                      <div>
                        <div className="font-bold leading-none">{c.symbol.toUpperCase()}</div>
                        <div className="text-xs text-muted-foreground">{c.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-right tabular-nums">
                    ${c.current_price.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </td>
                  <td className={`py-3 text-right tabular-nums ${up ? "text-up" : "text-down"}`}>
                    {up ? "+" : ""}
                    {(c.price_change_percentage_24h ?? 0).toFixed(2)}%
                  </td>
                  <td className="hidden py-3 text-right tabular-nums text-muted-foreground md:table-cell">
                    {fmtBig(c.market_cap)}
                  </td>
                  <td className="hidden py-3 text-right tabular-nums text-muted-foreground md:table-cell">
                    {fmtBig(c.total_volume)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
