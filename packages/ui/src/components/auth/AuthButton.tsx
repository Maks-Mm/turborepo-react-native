//packages/ui/components/auth/AuthButton.tsx

"use client";

import { useAuth } from "@repo/auth";
import { useState } from "react";
import { AuthModal } from "./AuthModal";

export function AuthButton() {
  const { user, logout, login } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">{user.email}</span>
        <button
          onClick={() => logout()}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowAuthModal(true)}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Login
      </button>
      
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
}