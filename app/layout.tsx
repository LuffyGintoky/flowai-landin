import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'FlowAI · Tu equipo de ventas en WhatsApp, operado por IA',
  description:
    'Responde con tu tono, califica intención en tiempo real y deja que tu equipo apruebe lo que importa. El CRM nativo de WhatsApp para equipos LATAM.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
