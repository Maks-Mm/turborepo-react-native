// apps/web/app/(dashboard)/page.tsx
'use client';

import { ProtectedRoute } from '../components/ProtectedRoute';
import { Nav } from '@repo/ui';

function DashboardContent() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <main className="p-4 md:p-8">
          <DashboardContent />
        </main>
      </div>
    </ProtectedRoute>
  );
}
