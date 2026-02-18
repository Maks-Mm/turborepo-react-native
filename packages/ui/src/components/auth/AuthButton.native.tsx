// packages/ui/src/components/auth/AuthButton.native.tsx
import { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { AuthModal } from "./AuthModal.native";
import { StyleSheet } from 'react-native';

const useSafeAuth = () => {
  try {
    const { useAuth } = require("@repo/auth");
    return useAuth();
  } catch (error) {
    console.warn('Auth not available, using fallback');
    return { user: null, loading: false, logout: () => { } };
  }
};

export default function AuthButton() {
  const { user, loading, logout } = useSafeAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center' },
    userEmail: { fontSize: 14, color: '#374151' },
    button: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
    loginButton: { backgroundColor: '#2563EB' },
    logoutButton: { backgroundColor: '#DC2626' },
    buttonText: { fontSize: 14, color: '#FFFFFF', fontWeight: '600' },
    loadingButton: { backgroundColor: '#9CA3AF', flexDirection: 'row', alignItems: 'center' },
  });

  if (loading) {
    return (
      <TouchableOpacity style={[styles.button, styles.loadingButton]} disabled>
        <ActivityIndicator size="small" color="#FFFFFF" />
        <Text style={styles.buttonText}>Loading...</Text>
      </TouchableOpacity>
    );
  }

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.userEmail}>{user.email}</Text>
        <TouchableOpacity onPress={logout} style={[styles.button, styles.logoutButton]}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setShowAuthModal(true)} style={[styles.button, styles.loginButton]}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Modal
        visible={showAuthModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAuthModal(false)}
      >
        <AuthModal onClose={() => setShowAuthModal(false)} />
      </Modal>
    </View>
  );
}
