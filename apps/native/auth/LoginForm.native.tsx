//apps/native/auth/LoginForm.native.tsx

import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '@repo/auth';

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
const { login, loading } = useAuth();

  const handleSubmit = async () => {
    setError('');
    try {
      await login(email, password);
       onSuccess?.();
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <View className="w-full space-y-4 p-4">
      <View>
        <Text className="text-sm font-medium text-gray-700 mb-1">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
          className="border border-gray-300 rounded-md p-2 bg-white"
        />
      </View>
      
      <View>
        <Text className="text-sm font-medium text-gray-700 mb-1">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          className="border border-gray-300 rounded-md p-2 bg-white"
        />
      </View>
      
      {error ? (
        <Text className="text-red-600 text-sm">{error}</Text>
      ) : null}
      
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        className="bg-blue-600 rounded-md p-3 items-center disabled:opacity-50"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-medium">Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}