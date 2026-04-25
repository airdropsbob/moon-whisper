import { useEffect, useState } from "react";

export const Header = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = now.toUTCString().split(" ").slice(1, 5).join(" ");

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-xs">
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
          <span>LIVE</span>
          <span className="hidden sm:inline">// {fmt} UTC</span>
        </div>
        <nav className="hidden gap-6 text-muted-foreground md:flex">
          <a className="hover:text-primary" href="#markets">MARKETS</a>
          <a className="hover:text-primary" href="#news">NEWS</a>
          <a className="hover:text-primary" href="#movers">MOVERS</a>
          <a className="hover:text-primary" href="#about">ABOUT</a>
        </nav>
        <button className="brutalist-box-primary bg-primary px-3 py-1 text-primary-foreground hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition">
          SUBSCRIBE
        </button>
      </div>
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-4 px-4 py-6 md:py-10">
        <div>
          <div className="mb-2 text-xs text-muted-foreground">[ ISSUE #{Math.floor((Date.now() / 86400000) % 9999)} ]</div>
          <h1 className="font-display text-5xl font-bold leading-none tracking-tight text-foreground md:text-7xl">
            BLOCK<span className="text-primary glow-primary">/</span>WIRE
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Real-time crypto markets, decoded. No fluff. No moonboys. Just signal.
          </p>
        </div>
        <div className="hidden text-right text-xs text-muted-foreground md:block">
          <div>EST. 2026</div>
          <div>OPERATING ON-CHAIN</div>
          <div className="mt-2 text-foreground">v1.0.0 // mainnet</div>
        </div>
      </div>
    </header>
  );
};
