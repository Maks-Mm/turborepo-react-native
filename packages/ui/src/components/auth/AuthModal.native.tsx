// packages/ui/src/components/auth/AuthModal.native.tsx

import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm.native';

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <Modal visible transparent onRequestClose={onClose} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.tabs}>
              <TouchableOpacity
                onPress={() => setMode('login')}
                style={[styles.tabButton, mode === 'login' && styles.activeTab]}
              >
                <Text style={[styles.tabText, mode === 'login' && styles.activeTabText]}>
                  Login
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setMode('register')}
                style={[styles.tabButton, mode === 'register' && styles.activeTab]}
              >
                <Text style={[styles.tabText, mode === 'register' && styles.activeTabText]}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {mode === 'login' ? <LoginForm /> : <RegisterForm />}
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: '90%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  tabs: {
    flexDirection: 'row',
    gap: 16, // works on newer RN, otherwise use marginRight
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
  },
  tabText: {
    color: '#6b7280',
    fontSize: 16,
  },
  activeTabText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  closeText: {
    color: '#9ca3af',
    fontSize: 20,
  },
});
