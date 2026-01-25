// packages/ui/src/components/auth/AuthModal.native.tsx
"use client";

import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm.native';

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <Modal visible={true} onRequestClose={onClose} transparent>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white rounded-lg p-6 w-full max-w-md">
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row space-x-4">
              <TouchableOpacity
                onPress={() => setMode('login')}
                className={`px-4 py-2 ${mode === 'login' ? 'border-b-2 border-blue-600' : ''}`}
              >
                <Text className={mode === 'login' ? 'text-blue-600' : 'text-gray-500'}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setMode('register')}
                className={`px-4 py-2 ${mode === 'register' ? 'border-b-2 border-blue-600' : ''}`}
              >
                <Text className={mode === 'register' ? 'text-blue-600' : 'text-gray-500'}>Register</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-400">✕</Text>
            </TouchableOpacity>
          </View>
          
          {mode === 'login' ? <LoginForm /> : <RegisterForm />}
        </View>
      </View>
    </Modal>
  );
}