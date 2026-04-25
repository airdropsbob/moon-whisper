import { Header } from "@/components/Header";
import { Ticker } from "@/components/Ticker";
import { MarketTable } from "@/components/MarketTable";
import { NewsFeed } from "@/components/NewsFeed";
import { Movers } from "@/components/Movers";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "BLOCK/WIRE — Real-time Crypto News & Markets";
    const meta =
      document.querySelector('meta[name="description"]') ??
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute(
      "content",
      "Live crypto prices, top movers, and breaking blockchain news from across the industry. No fluff. Just signal."
    );
    if (!meta.parentElement) document.head.appendChild(meta);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Ticker />
      <main>
        <NewsFeed />
        <MarketTable />
        <Movers />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
