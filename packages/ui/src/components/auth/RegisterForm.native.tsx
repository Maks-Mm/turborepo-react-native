// packages/ui/src/components/auth/RegisterForm.native.tsx
"use client";

import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@repo/auth';
import { useRouter } from 'expo-router';

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      await register(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Registration failed');
      Alert.alert('Error', 'Registration failed');
    }
  };

  return (
    <View className="space-y-4 p-4">
      <Text className="text-lg font-bold text-center">Register</Text>
      
      <View>
        <Text className="text-sm font-medium text-gray-700">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          className="mt-1 p-2 border border-gray-300 rounded"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View>
        <Text className="text-sm font-medium text-gray-700">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          className="mt-1 p-2 border border-gray-300 rounded"
          secureTextEntry
        />
      </View>
      
      <View>
        <Text className="text-sm font-medium text-gray-700">Confirm Password</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          className="mt-1 p-2 border border-gray-300 rounded"
          secureTextEntry
        />
      </View>
      
      {error && (
        <Text className="text-red-600 text-sm">{error}</Text>
      )}
      
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-green-600 p-2 rounded"
      >
        <Text className="text-white text-center">Register</Text>
      </TouchableOpacity>
    </View>
  );
}