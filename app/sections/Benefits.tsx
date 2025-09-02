"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, MessageSquare, Brain, Globe, CheckCircle2, ArrowRight } from "lucide-react"; // Agregado ArrowRight
import { fadeIn, staggerContainer, hoverCard } from "@/lib/animations"; // Asumo que hoverCard es { rest: { y: 0 }, hover: { y: -8 } } o similar

// Datos de los beneficios mejorados para simplificar clases
const benefitsData = [
  {
    icon: MessageSquare,
    title: "Soporte que resuelve, no solo responde",
    description: "Ejecuta acciones reales desde la conversación: agenda citas, gestiona reembolsos, cancela suscripciones y coordina entregas.",
    theme: "primary",
    stats: "Cierra tickets automáticamente",
    features: ["Agendamiento y recordatorios", "Reembolsos y cambios", "Actualizaciones de pedidos"]
  },
  {
    icon: Clock,
    title: "Disponible 24/7",
    description: "Atiende a tus clientes en cualquier momento, sin esperas y sin perder oportunidades.",
    theme: "secondary",
    stats: "Cobertura permanente",
    features: ["Sin tiempos de espera", "Escalado a humano cuando hace falta", "SLA consistente"]
  },
  {
    icon: Brain,
    title: "Personalización y control",
    description: "Configura tono y personalidad, y elige entre modos Autopilot o Co‑pilot para adaptar el nivel de autonomía.",
    theme: "accent",
    stats: "Respuestas contextuales",
    features: ["Tono alineado a tu marca", "Modos Autopilot/Co‑pilot", "Aprendizaje continuo"]
  },
  {
    icon: Globe,
    title: "Multicanal unificado",
    description: "Un único agente para chat web, e‑mail, WhatsApp, SMS y llamadas, integrado con tu CRM, ERP o e‑commerce.",
    theme: "neutral",
    stats: "Automatiza hasta 80% de consultas",
    features: ["Experiencia consistente", "Sincronización en tiempo real", "API abierta para integrar"]
  }
];

// Helper para clases de tema
const getThemeClasses = (theme: string) => {
  switch (theme) {
    case "primary":
      return {
        iconBg: "bg-primary/10",
        iconText: "text-primary",
        titleText: "text-primary",
        statsText: "text-primary/80",
        checkText: "text-primary/70",
        hoverBorder: "hover:border-primary/40", // Aumentada opacidad
        hoverShadow: "hover:shadow-primary/10",
        blurBg: "bg-primary/10" // Más opacidad para el blur
      };
    case "secondary":
      return {
        iconBg: "bg-secondary/10",
        iconText: "text-secondary",
        titleText: "text-secondary",
        statsText: "text-secondary/80",
        checkText: "text-secondary/70",
        hoverBorder: "hover:border-secondary/40",
        hoverShadow: "hover:shadow-secondary/10",
        blurBg: "bg-secondary/10"
      };
    case "accent":
      return {
        iconBg: "bg-accent/10",
        iconText: "text-accent",
        titleText: "text-accent",
        statsText: "text-accent/80",
        checkText: "text-accent/70",
        hoverBorder: "hover:border-accent/40",
        hoverShadow: "hover:shadow-accent/10",
        blurBg: "bg-accent/10"
      };
    default: // neutral
      return {
        iconBg: "bg-white/10",
        iconText: "text-white",
        titleText: "text-white",
        statsText: "text-white/80",
        checkText: "text-white/70",
        hoverBorder: "hover:border-white/30", // Aumentada opacidad
        hoverShadow: "hover:shadow-white/5",
        blurBg: "bg-white/10"
      };
  }
};


