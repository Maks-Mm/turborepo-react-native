//apps/web/app/(dashboard)/layout.tsx

'use client';

import { ProtectedRoute } from '../components/ProtectedRoute';
import { Nav } from '@repo/ui';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
