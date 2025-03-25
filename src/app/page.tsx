import Navbar from "./Components/navbar";
import CryptoList from "./Components/cryptoList";

export default function Home() {
  return (
    <div className="p-6 max-w-6xl mx-auto text-center">
      <Navbar />
      <CryptoList />
    </div>
  );
}