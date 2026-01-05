// packages/ui/src/index.tsx
// Export ALL components from here

// Client Components (with interactivity)
export { default as Header } from './components/Header';
export { default as LanguageProvider, useLanguage } from './contexts/LanguageContext';

// Server Components (static)
export { default as HeaderServer } from './components/HeaderServer';

// Other components (check if they need "use client")
export { default as Hero } from './components/Hero';
export { default as Nav } from './components/Nav';
export { default as Footer } from './components/Footer';
export { default as Section } from './components/Section';