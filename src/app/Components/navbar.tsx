'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserName(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    
    router.push('/');
  };

  return (
    <nav className="flex justify-between items-center bg-blue-600 text-white p-4">
      <div className="text-xl font-bold">Crypto Platform</div>
      <div className="flex items-center space-x-4">
        <span>Welcome, {userName}</span>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}