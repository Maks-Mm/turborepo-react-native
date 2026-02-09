//apps/native/auth/AuthButton.native.tsx

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useAuth } from '@repo/auth';
//import { useRouter } from 'expo-router';

export function AuthButton() {
  const { user, logout } = useAuth();
  // const router = useRouter();

  if (user) {
    return (
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          onPress={logout}
          className="bg-red-600 rounded-lg px-4 py-2"
        >
          <Text className="text-sm text-gray-700">{user.email}</Text>
          <Text className="text-white text-sm font-medium">Logout </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity

        className="bg-blue-600 rounded-lg px-4 py-2"
      >
        <Text className="text-white text-sm font-medium">Login</Text>
      </TouchableOpacity>
    </View>
  );
}