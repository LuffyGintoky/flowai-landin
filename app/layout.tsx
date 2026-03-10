import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Flow AI | Automatización conversacional con IA",
  description: "Plataforma de automatización conversacional multicanal potenciada por inteligencia artificial. Conecta WhatsApp, Gmail y Calendar para automatizar tu negocio.",
  keywords: ["automatización", "IA", "WhatsApp", "conversacional", "multicanal", "agendamiento", "inteligencia artificial"],
  icons: {
    icon: "/design/logosl.png",
    apple: "/design/logosl.png",
  },
  openGraph: {
    images: ["/design/logosl.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/design/logosl.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${outfit.variable} font-outfit antialiased bg-dark-bg text-white`}
      >
        <Header />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
