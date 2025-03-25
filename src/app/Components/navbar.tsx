import React from "react";

export default function Navbar() {
    return (
      <nav className="bg-gray-900 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Leesh</h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search Crypto..."
              className="px-3 py-1 rounded text-black"
            />
            <a href="#" className="hover:text-gray-400">Trade</a>
            <a href="#" className="hover:text-gray-400">About Us</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
            <a href="#" className="hover:text-gray-400">More</a>
          </div>
        </div>
      </nav>
    );
  };