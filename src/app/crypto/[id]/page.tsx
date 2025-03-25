import axios from "axios";
import { notFound } from "next/navigation";

async function getCryptoData(id: string) {
    try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        return res.data; // ✅ Axios automatically parses JSON
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        return null; // Return null if there's an error
      }
}

export default async function CryptoDetails({ params }: { params: { id: string } }) {
  const crypto = await getCryptoData(params.id);

  if (!crypto) return notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold">
        {crypto.name} ({crypto.symbol.toUpperCase()})
      </h1>
      <img src={crypto.image.large} alt={crypto.name} className="mx-auto w-32 my-4" />
      <p className="text-lg">
        Current Price: <strong>${crypto.market_data.current_price.usd}</strong>
      </p>
      <p className="text-lg">
        Market Cap: <strong>${crypto.market_data.market_cap.usd.toLocaleString()}</strong>
      </p>
      <p className="text-lg">
        24h Change: <strong>{crypto.market_data.price_change_percentage_24h.toFixed(2)}%</strong>
      </p>
    </div>
  );
}
