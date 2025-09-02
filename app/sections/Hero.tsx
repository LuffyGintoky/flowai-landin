"use client";

import { motion, useReducedMotion } from "framer-motion";
import {  Zap, ShieldCheck, BarChart3, Clock } from "lucide-react"; // Agregado Clock
import { fadeIn } from "@/lib/animations"; // Asumo que pulseAnimation es { scale: [1, 1.05, 1] } o similar
import { useState, useEffect } from "react";
import Image from "next/image";

// Definimos una variante 'visible' para cuando el movimiento está reducido
// const visibleVariant = { opacity: 1, y: 0, scale: 1 };


export default function Hero() {
  const [particles, setParticles] = useState<Array<{top: string, left: string, opacity: number, animation: string}>>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!shouldReduceMotion) { // Solo generar partículas si no se prefiere movimiento reducido
      const newParticles = Array.from({ length: 15 }, () => ({ // Reducido a 15 por si acaso
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.4 + 0.2, // Ligeramente más sutiles
        animation: `pulse ${Math.random() * 4 + 3}s infinite alternate` // 'alternate' para un movimiento más suave
      }));
      setParticles(newParticles);
    }
  }, [shouldReduceMotion]);

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-20 overflow-hidden" 
      id="inicio"
      aria-labelledby="hero-title" // Para accesibilidad, vincula el título a la sección
    >
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg to-dark-card z-0" />
      
      {/* Efecto de partículas (condicional) */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 opacity-25"> {/* Reducida opacidad global */}
          {particles.map((particle, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary"
              style={{
                top: particle.top,
                left: particle.left,
                opacity: particle.opacity,
                animation: particle.animation
              }}
            />
          ))}
        </div>
      )}
      
      {/* Contenido principal */}
      <div className="container mx-auto z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Icono con glow */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn} // fadeIn debería ser { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
            className="mb-6"
          >
            <div className="p-3 rounded-full bg-dark-card border border-primary/30 glow-green-soft"> {/* Ajuste a border-primary/30 y un glow más suave */}
              <Zap size={28} className="text-primary" aria-hidden="true" />
            </div>
          </motion.div>
          
          {/* Título principal */}
          <motion.h1 
            id="hero-title"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-4xl md:text-6xl font-bold mb-6 text-glow-green" // Aumentado el mb a 6
          >
            Un único agente inteligente <br className="hidden md:block" />
            <span className="text-primary">para todos tus canales</span>
          </motion.h1>
          
          {/* Subtítulo */}
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl" // Aumentado el mb a 10
          >
            Unifica chat web, correo, WhatsApp, SMS y llamadas con un solo agente de IA.
            Responde, ejecuta y resuelve: agenda citas, gestiona reembolsos y procesa pedidos
            de forma autónoma, 24/7.
          </motion.p>
          
          {/* Botones CTA */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center" // sm:w-auto para que no ocupe todo el ancho en pantallas pequeñas
          >
            {/* <motion.button 
              variants={!shouldReduceMotion ? pulseAnimation : {}} // Aplicar pulseAnimation solo si no hay `prefers-reduced-motion`
              animate={!shouldReduceMotion ? "pulse" : "visible"} // 'visible' podría ser una variante estática definida arriba
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:glow-green-soft transition-all duration-300 shadow-lg shadow-primary/30" // font-semibold, shadow-primary/30
            >
              Probar gratis <ArrowRight size={18} aria-hidden="true" />
            </motion.button> */}
            
            <motion.button
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
              className="px-8 py-3 rounded-lg border border-white/20 bg-dark-card/60 backdrop-blur-sm hover:border-primary/40 hover:bg-dark-card/80 transition-all duration-300 flex items-center justify-center gap-2 font-medium" // border-white/20, bg-dark-card/60, font-medium
              onClick={() => window.location.href = "/calendar"}
            >
              Solicitar Demo Personalizada <Zap size={16} className="text-neon-purple" aria-hidden="true" /> {/* Texto más específico */}
            </motion.button>
          </motion.div>
          
          {/* Badges de confianza (mejorados con iconos) */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-wrap justify-center gap-x-4 gap-y-3 mt-12" // Aumentado mt a 12 y gap-y-3 para mejor espaciado
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-card/70 border border-white/10 text-sm font-medium">
              <Clock size={16} className="text-neon-green" aria-hidden="true" />
              <span>Atención 24/7</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-card/70 border border-white/10 text-sm font-medium">
              <ShieldCheck size={16} className="text-neon-blue" aria-hidden="true" />
              <span>Automatiza hasta 80% de consultas</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-card/70 border border-white/10 text-sm font-medium">
              <BarChart3 size={16} className="text-neon-purple" aria-hidden="true" />
              <span>Integrado con CRM/ERP y e‑commerce</span>
            </div>
          </motion.div>
          
          {/* Ilustración de flujo */}
          {/* IMPORTANTE: El contenido visual de 'hero1.png' es CRUCIAL. */}
          {/* Debe ilustrar claramente el concepto de Flow AI: la interconexión, la automatización, o una vista estilizada de la plataforma en acción. */}
          {/* Si es demasiado abstracta, pierde efectividad. Considera un diagrama simplificado, iconos de apps conectándose, etc. */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mt-16 w-full max-w-4xl mx-auto"
          >
            <motion.div 
              className="relative p-1 md:p-2 rounded-xl glass overflow-hidden" // Reducido padding para dar más espacio a la imagen
              animate={!shouldReduceMotion ? { y: [0, -10, 0] } : { y: 0 }} // Movimiento solo si no hay `prefers-reduced-motion`
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatType: "mirror" // Hace el movimiento de vuelta más natural
              }}
            >
              <div className="relative">
                {/* Contenedor con aspect ratio para la imagen */}
                <div className="w-full aspect-[16/9] relative rounded-lg overflow-hidden shadow-2xl shadow-black/30"> {/* Añadido shadow */}
                  <Image 
                    src="/design/hero1.png" 
                    alt="Diagrama de flujo de Flow AI mostrando la automatización conversacional multicanal con IA" // ALT TEXT MÁS DESCRIPTIVO
                    fill
                    priority
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Ejemplo de atributo sizes
                  />
                  
                  {/* Máscara de borde con degradado (más sutil) */}
                  <div className="absolute inset-0 pointer-events-none" style={{ 
                    boxShadow: 'inset 0 0 30px 15px var(--dark-bg)', // Ajustado
                    borderRadius: '8px' 
                  }}></div>
                  
                  {/* Bordes con degradado */}
                  <div className="absolute top-0 inset-x-0 h-[15px] bg-gradient-to-b from-dark-bg to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-0 inset-x-0 h-[15px] bg-gradient-to-t from-dark-bg to-transparent pointer-events-none"></div>
                  <div className="absolute left-0 inset-y-0 w-[15px] bg-gradient-to-r from-dark-bg to-transparent pointer-events-none"></div>
                  <div className="absolute right-0 inset-y-0 w-[15px] bg-gradient-to-l from-dark-bg to-transparent pointer-events-none"></div>
                </div>
                
                {/* Overlay con efecto de brillo (opcional, puede ser mucho) */}
                {/* <div className="absolute inset-0 bg-gradient-to-tr from-dark-bg/30 via-transparent to-primary/10 pointer-events-none"></div> */}
                
                {/* Puntos de brillo (condicional y más sutiles) */}
                {!shouldReduceMotion && (
                  <>
                    <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse-slow opacity-75"></div>
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-neon-purple rounded-full animate-pulse-slow opacity-75"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-neon-blue rounded-full animate-pulse-slow opacity-75"></div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Recordatorio de Contraste: Asegúrate de que todos los textos (especialmente text-muted-foreground y textos con glow) */}
      {/* tengan suficiente contraste con sus fondos. Usa herramientas como WebAIM Contrast Checker. */}
      {/* Por ejemplo, --muted-foreground debería ser significativamente más claro que --dark-bg. */}
      {/* El efecto 'glow-green' debe ser sutil para no afectar la legibilidad del texto sobre el que se aplica. */}
    </section>
  );
}