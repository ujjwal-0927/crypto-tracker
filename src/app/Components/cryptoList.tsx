"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
}

const CryptoList = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchCryptos = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: pageNumber,
          },
        }
      );
      setCryptos(response.data);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCryptos(page);
  }, [page]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div>
    <h1 className="text-3xl font-bold">Crypto Market Overview</h1>
      <ul className="mt-4 space-y-3">
        {cryptos.map((coin) => (
          <li key={coin.id} className="border p-4 rounded-lg hover:bg-gray-100">
            <Link href={`/crypto/${coin.id}`}>
              <div className="flex items-center space-x-4 cursor-pointer">
                <img src={coin.image} alt={coin.name} className="w-10 h-10" />
                <p className="text-lg font-semibold">
                  {coin.name} ({coin.symbol.toUpperCase()})
                </p>
                <p className="text-green-500">${coin.current_price}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 border rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
        >
          Previous
        </button>
        <span className="px-4 py-2 border rounded">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded hover:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CryptoList;
