// apps/web/app/page.tsx (WEB)
import { Header, Nav, Hero, Footer, Section, LanguageProvider } from "@repo/ui"; // Default (web)

export default function Web() {
  return (
    <LanguageProvider>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header /> {/* Header.web */}
        <Nav />
        <Hero />
        <Section />
        <Footer />
      </div>
    </LanguageProvider>
  );
}