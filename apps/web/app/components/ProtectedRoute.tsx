// apps/web/app/components/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useAuth } from '@repo/auth';
import { useRouter } from 'next/navigation';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login'); // replace instead of push
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return <>{children}</>;
};
