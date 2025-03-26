'use client';

import { useState, useEffect } from 'react';
import LoginPage from './login/page';
import Navbar from "./Components/navbar";
import CryptoList from "./Components/cryptoList";

export default function Home() {
  const [authStage, setAuthStage] = useState<'login' | 'cryptoList'>('login');

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setAuthStage('cryptoList');
    }
  }, []);

  const handleSuccessfulLogin = () => {
    setAuthStage('cryptoList');
  };

  if (authStage === 'login') {
    return <LoginPage onSuccessfulLogin={handleSuccessfulLogin} />;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto text-center">
      <Navbar onLogout={() => setAuthStage('login')} />
      <CryptoList />
    </div>
  );
}