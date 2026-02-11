// packages/ui/src/index.ts
export { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

// old export before updating : export { default as Header } from "./components/Header/Header.web";

export { default as Header } from "./components/Header";


export { default as Nav } from "./components/Nav";

export { default as Hero } from "./components/Hero/Hero";
export { default as Section } from "./components/Section/Section";
export { default as Footer } from "./components/Footer/Footer";

export { AuthButton } from "./components/auth/AuthButton";
//export { LoginForm } from "./components/auth/LoginForm.web"
export { default as LoginForm } from "./components/auth/LoginForm.web";

export { RegisterForm } from "./components/auth/RegisterForm";