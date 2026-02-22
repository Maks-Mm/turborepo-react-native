//packages/auth/rsc/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useAuth } from '@repo/auth';
import { useRouter } from 'next/navigation';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth(); // Only use user
  const router = useRouter();

  useEffect(() => {
    // Simple check without loading state
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  // Show nothing while checking
  if (!user) return null;

  return <>{children}</>;
};