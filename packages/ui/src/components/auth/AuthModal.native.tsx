// packages/ui/src/components/auth/AuthModal.native.tsx
"use client";
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
} from 'react-native';
import LoginForm from './LoginForm.native';
import { RegisterForm } from './RegisterForm.native';

interface AuthModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <Modal 
      visible 
      transparent 
      onRequestClose={onClose} 
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.tabs}>
              <TouchableOpacity
                onPress={() => setMode('login')}
                style={styles.tabButton}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, mode === 'login' && styles.activeTabText]}>
                  Login
                </Text>
                {mode === 'login' && <View style={styles.activeTabIndicator} />}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setMode('register')}
                style={styles.tabButton}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, mode === 'register' && styles.activeTabText]}>
                  Register
                </Text>
                {mode === 'register' && <View style={styles.activeTabIndicator} />}
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            {mode === 'login' ? (
              <LoginForm onSuccess={onSuccess} />
            ) : (
              <RegisterForm />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '90%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tabs: {
    flexDirection: 'row',
    gap: 24,
  },
  tabButton: {
    position: 'relative',
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -9,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#2563eb',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  closeText: {
    fontSize: 20,
    color: '#9ca3af',
    lineHeight: 20,
  },
  formContainer: {
    padding: 20,
  },
});