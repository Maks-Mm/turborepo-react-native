//app/web/app/(auth)/login/page.tsx

'use client';
import { LoginForm } from '@repo/ui/components/auth/LoginForm';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginForm />
    </div>
  );
}