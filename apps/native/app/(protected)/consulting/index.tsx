// apps/native/app/(protected)/consulting/index.tsx
import { View, Text, ScrollView } from 'react-native';

export default function ConsultingScreen() {
  const bookings = [
    { id: '1', consultant: 'Max Müller', date: '2026-03-05', status: 'pending' },
    { id: '2', consultant: 'Anna Schmidt', date: '2026-03-10', status: 'confirmed' },
  ];

  return (
    <ScrollView className="p-6 bg-white">
      <Text className="text-3xl font-bold mb-6">📞 Consulting Bookings</Text>

      {bookings.map((b) => (
        <View key={b.id} className="border rounded-lg p-4 mb-4 bg-gray-50">
          <Text>Consultant: {b.consultant}</Text>
          <Text>Date: {b.date}</Text>
          <Text>Status: {b.status}</Text>
        </View>
      ))}

      {bookings.length === 0 && <Text>No bookings yet.</Text>}
    </ScrollView>
  );
}