"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations"; // Asumo staggerContainer existe
import { Star, Quote, ChevronLeft, ChevronRight, BarChart2, Clock, Users, TrendingUp, PauseCircle, PlayCircle, ArrowRight } from "lucide-react"; // Agregado Pause/Play y ArrowRight
import Image from "next/image"; // Para imágenes reales

// Tipos de Datos
interface StatItem {
  value: string;
  label: string;
  icon: React.ElementType;
  theme: "primary" | "secondary" | "accent" | "neutral";
}
interface TestimonialData {
  id: number;
  name: string;
  position: string;
  company: string;
  text: string;
  stars: number;
  imageSrc: string; // Ruta a la imagen real
  industry: string;
  highlight: string;
  theme: "primary" | "secondary" | "accent"; // Para color-coding
}

// Estadísticas de impacto (con temas)
const statsData: StatItem[] = [
  { value: "70%", label: "Reducción en tiempo de gestión de citas", icon: Clock, theme: "primary" },
  { value: "3x", label: "Aumento en satisfacción promedio de clientes", icon: Users, theme: "secondary" },
  { value: "85%", label: "Automatización de consultas frecuentes", icon: BarChart2, theme: "accent" },
  { value: "2 meses", label: "Retorno de inversión (ROI) promedio", icon: TrendingUp, theme: "primary" }
];

// Datos de testimonios (con imageSrc y temas)
const testimonialsData: TestimonialData[] = [
  {
    id: 1, name: "Carlos Rodríguez", position: "Psicólogo Clínico", company: "Centro Bienestar Integral",
    text: "Desde que implementamos Flow AI, hemos reducido drásticamente el tiempo dedicado a agendar citas y enviar recordatorios. Mis pacientes valoran la rapidez y la facilidad para gestionar sus sesiones, lo que me permite enfocarme 100% en la terapia.",
    stars: 5, imageSrc: "/testimonials/carlos-rodriguez.jpg", // Reemplazar con rutas reales
    industry: "Salud y Bienestar", highlight: "Reducción del 70% en tiempo de gestión administrativa.", theme: "primary"
  },
  {
    id: 2, name: "Marcela Vega", position: "Gerente de E-commerce", company: "ElectroTech Chile",
    text: "La automatización de consultas sobre productos y el seguimiento de pedidos ha sido un cambio de juego. Escalamos nuestro servicio al cliente sin aumentar personal y el ROI fue evidente en menos de dos meses. ¡Impresionante!",
    stars: 5, imageSrc: "/testimonials/marcela-vega.jpg", industry: "Retail Online",
    highlight: "ROI positivo y notable en solo 2 meses.", theme: "secondary"
  },
  {
    id: 3, name: "Juan Pablo Méndez", position: "Coordinador Académico", company: "Instituto Avance Digital",
    text: "Nuestros estudiantes ahora reciben información instantánea sobre cursos, horarios y material. La integración con Google Calendar y nuestro LMS ha sido impecable. La comunicación es mucho más fluida.",
    stars: 4, imageSrc: "/testimonials/juan-mendez.jpg", industry: "Educación Superior",
    highlight: "Integración perfecta con calendario y LMS académico.", theme: "accent"
  },
  {
    id: 4, name: "Ana María López", position: "Directora de Marketing", company: "InnovaSolutions Latam",
    text: "Automatizar nuestras campañas de lead nurturing y la interacción inicial con prospectos ha incrementado nuestra tasa de conversión en un 45%. La plataforma es intuitiva y el equipo de soporte, excepcional.",
    stars: 5, imageSrc: "/testimonials/ana-lopez.jpg", industry: "Marketing y Ventas",
    highlight: "Aumento del 45% en la tasa de conversión de leads.", theme: "primary"
  },
  {
    id: 5, name: "Roberto Fuentes", position: "Socio Fundador", company: "Fuentes & Legal Consultores",
    text: "La gestión automatizada de agendamiento de consultas y el seguimiento de casos ha modernizado nuestra firma. Los clientes aprecian las respuestas inmediatas a dudas básicas y la facilidad para programar reuniones, mejorando nuestra imagen.",
    stars: 5, imageSrc: "/testimonials/roberto-fuentes.jpg", industry: "Servicios Legales",
    highlight: "Respuestas inmediatas a consultas y agendamiento eficiente.", theme: "secondary"
  }
];

// Helper para temas de estadísticas y testimonios
const getThemeClasses = (theme: StatItem["theme"] | TestimonialData["theme"]) => {
    switch (theme) {
        case "primary": return {
            text: "text-primary",
            border: "border-primary/30",
            bgCard: "bg-gradient-to-br from-primary/10 via-primary/5 to-dark-bg",
            highlightBg: "bg-primary/10 border-primary/20"
        };
        case "secondary": return {
            text: "text-secondary",
            border: "border-secondary/30",
            bgCard: "bg-gradient-to-br from-secondary/10 via-secondary/5 to-dark-bg",
            highlightBg: "bg-secondary/10 border-secondary/20"
        };
        case "accent": return {
            text: "text-accent",
            border: "border-accent/30",
            bgCard: "bg-gradient-to-br from-accent/10 via-accent/5 to-dark-bg",
            highlightBg: "bg-accent/10 border-accent/20"
        };
        default: return { // neutral (para estadísticas si se necesita)
            text: "text-white",
            border: "border-white/20",
            bgCard: "bg-dark-card/50", // Fondo más simple para stats
            highlightBg: "bg-white/5 border-white/10"
        };
    }
};

