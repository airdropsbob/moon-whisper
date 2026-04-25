import { useMarkets } from "@/hooks/useMarkets";

export const Ticker = () => {
  const { coins } = useMarkets(25);
  if (!coins.length) {
    return (
      <div className="border-y border-border bg-secondary/40 py-2 text-xs text-muted-foreground">
        <span className="px-4">LOADING MARKET DATA<span className="blink">_</span></span>
      </div>
    );
  }
  const loop = [...coins, ...coins];
  return (
    <div className="overflow-hidden border-y border-border bg-secondary/40 py-2">
      <div className="ticker-track flex w-max gap-8 whitespace-nowrap text-xs">
        {loop.map((c, i) => {
          const up = (c.price_change_percentage_24h ?? 0) >= 0;
          return (
            <span key={`${c.id}-${i}`} className="flex items-center gap-2">
              <span className="text-muted-foreground">{c.symbol.toUpperCase()}</span>
              <span className="font-bold text-foreground">
                ${c.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
              <span className={up ? "text-up" : "text-down"}>
                {up ? "▲" : "▼"} {Math.abs(c.price_change_percentage_24h ?? 0).toFixed(2)}%
              </span>
              <span className="text-border">|</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};