export default function Benefits() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section 
      className="py-20 md:py-28 px-4 bg-dark-card relative overflow-hidden" // Ajustado padding
      id="beneficios" 
      aria-labelledby="benefits-title-main"
    >
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg opacity-60" /> {/* Ajustado gradiente y opacidad */}
      
      {/* Elementos decorativos (condicionales) */}
      {!shouldReduceMotion && (
        <>
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-slow-soft"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow-soft animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow-soft animation-delay-4000"></div>
        </>
      )}
      
      <div className="container mx-auto relative z-10">
        {/* Título de la sección */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // amount: 0.3 para que se active un poco antes
          variants={fadeIn} // fadeIn debería ser { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
          className="text-center mb-16 md:mb-20" // Aumentado mb
        >
          <div className="inline-block mb-4">
            {/* Podrías considerar un texto más directo o eliminarlo si el h2 es suficiente */}
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide">
              Por qué Flow AI
            </span>
          </div>
          <h2 
            id="benefits-title-main"
            className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white leading-tight"
          >
            Transforma tu servicio con <span className="text-primary">beneficios clave</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
            Un único agente inteligente que responde, ejecuta y resuelve en todos tus canales.
          </p>
        </motion.div>
        
        {/* Tarjetas de beneficios */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // amount menor para el contenedor stagger
          variants={staggerContainer(0.1, 0.3)} // (staggerChildren, delayChildren)
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" // Ajustado gap
        >
          {benefitsData.map((benefit, index) => {
            const IconComponent = benefit.icon;
            const themeClasses = getThemeClasses(benefit.theme);
            return (
              <motion.div
                key={index}
                variants={fadeIn} // Usar el mismo fadeIn de antes, o uno específico para tarjetas
                className="relative group h-full" // h-full para que todas las tarjetas en una fila tengan la misma altura
              >
                {!shouldReduceMotion && (
                  <div className={`absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${themeClasses.blurBg} blur-lg -z-10`}></div>
                )}
                
                <motion.div 
                  variants={!shouldReduceMotion ? hoverCard : {}} // hoverCard animará en hover si no hay reduce motion
                  whileHover={!shouldReduceMotion ? "hover" : undefined} // framer-motion necesita whileHover="hover" para activar la variante 'hover'
                  initial="rest"
                  className={`h-full p-6 md:p-8 rounded-xl backdrop-blur-md bg-dark-bg/70 border border-white/10 flex flex-col
                    transition-all duration-300 ${themeClasses.hoverBorder} ${themeClasses.hoverShadow}`}
                >
                  {/* Icono con fondo */}
                  <div className={`mb-6 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center ${themeClasses.iconBg} transition-colors duration-300`}> {/* rounded-xl */}
                    <IconComponent className={`w-7 h-7 md:w-8 md:h-8 ${themeClasses.iconText}`} aria-hidden="true" />
                  </div>
                  
                  {/* Título */}
                  <h3 className={`text-xl md:text-2xl font-semibold mb-3 ${themeClasses.titleText} transition-colors duration-300`}>
                    {benefit.title}
                  </h3>
                  
                  {/* Estadística */}
                  {benefit.stats && (
                    <p className={`text-sm font-medium mb-4 ${themeClasses.statsText} transition-colors duration-300`}>
                      {benefit.stats}
                    </p>
                  )}
                  
                  {/* Descripción */}
                  <p className="text-muted-foreground text-base mb-6 flex-grow"> {/* text-base, flex-grow */}
                    {benefit.description}
                  </p>
                  
                  {/* Lista de características */}
                  <div className="mt-auto space-y-2.5"> {/* space-y-2.5 */}
                    {benefit.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5"> {/* gap-2.5 */}
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${themeClasses.checkText}`} aria-hidden="true" />
                        <span className="text-sm text-muted-foreground/90">{feature}</span> {/* text-sm, muted-foreground/90 */}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Llamada a la acción */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
          className="mt-16 md:mt-20 text-center"
        >
          <motion.button 
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2.5 mx-auto hover:glow-green-soft transition-all duration-300 shadow-xl shadow-primary/25 text-base" // py-3.5, gap-2.5, shadow-xl, text-base
          >
            Explora Todas las Funcionalidades <ArrowRight size={18} aria-hidden="true" />
          </motion.button>
          {/* Nota: Este botón debería enlazar a una página de características detalladas o una sección relevante */}
        </motion.div>
      </div>
      {/* 
        Recordatorio de Contraste: 
        - Asegúrate que tu variable CSS `--muted-foreground` (o su equivalente en Tailwind config) 
          tenga un contraste mínimo de 4.5:1 contra `--dark-bg` (o su equivalente).
        - Los colores temáticos (primary, secondary, accent) en texto también deben cumplirlo.
        - El gradiente del título debe ser legible en toda su extensión.
      */}
    </section>
  );
}

// En tu tailwind.config.js o un archivo CSS global, podrías tener animaciones como:
/*
@keyframes pulse-slow-soft {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.05); }
}
.animate-pulse-slow-soft {
  animation: pulse-slow-soft 8s infinite ease-in-out;
}
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
*/
// Y para el hoverCard en lib/animations.ts (ejemplo):
/*
export const hoverCard = {
  rest: { 
    y: 0,
    scale: 1,
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", 
    transition: { duration: 0.3, ease: "easeOut" }
  },
  hover: { 
    y: -8, 
    scale: 1.03,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};
*/