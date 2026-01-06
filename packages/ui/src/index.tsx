//packages/ui/src/index.tsx
export { default as Header } from "./components/Header";
export { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

// Other UI
export { default as Hero } from "./components/Hero";
export { default as Nav } from "./components/Nav";
export { default as Footer } from "./components/Footer";
export { default as Section } from "./components/Section";

// Optional server-only
export { default as HeaderServer } from "./components/HeaderServer";
