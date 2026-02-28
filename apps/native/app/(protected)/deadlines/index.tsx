// apps/native/app/(protected)/deadlines/index.tsx
import { View, Text, ScrollView } from 'react-native';

export default function DeadlinesScreen() {
  const deadlines = [
    { id: '1', title: 'Steuererklärung', dueDate: '2026-03-05' },
    { id: '2', title: 'Mietvertrag prüfen', dueDate: '2026-03-08' },
  ];

  return (
    <ScrollView className="p-6 bg-white">
      <Text className="text-3xl font-bold mb-6">📅 Deadlines</Text>

      {deadlines.map((d) => (
        <View key={d.id} className="border rounded-lg p-4 mb-4 bg-blue-50">
          <Text>Title: {d.title}</Text>
          <Text>Due Date: {d.dueDate}</Text>
        </View>
      ))}

      {deadlines.length === 0 && <Text>No deadlines.</Text>}
    </ScrollView>
  );
}