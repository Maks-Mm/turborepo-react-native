// packages/ui/src/index.ts

export { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

// Components
export { default as Header } from "./components/Header/Header.web";   // Web Header
// export { default as HeaderNative } from "./components/Header/Header.native"; // Native Header - removed to avoid bundling native code in web
export { default as Nav } from "./components/Nav/Nav";
export { default as Hero } from "./components/Hero/Hero";
export { default as Section } from "./components/Section/Section";
export { default as Footer } from "./components/Footer/Footer";
export { default as AuthButton } from "./components/AuthButton";

// You can also add types if needed
// export type { SomeType } from "./components/SomeComponent";
