// packages/ui/src/components/Header/index.tsx
'use client';

import React, { Suspense, useState, useEffect, lazy } from 'react';

// Simple platform detection with proper typing
const isReactNative = (): boolean => {
  if (typeof window === 'undefined') return false; // SSR
  if (typeof navigator === 'undefined') return false;
  
  // Type-safe check for React Native
  const nav = navigator as Navigator & { product?: string };
  const win = window as Window & { ReactNativeWebView?: unknown };
  
  return (
    nav.product === 'ReactNative' ||
    (typeof nav.product === 'undefined' && 
     typeof win.ReactNativeWebView !== 'undefined')
  );
};

// Dynamic imports with proper typing
const HeaderWeb = lazy(() => import('./Header.web'));
const HeaderNative = lazy(() => import('./Header.native'));

// Fallback component
const HeaderFallback = () => (
  <div style={{ 
    height: '64px', 
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px'
  }}>
    <div style={{ 
      width: '32px', 
      height: '32px', 
      backgroundColor: '#e5e7eb',
      borderRadius: '8px',
      marginRight: '12px'
    }} />
    <div>
      <div style={{ 
        width: '100px', 
        height: '20px', 
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        marginBottom: '4px'
      }} />
      <div style={{ 
        width: '150px', 
        height: '16px', 
        backgroundColor: '#e5e7eb',
        borderRadius: '4px'
      }} />
    </div>
  </div>
);

const Header = () => {
  const [isNative, setIsNative] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  
  useEffect(() => {
    try {
      setIsNative(isReactNative());
    } catch (error) {
      console.error('Error detecting platform:', error);
      setIsNative(false); // Fallback to web
    }
  }, []);
  
  // Error boundary would be better, but for simplicity:
  if (hasError) {
    return (
      <div style={{ 
        height: '64px', 
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px',
        borderBottom: '1px solid #fecaca'
      }}>
        Header failed to load
      </div>
    );
  }
  
  const HeaderComponent = isNative ? HeaderNative : HeaderWeb;
  
  return (
    <Suspense fallback={<HeaderFallback />}>
      <HeaderComponent />
    </Suspense>
  );
};

export default Header;