// apps/web/app/(dashboard)/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  openDeadlines: number;
  pendingDocuments: number;
  unreadMessages: number;
  nextDeadline: {
    title: string;
    dueDate: string;
    daysLeft: number;
  } | null;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // TODO: Ersetze userId mit echter Auth
      const res = await fetch('http://localhost:3001/api/dashboard/user-123');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
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
      <h1 className="text-3xl font-bold mb-8">📊 Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Deadlines Card */}
        <Link href="/deadlines" className="block">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">📅</span>
              </div>
              <span className="text-3xl font-bold text-blue-600">{stats?.openDeadlines || 0}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Offene Fristen</h3>
            <p className="text-sm text-gray-600">Deadlines die bearbeitet werden müssen</p>
          </div>
        </Link>

        {/* Documents Card */}
        <Link href="/documents" className="block">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <span className="text-2xl">📎</span>
              </div>
              <span className="text-3xl font-bold text-yellow-600">{stats?.pendingDocuments || 0}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Dokumente ausstehend</h3>
            <p className="text-sm text-gray-600">Müssen analysiert werden</p>
          </div>
        </Link>

        {/* Messages Card */}
        <Link href="/messages" className="block">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">💬</span>
              </div>
              <span className="text-3xl font-bold text-green-600">{stats?.unreadMessages || 0}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Ungelesene Nachrichten</h3>
            <p className="text-sm text-gray-600">Von Beratern und System</p>
          </div>
        </Link>
      </div>

      {/* Next Deadline Section */}
      {stats?.nextDeadline && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <h2 className="text-xl font-semibold mb-4">⏰ Nächste Frist</h2>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.nextDeadline.title}</p>
              <p className="text-gray-600 mt-1">
                Fällig am: {new Date(stats.nextDeadline.dueDate).toLocaleDateString('de-DE')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Noch</p>
              <p className="text-4xl font-bold text-blue-600">{stats.nextDeadline.daysLeft}</p>
              <p className="text-sm text-gray-600">Tage</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">⚡ Schnellaktionen</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/documents/upload" className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition">
            <div className="text-3xl mb-2">📤</div>
            <div className="font-medium">Dokument hochladen</div>
          </Link>
          <Link href="/deadlines/new" className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition">
            <div className="text-3xl mb-2">➕</div>
            <div className="font-medium">Neue Frist</div>
          </Link>
          <Link href="/consulting/book" className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition">
            <div className="text-3xl mb-2">📞</div>
            <div className="font-medium">Beratung buchen</div>
          </Link>
          <Link href="/updates" className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition">
            <div className="text-3xl mb-2">📰</div>
            <div className="font-medium">Steuer-Updates</div>
          </Link>
        </div>
      </div>
    </div>
  );
}