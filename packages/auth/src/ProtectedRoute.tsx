//packages/auth/AuthContext.tsx

'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  return user ? <>{children}</> : null;
};