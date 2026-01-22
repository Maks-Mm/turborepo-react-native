//apps/web/app/(auth)/register/page.tsx

'use client';
import { RegisterForm } from '@repo/ui/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Rejestracja
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
}
