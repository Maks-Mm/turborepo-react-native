// apps/native/app/(protected)/messages/index.tsx
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

interface Message {
  id: string;
  content: string;
  senderType: 'user' | 'consultant' | 'system';
  isRead: boolean;
  createdAt: string;
}

export default function MessagesScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/messages/user-123');
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSenderLabel = (senderType: string) => {
    switch (senderType) {
      case 'user':
        return 'You';
      case 'consultant':
        return 'Consultant';
      case 'system':
        return 'System';
      default:
        return senderType;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.spinner} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>💬 Messages</Text>

      {messages.length === 0 && (
        <Text style={styles.emptyText}>You have no messages at the moment.</Text>
      )}

      <View style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageCard,
              msg.isRead ? styles.readCard : styles.unreadCard
            ]}
          >
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>
                {getSenderLabel(msg.senderType)}
              </Text>
              <Text style={styles.timestamp}>
                {new Date(msg.createdAt).toLocaleString('de-DE')}
              </Text>
            </View>
            <Text style={styles.messageContent}>{msg.content}</Text>
            {!msg.isRead && (
              <Text style={styles.newBadge}>New</Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  spinner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#3B82F6',
    borderTopColor: 'transparent',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 24,
    color: '#111827',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 20,
  },
  messagesContainer: {
    gap: 16,
  },
  messageCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    borderColor: '#E5E7EB',
  },
  readCard: {
    backgroundColor: '#F9FAFB',
  },
  unreadCard: {
    backgroundColor: '#EFF6FF',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  timestamp: {
    fontSize: 14,
    color: '#6B7280',
  },
  messageContent: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  newBadge: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
    textTransform: 'uppercase',
  },
});