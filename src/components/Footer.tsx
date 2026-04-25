export const Footer = () => (
  <footer id="about" className="mt-16 border-t border-border bg-background">
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl font-bold">
            BLOCK<span className="text-primary">/</span>WIRE
          </div>
          <p className="mt-2 max-w-sm text-xs text-muted-foreground">
            Independent crypto journalism for the on-chain era. Data via CoinGecko.
            Headlines aggregated from public RSS.
          </p>
        </div>
        <div className="text-xs">
          <div className="mb-2 uppercase text-muted-foreground">// sections</div>
          <ul className="space-y-1">
            <li><a href="#markets" className="hover:text-primary">Markets</a></li>
            <li><a href="#news" className="hover:text-primary">Newswire</a></li>
            <li><a href="#movers" className="hover:text-primary">Movers</a></li>
          </ul>
        </div>
        <div className="text-xs">
          <div className="mb-2 uppercase text-muted-foreground">// disclaimer</div>
          <p className="text-muted-foreground">
            Not financial advice. Crypto assets are volatile and may lose all value.
            DYOR. Past performance ≠ future returns.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row">
        <span>© {new Date().getFullYear()} BLOCK/WIRE — all signals reserved.</span>
        <span>powered by chaos &amp; coffee</span>
      </div>
    </div>
  </footer>
);
