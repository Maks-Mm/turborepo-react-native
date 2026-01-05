// apps/web/app/page.tsx
import { Header, Nav, Hero, Footer, Section } from "@repo/ui";
import { LanguageProvider } from "@repo/ui";

export default function Web() {
  return (
    <LanguageProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header/>
        <Nav />
        <Hero />
        <Section />
        <Footer />
      </div>
    </LanguageProvider>
  );
}