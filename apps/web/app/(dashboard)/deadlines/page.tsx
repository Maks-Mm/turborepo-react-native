//app/web/app/(dashboard)/deadlines/page.tsx

'use client';

import { useEffect, useState } from 'react';

interface Deadline {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  type: string;
  isCompleted: boolean;
}

export default function DeadlinesPage() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeadlines();
  }, []);

  const fetchDeadlines = async () => {
    try {
      // TODO: Ersetze userId mit echter Auth
     // const res = await fetch('/api/deadlines/user/user-123');
      const res = await fetch('http://localhost:3001/api/deadlines/user/user-123');
      
      const data = await res.json();
      setDeadlines(data);
    } catch (error) {
      console.error('Failed to fetch deadlines:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id: string, currentStatus: boolean) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL
await fetch(`${API_URL}/api/deadlines/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: !currentStatus })
      });
      fetchDeadlines(); // Reload
    } catch (error) {
      console.error('Failed to update deadline:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📅 Fristen</h1>
      
      <div className="space-y-4">
        {deadlines.map(deadline => (
          <div 
            key={deadline.id}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold">{deadline.title}</h3>
              <p className="text-sm text-gray-600">
                Fällig: {new Date(deadline.dueDate).toLocaleDateString('de-DE')}
              </p>
              {deadline.description && (
                <p className="text-sm mt-1">{deadline.description}</p>
              )}
            </div>
            <button
              onClick={() => toggleComplete(deadline.id, deadline.isCompleted)}
              className={`px-4 py-2 rounded ${
                deadline.isCompleted 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {deadline.isCompleted ? '✓ Erledigt' : 'Offen'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}