//packages/ui/src/components/auth/LoginForm.native.tsx

"use client";

import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@repo/auth';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    setError('');
    
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <Text className="text-3xl font-bold text-center text-gray-900">
        Logowanie
      </Text>
      <View className="mt-8 space-y-6">
        <View>
          <Text className="text-sm font-medium text-gray-700">
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            className="mt-1 p-2 border border-gray-300 rounded"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View>
          <Text className="text-sm font-medium text-gray-700">
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            className="mt-1 p-2 border border-gray-300 rounded"
            secureTextEntry
          />
        </View>
        
        {error && (
          <Text className="text-red-600 text-sm">{error}</Text>
        )}
        
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-600 p-2 rounded"
        >
          <Text className="text-white text-center">Login</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center text-sm text-gray-600">
        Nie masz konta?{' '}
        <Link href="/register" className="text-blue-600">
          Zarejestruj się
        </Link>
      </Text>
    </View>
  );
}