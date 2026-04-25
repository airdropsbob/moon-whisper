import { useEffect, useState } from "react";

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
}

export const useMarkets = (count = 25) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${count}&page=1&sparkline=false&price_change_percentage=24h`
        );
        if (!res.ok) throw new Error("market fetch failed");
        const data = (await res.json()) as Coin[];
        if (alive) {
          setCoins(data);
          setError(null);
        }
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : "error");
      } finally {
        if (alive) setLoading(false);
      }
    };
    fetchData();
    const id = setInterval(fetchData, 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [count]);

  return { coins, loading, error };
};
