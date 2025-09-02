"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import {  Check, Star, Zap, Shield, Clock, PauseCircle, PlayCircle } from "lucide-react"; // Agregado Pause/Play

// Tipos de Datos
interface BenefitItem {
  icon: React.ElementType;
  title: string;
  description: string;
}
interface TestimonialItem {
  id: string; // Para key
  text: string;
  author: string;
  company: string;
}
interface Particle {
  top: string; left: string; opacity: number; animation: string; size: string;
}

const benefitsData: BenefitItem[] = [
  { icon: Zap, title: "Implementación Rápida", description: "Integra Flow AI en menos de 24 horas y empieza a ver resultados." },
  { icon: Shield, title: "100% Seguro y Confiable", description: "Tus datos y los de tus clientes están encriptados y protegidos." },
  { icon: Star, title: "Soporte Premium Dedicado", description: "Asistencia técnica experta disponible 24/7 para ayudarte." },
  { icon: Clock, title: "ROI Garantizado y Rápido", description: "Observa un retorno de inversión tangible en tu primer mes." }
];

const testimonialsData: TestimonialItem[] = [
  { id: "t1", text: "Aumentamos nuestras conversiones en un 45% en solo 2 meses con Flow AI.", author: "María González", company: "TechSolutions Global" },
  { id: "t2", text: "Es, sin duda, el mejor servicio de automatización que hemos probado. Intuitivo y potente.", author: "Carlos Mendoza", company: "Retail Express Latam" },
  { id: "t3", text: "Redujimos nuestros tiempos de respuesta de 24 horas a solo 5 minutos. ¡Increíble!", author: "Laura Sánchez", company: "Clínica Bienestar Total" }
];

const COUNTDOWN_TARGET_DATE = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000); // 3 días y 12 horas desde ahora

