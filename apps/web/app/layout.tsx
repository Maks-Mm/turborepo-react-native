//apps/web/app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Doch - Für polnische Unternehmer in DE',
  description: 'Business in Germany. Clear. In Polish.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}