const AUTOPLAY_INTERVAL = 7000; // 7 segundos

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null); // Para pausar en hover del carrusel
  const shouldReduceMotion = useReducedMotion();

  const numVisibleTestimonials = 3; // O 1 en móvil si el diseño lo requiere

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  }, []);

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };
  
  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
  };
  
  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current);
    if (!isAutoplayPaused && !shouldReduceMotion) {
      autoplayRef.current = setTimeout(nextTestimonial, AUTOPLAY_INTERVAL);
    }
  }, [isAutoplayPaused, nextTestimonial, shouldReduceMotion]);

  useEffect(() => {
    resetAutoplay();
    return () => { if (autoplayRef.current) clearTimeout(autoplayRef.current); };
  }, [activeIndex, resetAutoplay]);

  // Lógica para mostrar los testimonios correctos en el carrusel (manejo de bucle)
  const visibleTestimonials = Array.from({ length: numVisibleTestimonials }).map((_, i) => {
    const index = (activeIndex + i) % testimonialsData.length;
    return testimonialsData[index];
  });

  const handleMouseEnterCarousel = () => { if (!isAutoplayPaused) setIsAutoplayPaused(true); };
  const handleMouseLeaveCarousel = () => { if (isAutoplayPaused) setIsAutoplayPaused(false); }; // Reanuda si estaba en pausa por hover

  return (
    <section className="py-20 md:py-28 px-4 bg-dark-bg relative overflow-hidden" id="testimonios" aria-labelledby="testimonials-title">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-dark-bg to-primary/5 opacity-80" />
      {!shouldReduceMotion && (
        <>
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow-soft"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow-soft animation-delay-2000"></div>
        </>
      )}
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide">
              Casos de Éxito Reales
            </span>
          </div>
          <h2 id="testimonials-title" className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white leading-tight">
            Lo Que Dicen Nuestros <span className="text-primary">Clientes Satisfechos</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl">
            Descubre cómo empresas y profesionales como tú han transformado su comunicación y eficiencia con Flow AI.
          </p>
        </motion.div>
        
        <motion.div
          variants={staggerContainer(0.15, 0.2)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 md:mb-24 max-w-6xl mx-auto"
        >
          {statsData.map((stat) => {
            const Icon = stat.icon;
            const theme = getThemeClasses(stat.theme);
            return (
            <motion.div 
              key={stat.label} variants={fadeIn}
              className={`p-6 rounded-xl text-center border-2 ${theme.border} ${getThemeClasses(stat.theme).bgCard.replace('bg-gradient-to-br','').split(' ')[0]} shadow-lg hover:shadow-xl transition-shadow duration-300`}
              // Usamos un fondo más sólido para las stats, derivado del tema.
            >
              <div className={`flex justify-center mb-4 ${theme.text}`}>
                <Icon size={32} strokeWidth={1.5}/>
              </div>
              <h3 className={`text-3xl lg:text-4xl font-bold mb-2 ${theme.text}`}>{stat.value}</h3>
              <p className="text-sm text-muted-foreground/90 leading-snug">{stat.label}</p>
            </motion.div>
          )})}
        </motion.div>
        
        <div 
            className="relative max-w-6xl mx-auto mb-12"
            ref={carouselRef}
            onMouseEnter={handleMouseEnterCarousel}
            onMouseLeave={handleMouseLeaveCarousel}
            role="region"
            aria-roledescription="carousel"
            aria-label="Testimonios de clientes"
        >
          <AnimatePresence mode="popLayout"> {/* mode="popLayout" puede ayudar con reordenamientos */}
            <motion.div 
                key={activeIndex} // Keyed by activeIndex to trigger re-render of the whole row for slide effect
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                aria-live="polite" // Anuncia cambios a lectores de pantalla
            >
            {visibleTestimonials.map((testimonial, i) => {
              const theme = getThemeClasses(testimonial.theme);
              const isCenterCard = numVisibleTestimonials > 1 && i === Math.floor(numVisibleTestimonials / 2);
              const cardMotionProps = !shouldReduceMotion 
                ? { whileHover: { y: -8, scale: 1.02, boxShadow: "0px 15px 30px -10px rgba(var(--card-shadow-rgb,0,0,0),0.2)" }, transition:{ type:"spring", stiffness:200, damping:15 } } 
                : {};

              // Determinar si esta tarjeta es la "principal" del carrusel
              const isMainActiveSlide = (activeIndex + i) % testimonialsData.length === activeIndex;

              return(
              <motion.div
                key={testimonial.id} // La key debe ser única para el testimonio, no el índice visible
                layoutId={`testimonial-card-${testimonial.id}`} // Para animaciones si las tarjetas se reordenan
                initial={{ opacity: 0, x: (i - Math.floor(numVisibleTestimonials/2)) * 50 }} // Efecto de entrada lateral
                animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" } }}
                exit={{ opacity: 0, x: (i - Math.floor(numVisibleTestimonials/2)) * -50, transition: { duration: 0.2, ease: "easeIn" } }}
                className={`flex flex-col h-full p-6 md:p-8 rounded-2xl border-2 shadow-xl backdrop-blur-md relative
                            ${theme.border} ${theme.bgCard} 
                            ${isCenterCard && numVisibleTestimonials > 1 ? 'scale-105 z-10' : 'opacity-80 md:opacity-100'}`}
                style={{ '--card-shadow-rgb': testimonial.theme === 'primary' ? 'var(--primary-rgb)' : testimonial.theme === 'secondary' ? 'var(--secondary-rgb)' : 'var(--accent-rgb)' } as React.CSSProperties}
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonio de ${testimonial.name}`}
                tabIndex={isMainActiveSlide ? 0 : -1} // Solo el slide principal es enfocable
                {...cardMotionProps}
              >
                <div className="absolute top-4 right-4">
                  <span className="text-xs px-3 py-1 bg-dark-bg/60 backdrop-blur-sm rounded-full border border-white/10 text-white/80">
                    {testimonial.industry}
                  </span>
                </div>
                {!shouldReduceMotion && (
                  <div className={`absolute -top-5 -left-3 ${theme.text} opacity-20`}>
                    <Quote size={60} strokeWidth={1}/>
                  </div>
                )}
                <div className="flex mb-4" aria-label={`Calificación: ${testimonial.stars} de 5 estrellas`}>
                  {[...Array(5)].map((_, starIdx) => (
                    <Star key={starIdx} size={18} className={starIdx < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} />
                  ))}
                </div>
                <div className={`mb-5 p-3 rounded-lg border ${theme.highlightBg}`}>
                  <p className="text-sm font-semibold text-white">
                    &quot;{testimonial.highlight}&quot;
                  </p>
                </div>
                <blockquote className="text-sm text-muted-foreground/90 mb-6 leading-relaxed flex-grow">
                  &quot;{testimonial.text}&quot;
                </blockquote>
                <figcaption className="flex items-center mt-auto pt-4 border-t border-white/10">
                  <Image src={testimonial.imageSrc} alt={`Foto de ${testimonial.name}`} width={48} height={48} className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-white/20"/>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </figcaption>
              </motion.div>
            )})}
            </motion.div>
          </AnimatePresence>

          {/* Controles de Navegación y Autoplay */}
          <div className="flex flex-col sm:flex-row items-center justify-center mt-10 gap-4">
            <div className="flex gap-3">
                <button onClick={prevTestimonial} aria-label="Testimonio anterior"
                    className="p-2.5 rounded-full bg-dark-bg/70 border border-white/10 text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={nextTestimonial} aria-label="Testimonio siguiente"
                    className="p-2.5 rounded-full bg-dark-bg/70 border border-white/10 text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <ChevronRight size={20} />
                </button>
            </div>
            <div className="flex gap-1.5">
                {testimonialsData.map((_, index) => (
                <button key={index} onClick={() => goToTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${index === activeIndex ? "bg-primary scale-125 w-5" : "bg-white/20 hover:bg-white/40"}`}
                    aria-label={`Ir al testimonio ${index + 1} de ${testimonialsData.length}`}
                    aria-current={index === activeIndex ? "true" : "false"}/>
                ))}
            </div>
            <button onClick={() => setIsAutoplayPaused(p => !p)} aria-pressed={isAutoplayPaused}
                className="p-2.5 rounded-full bg-dark-bg/70 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center gap-2 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={isAutoplayPaused ? "Reanudar autoplay de testimonios" : "Pausar autoplay de testimonios"}>
                {isAutoplayPaused ? <PlayCircle size={18}/> : <PauseCircle size={18}/>}
                <span className="hidden sm:inline">{isAutoplayPaused ? "Reanudar" : "Pausar"}</span>
            </button>
          </div>
        </div>
        
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}
          className="flex flex-col items-center mt-20 md:mt-28 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-5">
            ¿Listo para Transformar Tu Comunicación y Eficiencia?
          </h3>
          <p className="text-muted-foreground max-w-2xl mb-8 text-base md:text-lg">
            Únete a cientos de profesionales y empresas que ya están optimizando su tiempo y mejorando la satisfacción de sus clientes con Flow AI.
          </p>
          <motion.a 
            href="#contacto-demo" // Enlace a sección o formulario de demo
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05, y: shouldReduceMotion ? 0 : -2 }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:glow-green-soft transition-all duration-300 shadow-xl shadow-primary/25 text-base"
          >
            Solicitar una Demo Personalizada <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}