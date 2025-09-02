"use client";

import React, { useState, useRef } from "react"; // useEffect no es necesario si no hay efectos directos
import { motion, useReducedMotion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Github, Linkedin, Twitter, Mail, ChevronUp, MessageCircle, ExternalLink, ArrowRight, CheckCircle, Shield, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Usar Link de Next.js para navegación interna

// Tipos de Datos
interface FooterLink {
  href: string;
  text: string;
  isExternal?: boolean;
  badge?: string;
  badgeTheme?: "primary" | "secondary";
}
interface LinkCategory {
  title: string;
  links: FooterLink[];
}
interface SocialLink {
  href: string;
  icon: React.ElementType;
  label: string;
}
interface CertificationItem {
    icon: React.ElementType;
    text: string;
    theme: "primary" | "secondary" | "accent";
}

// Helper para temas de certificaciones
const getThemeClasses = (theme: "primary" | "secondary" | "accent") => {
    switch (theme) {
        case "primary": return {
            text: "text-primary",
            border: "border-primary/30",
            bg: "bg-primary/10"
        };
        case "secondary": return {
            text: "text-secondary",
            border: "border-secondary/30",
            bg: "bg-secondary/10"
        };
        case "accent": return {
            text: "text-accent",
            border: "border-accent/30",
            bg: "bg-accent/10"
        };
        default: return {
            text: "text-primary",
            border: "border-primary/30",
            bg: "bg-primary/10"
        };
    }
};

const footerLinksData: LinkCategory[] = [
  {
    title: "Producto",
    links: [
      { href: "#beneficios", text: "Características" }, { href: "#precios", text: "Precios" },
      { href: "#integraciones", text: "Integraciones" }, { href: "#casos", text: "Casos de Uso" },
      { href: "/status", text: "Estado del Servicio", isExternal: false } // Asumir página interna
    ]
  },
  {
    title: "Recursos",
    links: [
      { href: "/docs", text: "Documentación" }, { href: "/blog", text: "Blog" },
      { href: "/comunidad", text: "Comunidad" }, { href: "/soporte", text: "Soporte" },
      { href: "/api-docs", text: "API", badge: "Nuevo", badgeTheme: "primary" }
    ]
  },
  {
    title: "Empresa",
    links: [
      { href: "/nosotros", text: "Sobre Nosotros" },
      { href: "/carreras", text: "Carreras", badge: "Contratando", badgeTheme: "secondary" },
      { href: "/prensa", text: "Prensa" }, { href: "/contacto", text: "Contacto" }
    ]
  }
];

const socialLinksData: SocialLink[] = [
  { href: "https://github.com/your-profile", icon: Github, label: "GitHub de Flow AI" },
  { href: "https://linkedin.com/company/aiflow", icon: Linkedin, label: "LinkedIn de Flow AI" },
  { href: "https://twitter.com/aiflowapp", icon: Twitter, label: "Twitter de Flow AI" },
  { href: "mailto:contacto@aiflow.app", icon: Mail, label: "Enviar correo a Flow AI" }
];

const certificationsData: CertificationItem[] = [
    { icon: Shield, text: "ISO 27001 Certificado", theme: "primary"},
    { icon: Shield, text: "GDPR Compliant", theme: "primary"},
    { icon: Globe, text: "Soporte Global 24/7", theme: "primary"},
];

const legalLinksData: FooterLink[] = [
    { href: "/politica-privacidad", text: "Política de Privacidad" },
    { href: "/terminos-servicio", text: "Términos de Servicio" },
    { href: "/politica-cookies", text: "Política de Cookies" },
    { href: "/accesibilidad", text: "Declaración de Accesibilidad" }
];


export default function Footer() {
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const newsletterFeedbackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Newsletter Email:", newsletterEmail); // Simulación de envío
    setIsNewsletterSubmitted(true);
    setNewsletterEmail(""); 
    // El foco se moverá al mensaje de feedback si es un live region
    if (newsletterFeedbackRef.current) {
        newsletterFeedbackRef.current.focus(); 
    }
    // No se usa setTimeout para ocultar, se mantiene visible o se añade botón de cierre
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };
  
  return (
    <footer className="pt-20 pb-8 md:pb-10 px-4 bg-dark-bg relative overflow-hidden" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Pie de página y enlaces de navegación</h2>
      {!shouldReduceMotion && (
        <>
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-transparent to-secondary opacity-40"></div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow-soft opacity-70"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow-soft animation-delay-2000 opacity-70"></div>
        </>
      )}
      
      <button 
        onClick={scrollToTop}
        className="absolute right-6 top-6 md:right-8 md:top-8 z-20 bg-dark-card/80 border border-white/10 p-2.5 md:p-3 rounded-full hover:border-primary/50 transition-all duration-300 backdrop-blur-sm group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Volver al inicio de la página"
      >
        <ChevronUp size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
      </button>
      
      {/* Newsletter */}
      <div className="container mx-auto mb-16 md:mb-20">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}
          className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 via-dark-card/30 to-secondary/10 rounded-xl p-6 md:p-10 border border-white/10 backdrop-blur-md relative overflow-hidden shadow-xl"
        >
          {!shouldReduceMotion && (
            <>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 opacity-70"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10 opacity-70"></div>
            </>
          )}
          
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-between relative z-10">
            <div className="lg:max-w-md text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-white leading-tight">
                Mantente Actualizado con Flow AI
              </h3>
              <p className="text-muted-foreground/90 text-base">
                Recibe las últimas novedades, consejos de automatización, actualizaciones de producto y ofertas especiales directamente en tu bandeja de entrada.
              </p>
            </div>
            
            <div className="w-full lg:w-auto lg:min-w-[400px]">
              {isNewsletterSubmitted ? (
                <div ref={newsletterFeedbackRef} tabIndex={-1} // Para mover el foco
                    className="flex items-center gap-3 bg-green-600/20 text-green-300 px-5 py-3.5 rounded-lg border-2 border-green-500/40 text-base"
                    role="alert" // Anunciar como alerta
                >
                  <CheckCircle size={20} />
                  <span>¡Gracias por suscribirte! Revisa tu correo.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <label htmlFor="newsletter-email" className="sr-only">Tu correo electrónico para el newsletter</label>
                  <input id="newsletter-email" type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Tu mejor correo electrónico" required
                    className="flex-1 px-5 py-3.5 rounded-lg bg-dark-card/60 border-2 border-white/10 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/60 transition-all duration-300 placeholder-muted-foreground/70 text-base"/>
                  <motion.button type="submit"
                    whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }} whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                    className="px-7 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:glow-green-soft transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2 text-base">
                    Suscribirme <ArrowRight size={18} />
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="container mx-auto">
        <motion.div variants={staggerContainer(0.1, 0.15)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            {/* Logo, descripción y sociales */}
            <motion.div variants={fadeIn} className="col-span-1 md:col-span-12 lg:col-span-4">
              <div className="mb-6">
                <Link href="/" aria-label="Página de inicio de Flow AI">
                  <div className="relative w-auto inline-flex items-center group"> {/* inline-flex para que no ocupe todo el ancho */}
                    <Image src="/design/logo.png" alt="Logo de Flow AI" width={130} height={52}
                      className="object-contain transition-transform duration-300 group-hover:scale-105"/>
                    {!shouldReduceMotion && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-pulse-slow-soft pointer-events-none rounded-md"></div>}
                  </div>
                </Link>
              </div>
              <p className="text-muted-foreground/90 mb-6 max-w-md text-sm leading-relaxed">
                Flow AI: Tu plataforma de automatización conversacional multicanal potenciada por IA. Conecta WhatsApp, Gmail, Calendar y más para llevar tu negocio al siguiente nivel.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {certificationsData.map(cert => {
                    const Icon = cert.icon;
                    const theme = getThemeClasses(cert.theme); // Asumiendo getThemeClasses está definido
                    return(
                    <div key={cert.text} className={`flex items-center gap-2 bg-dark-card/40 px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-medium ${theme.text}`}>
                        <Icon size={14} className="opacity-80" aria-hidden="true" />
                        <span>{cert.text}</span>
                    </div>
                )})}
              </div>
              <div className="flex space-x-3">
                {socialLinksData.map(social => {
                  const Icon = social.icon;
                  return(
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-dark-card/50 border border-white/10 flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={social.label}>
                    <Icon size={18} />
                  </a>
                )})}
              </div>
            </motion.div>
            
            {/* Columnas de Enlaces (Producto, Recursos, Empresa) */}
            {footerLinksData.map(category => (
            <motion.div variants={fadeIn} key={category.title} className="col-span-1 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <h4 className="text-sm font-semibold mb-5 uppercase tracking-wider text-white/90">
                {category.title}
              </h4>
              <ul className="space-y-3">
                {category.links.map(link => (
                  <li key={link.text}>
                    <Link href={link.href} target={link.isExternal ? "_blank" : "_self"} rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground/80 hover:text-primary transition-colors duration-200 flex items-center gap-1.5 group">
                      {!shouldReduceMotion && <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300 opacity-70"></span>}
                      {link.text}
                      {link.badge && (
                        <span className={`text-xs ml-1 px-1.5 py-0.5 rounded-full font-semibold ${link.badgeTheme === 'primary' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            ))}
            
            {/* Contacto */}
            <motion.div variants={fadeIn} className="col-span-1 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <h4 className="text-sm font-semibold mb-5 uppercase tracking-wider text-white/90">
                Contacto Directo
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <Mail size={16} className="text-primary mt-1 flex-shrink-0 opacity-80" aria-hidden="true"/>
                  <a href="mailto:info@aiflow.app" className="text-sm text-muted-foreground/80 hover:text-primary transition-colors">info@aiflow.app</a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MessageCircle size={16} className="text-primary mt-1 flex-shrink-0 opacity-80" aria-hidden="true"/>
                  <span className="text-sm text-muted-foreground/80">Soporte en vivo <span className="font-semibold text-white/70">24/7</span></span>
                </li>
                <li>
                  <Link href="#contacto-demo"
                    className="inline-flex items-center gap-2 mt-3 text-sm text-primary font-semibold hover:underline decoration-primary/50">
                    Agendar una Demo Personalizada <ExternalLink size={14} />
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
        
        <div className="border-t border-white/10 my-10 md:my-12"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-xs text-muted-foreground/70 mb-4 md:mb-0">
            © {new Date().getFullYear()} Flow AI Technologies Inc. Todos los derechos reservados. 
          </p>
          <nav aria-label="Enlaces legales">
            <ul className="flex flex-wrap justify-center md:justify-end gap-x-5 gap-y-2">
                {legalLinksData.map(link => (
                    <li key={link.text}>
                        <Link href={link.href} className="text-xs text-muted-foreground/70 hover:text-primary transition-colors">
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>
          </nav>
        </div>
        
        {!shouldReduceMotion && (
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}
          className="mt-10 p-4 rounded-lg bg-dark-card/80 border border-white/10 font-mono text-xs backdrop-blur-sm relative overflow-hidden group hover:border-white/20 transition-all duration-300"
          aria-hidden="true" // Es decorativo
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex items-center mb-2 relative z-10">
            <span className="w-3 h-3 rounded-full bg-red-500/80 mr-1.5"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 mr-1.5"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
          </div>
          <div className="text-muted-foreground/70 relative z-10">
            <span className="text-primary/80">$</span> deploy --version=2.2.1 --target=production --region=latam<br />
            <span className="text-secondary/80">&gt;</span> build: success | tests: passed | deployment: complete<br/>
            <span className="text-green-400/80">&gt;</span> Site is live at <a href="https://shinsekai.cl" className="text-accent/80 hover:underline">https://shinsekai.cl</a> (commit: <span className="text-yellow-400/80">#a1f10w</span>)
          </div>
        </motion.div>
        )}
      </div>
    </footer>
  );
}