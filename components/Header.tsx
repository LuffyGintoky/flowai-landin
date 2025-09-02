"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Button } from "./ui/button"; // Asumiendo que está en ui/button
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"; // Para animaciones más ricas

interface NavLinkItem {
  href: string;
  label: string;
}

const navLinks: NavLinkItem[] = [
  { href: "#beneficios", label: "Beneficios" },
  { href: "#funcionamiento", label: "Cómo Funciona" },
  { href: "#casos", label: "Casos de Uso" },
  { href: "#integraciones", label: "Integraciones" },
  { href: "#precios", label: "Precios" },
];

// Hook para smooth scroll (opcional, CSS es más simple si no necesitas offset)
// const useSmoothScroll = (headerHeight = 80) => { // Asume una altura de header aproximada
//   const scrollTo = useCallback((selector: string) => {
//     const element = document.querySelector(selector);
//     if (element) {
//       const elementPosition = element.getBoundingClientRect().top + window.scrollY;
//       const offsetPosition = elementPosition - headerHeight;
      
//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth",
//       });
//     }
//   }, [headerHeight]);
//   return scrollTo;
// };


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  // const scrollTo = useSmoothScroll(headerRef.current?.offsetHeight || 80); // Para scroll JS con offset
  // Para scroll CSS: Asegúrate de tener `scroll-padding-top` en tu <html> o <body>
  // y `scroll-behavior: smooth;`

  // Efecto de scroll para cambiar fondo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // Umbral más pequeño
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efecto para resaltar sección activa y smooth scroll para hash links
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: `-${(headerRef.current?.offsetHeight || 80) + 5}px 0px -60% 0px`, // Ajusta el rootMargin para detectar cuando la sección está bien visible debajo del header
      threshold: 0 // Se activa apenas entra/sale
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = navLinks.map(link => document.querySelector(link.href)).filter(el => el) as Element[];
    sections.forEach(section => observer.observe(section));

    // Smooth scroll para clicks en hashlinks
    const handleNavClick = (e: MouseEvent) => {
        const target = e.target as HTMLAnchorElement;
        if (target.tagName === 'A' && target.hash) {
            const href = target.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    const headerOffset = headerRef.current?.offsetHeight || 80;
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: shouldReduceMotion ? 'auto' : 'smooth'
                    });
                    // Cerrar menú móvil si está abierto y es un enlace de ancla
                    if (mobileMenuOpen) setMobileMenuOpen(false);
                }
            }
        }
    };
    document.addEventListener('click', handleNavClick);

    return () => {
      sections.forEach(section => observer.unobserve(section));
      document.removeEventListener('click', handleNavClick);
    };
  }, [mobileMenuOpen, shouldReduceMotion]);


  // Manejo de menú móvil (abrir/cerrar, foco, scroll lock)
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"; // Bloquear scroll del body
      mobileMenuRef.current?.querySelector('a, button')?.setAttribute('tabindex', '0');
      (mobileMenuRef.current?.querySelector('a, button') as HTMLElement)?.focus(); // Foco al primer elemento
    } else {
      document.body.style.overflow = "";
      // Opcional: Devolver foco al botón de menú si se cerró con Escape o clic fuera
      // mobileMenuButtonRef.current?.focus();
    }
    // Manejar cierre con tecla Escape
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    // Manejar cierre con clic fuera
    const handleClickOutside = (event: MouseEvent) => {
        if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) &&
            mobileMenuButtonRef.current && !mobileMenuButtonRef.current.contains(event.target as Node)) {
            setMobileMenuOpen(false);
        }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
    isScrolled || mobileMenuOpen // Siempre aplicar fondo si el menú móvil está abierto
      ? "bg-dark-card/90 backdrop-blur-lg shadow-lg border-b border-white/5"
      : "bg-transparent"
  } ${shouldReduceMotion ? '!transition-none' : ''}`;

  const navLinkClasses = (href: string) => 
    `relative py-1 text-sm font-medium transition-colors duration-200 ease-in-out
     ${activeSection === href 
       ? "text-neon-green" 
       : "text-white/80 hover:text-neon-green"}
     after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-neon-green
     after:transition-all after:duration-300 ${activeSection === href ? 'after:w-full' : 'after:w-0 group-hover:after:w-1/2'}`;


  return (
    <header ref={headerRef} className={headerClasses} aria-label="Encabezado principal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4"> {/* Ajustado padding */}
        <div className="flex justify-between items-center">
          <Link href="/" aria-label="Página de inicio de Flow AI" className="flex-shrink-0">
            <div className="relative w-auto flex items-center group">
              <Image src="/design/logo.png" alt="Logo de Flow AI" width={110} height={44} // Ligeramente más grande
                className="object-contain transition-transform duration-300 group-hover:scale-105" priority/>
              {!shouldReduceMotion && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500 animate-pulse-slow-soft pointer-events-none rounded-md"></div>}
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" aria-label="Navegación principal">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} 
                className={`group ${navLinkClasses(link.href)}`}
                aria-current={activeSection === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <Button asChild variant="neon-outline-purple" size="sm">
                <Link href="/calendar">Agenda un Demo!</Link>
            </Button>
            <Button asChild variant="neon-solid-green" size="sm" className={!shouldReduceMotion ? "animate-pulse-button" : ""}>
                {/* animate-pulse-button es una animación CSS custom para el brillo */}
                <Link href="/registro">Prueba gratuita</Link>
            </Button>
          </div>

          <button ref={mobileMenuButtonRef} className="md:hidden text-white p-2 -mr-2" onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={mobileMenuOpen} aria-controls="mobile-menu-nav"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu-nav"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeInOut" }}
            className="md:hidden bg-dark-card/95 backdrop-blur-lg border-t border-white/10 shadow-xl absolute w-full"
            // El fondo ya está en el header, aquí solo la división y contenido.
          >
            <nav className="flex flex-col px-4 pt-4 pb-8 space-y-1" aria-label="Navegación móvil">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className={`block px-3 py-3 rounded-md text-base font-medium transition-colors
                              ${activeSection === link.href 
                                ? "bg-neon-green/10 text-neon-green" 
                                : "text-white/80 hover:bg-white/5 hover:text-white"}`}
                  onClick={() => setMobileMenuOpen(false)} // Cerrar al hacer clic (ya estaba)
                  aria-current={activeSection === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 space-y-3">
                <Button asChild variant="neon-outline-purple" size="default" className="w-full">
                    <Link href="/login">Agenda un Demo!</Link>
                </Button>
                <Button asChild variant="neon-solid-green" size="default" className={`w-full ${!shouldReduceMotion ? "animate-pulse-button" : ""}`}>
                    <Link href="/registro">Prueba gratuita</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// CSS adicional para `animate-pulse-button` y `scroll-padding-top` (en tu global.css o similar):
/*
@layer base {
  html {
    scroll-behavior: smooth; // Para CSS smooth scroll
    scroll-padding-top: 80px; // Ajustar a la altura de tu header fijo
  }
}

@keyframes pulse-button-glow {
  0%, 100% { box-shadow: 0 0 5px var(--neon-green-glow, #39FF14), 0 0 10px var(--neon-green-glow, #39FF14); }
  50% { box-shadow: 0 0 15px var(--neon-green-glow, #39FF14), 0 0 25px var(--neon-green-glow, #39FF14); }
}
.animate-pulse-button {
  animation: pulse-button-glow 2s infinite ease-in-out;
  --neon-green-glow: rgba(57, 255, 20, 0.7); // Define este color en tus variables CSS
}

:root {
  --ring: hsl(var(--primary)); // Ejemplo, si tu color primario es 'neon-green'
  --background: hsl(var(--dark-bg-hsl)); // Ejemplo, el HSL de tu dark-bg
}
*/