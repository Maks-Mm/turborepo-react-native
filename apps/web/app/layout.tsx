//apps/web/app/layout.tsx

import { AuthProvider } from '@repo/auth';
import './globals.css';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={""}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}