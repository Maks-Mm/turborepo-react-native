// packages/ui/src/components/auth/AuthButton.web.tsx (web version)
"use client";

import { useAuth } from "@repo/auth";
import { useState } from "react";
import { AuthModal } from "./AuthModal.web";

 function AuthButton() {
  const { user, loading, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (loading) {
    return (
      <button
        className="px-4 py-2 bg-gray-300 rounded-lg text-gray-600 cursor-not-allowed flex items-center gap-2"
        disabled
      >
        <div className="h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
        Loading...
      </button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700 hidden md:inline">
          {user.email}
        </span>
        <button
          onClick={() => logout()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setShowAuthModal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Login
      </button>
      {/* AuthModal component here */}

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}

export default AuthButton;