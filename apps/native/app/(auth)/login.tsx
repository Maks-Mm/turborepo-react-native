 //apps/native/app/(auth)/login.tsx

import { NativeLoginForm } from '../../auth';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';  // Add this import

  function LoginScreen() {
  const router = useRouter();  // Add this

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb', justifyContent: 'center', padding: 16 }}>
      <View style={{ backgroundColor: 'white', borderRadius: 8, padding: 24, shadowOpacity: 0.1 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#374151', textAlign: 'center', marginBottom: 32 }}>
          Sign in to your account
        </Text>
        <NativeLoginForm onSuccess={() => router.replace('/(tabs)')} />  {/* Navigate to tabs after login */}
      </View>
    </View>
  );
} 

export default LoginScreen;