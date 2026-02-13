// packages/ui/src/components/auth/AuthButton.native.tsx
"use client";

import { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

// Try to use auth, but fallback gracefully
const useSafeAuth = () => {
  try {
    const { useAuth } = require("@repo/auth");
    return useAuth();
  } catch (error) {
    console.warn('Auth not available, using fallback');
    return { user: null, loading: false, logout: () => {} };
  }
};

 function AuthButton() {
  const { user, loading, logout } = useSafeAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const styles = {
    container: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: 8,
    },
    userEmail: {
      fontSize: 14,
      color: '#374151',
    },
    button: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    loginButton: {
      backgroundColor: '#2563EB',
    },
    logoutButton: {
      backgroundColor: '#DC2626',
    },
    buttonText: {
      fontSize: 14,
      color: '#FFFFFF',
      fontWeight: '600' as const,
    },
    loadingButton: {
      backgroundColor: '#9CA3AF',
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: 8,
    }
  };

  if (loading) {
    return (
      <TouchableOpacity
        style={[styles.button, styles.loadingButton]}
        disabled={true}
      >
        <ActivityIndicator size="small" color="#FFFFFF" />
        <Text style={styles.buttonText}>Loading...</Text>
      </TouchableOpacity>
    );
  }

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.userEmail}>
          {user.email}
        </Text>
        <TouchableOpacity 
          onPress={() => logout()} 
          style={[styles.button, styles.logoutButton]}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => setShowAuthModal(true)}
      style={[styles.button, styles.loginButton]}
    >
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
  );
}

export default AuthButton;