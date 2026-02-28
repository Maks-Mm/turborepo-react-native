// apps/native/app/(protected)/updates/index.tsx
import { View, Text, ScrollView } from 'react-native';

export default function UpdatesScreen() {
  const updates = [
    { id: '1', title: 'Neue Steuerregelung', publishedAt: '2026-03-01' },
    { id: '2', title: 'Umsatzsteuer Änderungen', publishedAt: '2026-02-25' },
  ];

  return (
    <ScrollView className="p-6 bg-white">
      <Text className="text-3xl font-bold mb-6">📰 Updates</Text>

      {updates.map((u) => (
        <View key={u.id} className="border rounded-lg p-4 mb-4 bg-green-50">
          <Text>Title: {u.title}</Text>
          <Text>Published: {u.publishedAt}</Text>
        </View>
      ))}

      {updates.length === 0 && <Text>No updates yet.</Text>}
    </ScrollView>
  );
}