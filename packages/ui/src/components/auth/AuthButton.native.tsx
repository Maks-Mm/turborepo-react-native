//packages/ui/components/auth/AuthButton.native.tsx

"use client";

import { useAuth } from "@repo/auth";
import { useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthModal } from "./AuthModal.native";

export function AuthButton() {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (user) {
    return (
      <View className="flex-row items-center gap-2">
        <Text className="text-sm text-gray-700">{user.email}</Text>
        <TouchableOpacity
          onPress={() => logout()}
          className="px-4 py-2 bg-red-600 rounded-lg"
        >
          <Text className="text-white">Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowAuthModal(true)}
        className="px-4 py-2 bg-blue-600 rounded-lg"
      >
        <Text className="text-white">Login</Text>
      </TouchableOpacity>
      
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </View>
  );
}