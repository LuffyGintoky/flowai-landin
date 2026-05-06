import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'FlowAI · El agente que gestiona tus cotizaciones mineras en WhatsApp',
  description:
    'Respondé cada solicitud de faena a tiempo, con la información exacta. FlowAI gestiona tus cotizaciones por WhatsApp mientras tú operás.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
