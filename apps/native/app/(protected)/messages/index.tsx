// apps/native/app/(protected)/messages/index.tsx
import { View, Text, ScrollView } from 'react-native';

export default function MessagesScreen() {
  const messages = [
    { id: '1', content: 'Hallo, deine Frist ist bald fällig.', senderType: 'system', isRead: false },
    { id: '2', content: 'Beratung gebucht für nächste Woche.', senderType: 'consultant', isRead: true },
  ];

  return (
    <ScrollView className="p-6 bg-white">
      <Text className="text-3xl font-bold mb-6">💬 Messages</Text>

      {messages.map((msg) => (
        <View
          key={msg.id}
          className={`border rounded-lg p-4 mb-4 ${msg.isRead ? 'bg-gray-50' : 'bg-blue-50'}`}
        >
          <Text>From: {msg.senderType}</Text>
          <Text>{msg.content}</Text>
          {!msg.isRead && <Text className="text-blue-600 font-semibold mt-2">New</Text>}
        </View>
      ))}

      {messages.length === 0 && <Text>No messages.</Text>}
    </ScrollView>
  );
}