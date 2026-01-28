//packages/ui/src/components/Nav/Nav.tsx
"use client";

import { AuthButton } from '../auth/AuthButton';
import React, { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
}

const Nav: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Pulpit' },
    { id: 'deadlines', label: 'Fristen & Termine' },
    { id: 'documents', label: 'Dokumenty' },
    { id: 'knowledge', label: 'Wiedza' },
    { id: 'experts', label: 'Eksperci' },
  ];

  // Proper typing for input change event
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-1 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActivePage(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activePage === item.id
                ? 'bg-blue-50 text-blue-600 border border-blue-100'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Toggle Search"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showSearch ? "M6 18L18 6M6 6l12 12" : "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"} />
            </svg>
          </button>

          <AuthButton />

          <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-lg">
            <svg className="w-4 h-4 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-semibold text-yellow-800">USt-VA: 10 dni</span>
          </div>
        </div>
      </div>

      {showSearch && (
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="container mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;