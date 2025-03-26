'use client';

import React, {useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logout } from '../lib/auth/utils';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p className="mb-4">Welcome to your crypto platform dashboard!</p>
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}