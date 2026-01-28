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
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>

        <Text style={{ fontSize: 14, color: '#374151' }}>
          {user.email}
        </Text>

        <TouchableOpacity onPress={() => logout()} style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: '#DC2626',
          borderRadius: 8
        }}>
          <Text style={{ fontSize: 14, color: '#374151' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowAuthModal(true)}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: '#DC2626',
          borderRadius: 8
        }}
      >
        <Text style={{ fontSize: 14, color: '#374151' }}>Login</Text>
      </TouchableOpacity>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </View>
  );
}