export default function CTA() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isTestimonialAutoplayPaused, setIsTestimonialAutoplayPaused] = useState(false);
  const testimonialAutoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState("");
  const shouldReduceMotion = useReducedMotion();

  // Generar partículas
  useEffect(() => {
    if (shouldReduceMotion) return;
    const newParticles = Array.from({ length: 20 }, () => ({ // Reducido número
      top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.3 + 0.1, // Más sutiles
      animation: `pulse ${Math.random() * 4 + 3}s infinite alternate`,
      size: `${Math.random() * 1.5 + 0.5}px` // Tamaño variable
    }));
    setParticles(newParticles);
  }, [shouldReduceMotion]);

  // Carrusel de testimonios
  const nextTestimonial = useCallback(() => {
    setCurrentTestimonialIndex(prev => (prev + 1) % testimonialsData.length);
  }, []);

  useEffect(() => {
    const setupAutoplay = () => {
      if (testimonialAutoplayRef.current) clearInterval(testimonialAutoplayRef.current);
      if (!isTestimonialAutoplayPaused && !shouldReduceMotion) {
        testimonialAutoplayRef.current = setInterval(nextTestimonial, 6000);
      }
    };
    setupAutoplay();
    return () => { if (testimonialAutoplayRef.current) clearInterval(testimonialAutoplayRef.current); };
  }, [isTestimonialAutoplayPaused, nextTestimonial, shouldReduceMotion]);

  // Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = COUNTDOWN_TARGET_DATE.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de envío real aquí (ej. a un endpoint API)
    console.log("Email para prueba gratuita/oferta:", email);
    alert(`¡Gracias! Pronto recibirás información y tu descuento en: ${email}`);
    setEmail("");
  }, [email]);
  
  // const pulseMotion = !shouldReduceMotion ? pulseAnimation : {};

  return (
    <section className="py-20 md:py-28 px-4 bg-dark-bg relative overflow-hidden" id="cta-final" aria-labelledby="cta-main-title">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-dark-bg to-secondary/20 opacity-80" />
      {!shouldReduceMotion && <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03]" />}
      
      {!shouldReduceMotion && (
        <>
          <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse-slow-soft opacity-70"></div>
          <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-secondary/10 rounded-full blur-3xl animate-pulse-slow-soft animation-delay-2000 opacity-70"></div>
        </>
      )}
      
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <div key={i} className="absolute rounded-full bg-white/70"
              style={{ top: p.top, left: p.left, opacity: p.opacity, animation: p.animation, width: p.size, height: p.size }}/>
          ))}
        </div>
      )}
      
      <div className="container mx-auto relative z-10">
        {/* Oferta especial */}
        {(countdown.days > 0 || countdown.hours > 0 || countdown.minutes > 0 || countdown.seconds > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary/25 to-secondary/25 border border-white/10 rounded-xl p-4 md:p-6 max-w-2xl mx-auto mb-12 md:mb-16 text-center backdrop-blur-sm shadow-xl"
          role="alert" aria-live="polite" // Para accesibilidad del countdown
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="text-yellow-400" size={22} />
            <p className="text-yellow-400 font-semibold text-sm md:text-base">¡Oferta Exclusiva por Tiempo Limitado!</p>
          </div>
          <p className="text-white text-base md:text-lg mb-3">Obtén un <span className="font-bold text-yellow-300">25% de DESCUENTO</span> en tu primer mes al registrarte hoy.</p>
          <div className="flex justify-center gap-2 md:gap-3" aria-label={`Tiempo restante de la oferta: ${countdown.days} días, ${countdown.hours} horas, ${countdown.minutes} minutos, ${countdown.seconds} segundos`}>
            {Object.entries(countdown).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="bg-dark-bg/80 w-12 h-12 md:w-14 md:h-14 rounded-md flex items-center justify-center font-mono text-lg md:text-xl font-bold text-white shadow-inner">
                  {value.toString().padStart(2, '0')}
                </div>
                <span className="text-xs text-muted-foreground/80 mt-1.5 capitalize">{unit}</span>
              </div>
            ))}
          </div>
          <p className="sr-only">La oferta termina en {countdown.days} días, {countdown.hours} horas, {countdown.minutes} minutos y {countdown.seconds} segundos.</p>
        </motion.div>
        )}
        
        <motion.div 
          variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeIn} className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide">
                Un único agente para todos tus canales
              </span>
            </div>
            <h2 id="cta-main-title" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-secondary leading-tight">
              Convierte cada conversación en valor para tu negocio
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Flow AI unifica chat, correo, WhatsApp, SMS y llamadas bajo un agente capaz de responder, ejecutar y resolver.
            </p>
          </motion.div>
          
          <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
            {benefitsData.map((benefit) => {
              const Icon = benefit.icon;
              return (
              <div key={benefit.title}
                className="bg-dark-card/40 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-dark-bg/60 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary shadow-inner">
                  <Icon size={26} strokeWidth={1.5}/>
                </div>
                <h3 className="font-semibold mb-1.5 text-white/95">{benefit.title}</h3>
                <p className="text-xs text-muted-foreground/80">{benefit.description}</p>
              </div>
            )})}
          </motion.div>
          
          <motion.div variants={fadeIn}
            className="bg-dark-card/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 mb-12 md:mb-16 relative shadow-xl"
            role="region" aria-roledescription="carousel" aria-label="Testimonios destacados de clientes"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary opacity-70 rounded-t-2xl" />
            <div className="flex justify-between items-center mb-4">
                <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <button onClick={() => setIsTestimonialAutoplayPaused(p => !p)}
                    aria-pressed={isTestimonialAutoplayPaused}
                    className="p-1.5 rounded-full bg-dark-bg/70 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xs flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    aria-label={isTestimonialAutoplayPaused ? "Reanudar autoplay" : "Pausar autoplay"}
                >
                    {isTestimonialAutoplayPaused ? <PlayCircle size={16}/> : <PauseCircle size={16}/>}
                </button>
            </div>
            <div className="relative h-24 md:h-20 overflow-hidden" aria-live="polite"> {/* altura fija para evitar saltos */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialsData[currentTestimonialIndex].id}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <p className="text-white font-medium text-base md:text-lg mb-2">&quot;{testimonialsData[currentTestimonialIndex].text}&quot;</p>
                  <div className="text-sm text-muted-foreground/80">
                    <span className="font-semibold text-primary">{testimonialsData[currentTestimonialIndex].author}</span> – {testimonialsData[currentTestimonialIndex].company}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-center mt-5 space-x-1.5">
              {testimonialsData.map((_, index) => (
                <button key={index} onClick={() => setCurrentTestimonialIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${index === currentTestimonialIndex ? 'bg-primary w-6 scale-110' : 'bg-white/20 hover:bg-white/40'}`}
                  aria-label={`Ver testimonio ${index + 1} de ${testimonialsData.length}`}
                  aria-current={index === currentTestimonialIndex ? "true" : "false"}/>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn} className="text-center">
            {/* Formulario para la oferta y prueba gratuita */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8">
              <label htmlFor="cta-email" className="sr-only">Tu correo electrónico</label>
              <input id="cta-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu mejor correo electrónico" required
                className="flex-1 px-5 py-3.5 rounded-lg bg-dark-card/50 border-2 border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all duration-300 placeholder-muted-foreground/70 text-base"/>
              <button type="submit"
                className="px-7 py-3.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 text-base">
                Obtener Oferta y Probar Gratis
              </button>
            </form>
            
            {/* CTA Secundario */}
            <motion.a href="/calendar" // Enlace a sección de demo o modal
                variants={fadeIn} // Si staggerContainer no aplica a elementos individuales así
                className="inline-block px-8 py-3.5 rounded-lg border-2 border-white/20 text-white/90 font-semibold hover:border-white/40 hover:bg-white/5 transition-colors duration-300 text-base backdrop-blur-sm mt-4"
            >
                Ver Demostración en Vivo
            </motion.a>
            
            <motion.div variants={fadeIn} className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-muted-foreground/80 mt-10">
              {[ "No se requiere tarjeta de crédito", "Cancela en cualquier momento", "Soporte técnico incluido", "Actualizaciones constantes gratuitas"
              ].map(item => (
                <div key={item} className="flex items-center gap-1.5">
                  <Check size={16} className="text-primary flex-shrink-0" /> {item}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}