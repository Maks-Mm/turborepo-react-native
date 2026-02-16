//packages/ui/src/components/auth/LOginForm.native.tsx

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useAuth } from '@repo/auth';
import {  Link } from 'expo-router';



function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  //const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async () => {
    setError('');
    try {
      await login(email, password);
      onSuccess?.();
     // router.replace('/dashboard');
    } catch {
      setError('Invalid credentials');
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logowanie</Text>

      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Nie masz konta?{' '}
        <Link href="/register" style={styles.link}>
          Zarejestruj się
        </Link>
      </Text>
    </View>
  );
}

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 420,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
  },
  form: {
    marginTop: 24,
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
  },
  error: {
    color: '#dc2626',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#4b5563',
  },
  link: {
    color: '#2563eb',
    fontWeight: '500',
  },
});
