// packages/ui/src/index.ts
export { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

// Components - Web only
export { default as Header } from "./components/Header/Header.web";
export { default as Nav } from "./components/Nav/Nav";
export { default as Hero } from "./components/Hero/Hero";
export { default as Section } from "./components/Section/Section";
export { default as Footer } from "./components/Footer/Footer";

// Auth components
export { AuthButton } from "./components/auth/AuthButton";
export { LoginForm } from "./components/auth/LoginForm";
export { RegisterForm } from "./components/auth/RegisterForm";