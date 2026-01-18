//packages/ui/src/components/styles.web.ts

import React from "react";

interface HeaderViewProps {
  showLanguageDropdown: boolean;
  onToggleLanguage: () => void;
}

 const HeaderView = ({
  showLanguageDropdown,
  onToggleLanguage,
}: HeaderViewProps) => {
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
            <p className="text-xs text-gray-600 -mt-1">
              Für polnische Unternehmer in DE
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <span className="text-lg">🇵🇱</span>
              <span className="text-gray-700">Polski</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showLanguageDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                {["🇵🇱 Polski", "🇩🇪 Deutsch", "🇬🇧 English"].map(lang => (
                  <button
                    key={lang}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
                  >
                    <span className="text-xl">{lang.split(" ")[0]}</span>
                    <span>{lang.split(" ")[1]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
            🔔
          </button>

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">JK</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">
                Jan Kowalski
              </p>
              <p className="text-xs text-gray-500">
                Einzelunternehmer
              </p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
export default HeaderView;