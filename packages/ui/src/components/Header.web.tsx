//packages/ui/src/components/Header.web.tsx
"use client";
import React, { useState } from 'react';

const Header = () => {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Doch.</h1>
            <p className="text-xs text-gray-600 -mt-1">Für polnische Unternehmer in DE</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <span className="text-lg">🇵🇱</span>
              <span className="text-gray-700">Polski</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown */}
            {showLanguageDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
                  <span className="text-xl">🇵🇱</span>
                  <span>Polski</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
                  <span className="text-xl">🇩🇪</span>
                  <span>Deutsch</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
                  <span className="text-xl">🇬🇧</span>
                  <span>English</span>
                </button>
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">JK</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">Jan Kowalski</p>
              <p className="text-xs text-gray-500">Einzelunternehmer</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;