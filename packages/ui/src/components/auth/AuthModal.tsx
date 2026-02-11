// packages/ui/src/components/auth/AuthModal.tsx
"use client";

import { useState } from 'react';
import  LoginForm from './LoginForm.web';
import { RegisterForm } from './RegisterForm';

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setMode('login')}
              className={`px-4 py-2 font-medium ${mode === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`px-4 py-2 font-medium ${mode === 'register' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              Register
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        {mode === 'login' ? <LoginForm /> : <RegisterForm />}
        
        <div className="mt-4 text-center text-sm text-gray-500">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-blue-600 hover:underline"
              >
                Register here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-blue-600 hover:underline"
              >
                Login here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}