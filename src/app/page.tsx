'use client';

import { useState, useEffect } from 'react';
import LoginPage from './login/page';
import Navbar from "./Components/navbar";
import CryptoList from "./Components/cryptoList";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  if (!isAuthenticated) {
    return <LoginPage onSuccessfulLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto text-center">
      <Navbar />
      <CryptoList />
    </div>
  );
}