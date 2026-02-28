//apps/web/(dashboard)/messages/page.tsx

'use client';

import { useEffect, useState } from 'react';

interface Message {
  id: string;
  content: string;
  senderType: 'user' | 'consultant' | 'system';
  isRead: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      // TODO: Replace with your real API endpoint
      const res = await fetch('http://localhost:3001/api/messages/user-123');
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">💬 Messages</h1>

      {messages.length === 0 && (
        <p className="text-gray-500">You have no messages at the moment.</p>
      )}

      <div className="flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`border rounded-lg p-4 ${
              msg.isRead ? 'bg-gray-50' : 'bg-blue-50'
            } hover:shadow-sm transition`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold">
                {msg.senderType === 'user'
                  ? 'You'
                  : msg.senderType === 'consultant'
                  ? 'Consultant'
                  : 'System'}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(msg.createdAt).toLocaleString('de-DE')}
              </span>
            </div>
            <p className="text-gray-700">{msg.content}</p>
            {!msg.isRead && (
              <span className="mt-2 inline-block text-xs text-blue-600 font-semibold">
                New
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
