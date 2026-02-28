//apps/web/app/(dashboard)/updates/page.tsx

'use client';

import { useEffect, useState } from 'react';
//import Link from 'next/link';

interface TaxUpdate {
  id: string;
  title: string;
  category: string;
  source: string;
  publishedAt: string;
}

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<TaxUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      // TODO: Replace with your actual API endpoint
      const res = await fetch('http://localhost:3001/api/updates');
      const data = await res.json();
      setUpdates(data);
    } catch (error) {
      console.error('Failed to fetch updates:', error);
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
      <h1 className="text-3xl font-bold mb-6">📰 Steuer-Updates</h1>

      {updates.length === 0 && (
        <p className="text-gray-500">Keine Updates verfügbar.</p>
      )}

      <div className="flex flex-col gap-4">
        {updates.map((update) => (
          <div
            key={update.id}
            className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{update.title}</span>
              <span className="text-sm text-gray-500">
                {new Date(update.publishedAt).toLocaleDateString('de-DE')}
              </span>
            </div>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>Kategorie: {update.category}</span>
              <span>Quelle: {update.source}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
