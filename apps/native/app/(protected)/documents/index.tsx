// apps/native/app/(protected)/documents/index.tsx
import { View, Text, ScrollView } from 'react-native';

export default function DocumentsScreen() {
  const documents = [
    { id: '1', type: 'invoice', status: 'pending' },
    { id: '2', type: 'contract', status: 'analyzed' },
  ];

  return (
    <ScrollView className="p-6 bg-white">
      <Text className="text-3xl font-bold mb-6">📎 Documents</Text>

      {documents.map((doc) => (
        <View key={doc.id} className="border rounded-lg p-4 mb-4 bg-yellow-50">
          <Text>Type: {doc.type}</Text>
          <Text>Status: {doc.status}</Text>
        </View>
      ))}

      {documents.length === 0 && <Text>No documents.</Text>}
    </ScrollView>
  );
}