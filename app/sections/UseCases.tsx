"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations"; // Asumo staggerContainer existe
import { 
   ShoppingBag, GraduationCap, Briefcase, CheckCircle2, 
    ArrowRight, Users, Clock, MessageSquare, Calendar, ChevronDown, ChevronUp 
} from "lucide-react";

// Tipos de Datos
interface Feature {
  icon: React.ElementType;
  text: string;
}
interface Testimonial {
  quote: string;
  author: string;
  role: string;
}
interface Metric {
  icon: React.ElementType;
  value: string;
  label: string;
}
interface UseCaseData {
  id: string; // Añadido para keys y aria-controls
  icon: React.ElementType;
  title: string;
  description: string;
  theme: "primary" | "secondary" | "accent" | "neutral"; // Para consistencia
  stats: string;
  features: Feature[];
  testimonial: Testimonial;
  metrics: Metric[];
}

// Datos de los casos de uso (mejorada la estructura para temas)
const useCasesData: UseCaseData[] = [
  {
    id: "servicios",
    icon: Briefcase,
    title: "Servicios a Domicilio",
    description: "Recepcionista virtual 24/7 que responde, enruta llamadas, agenda servicios y envía recordatorios.",
    theme: "secondary",
    stats: "+30% citas confirmadas",
    features: [
      { icon: CheckCircle2, text: "Agendamiento y reasignación automática" },
      { icon: CheckCircle2, text: "Confirmaciones por WhatsApp/SMS" },
      { icon: CheckCircle2, text: "Enrutamiento de llamadas" }
    ],
    testimonial: {
      quote: "Flow AI mantiene nuestras líneas activas 24/7 y reduce al mínimo las llamadas perdidas.",
      author: "Sofía Romero",
      role: "Operaciones"
    },
    metrics: [
      { icon: Users, value: "3x", label: "Menos llamadas perdidas" },
      { icon: Clock, value: "24/7", label: "Cobertura" }
    ]
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    title: "E‑commerce y Retail",
    description: "Resuelve soporte post‑venta y automatiza devoluciones, cambios y seguimiento de entregas, además de impulsar ventas.",
    theme: "primary",
    stats: "-70% tickets repetitivos",
    features: [
      { icon: CheckCircle2, text: "Seguimiento y reprogramación de entregas" },
      { icon: CheckCircle2, text: "Generación de reembolsos y cambios" },
      { icon: CheckCircle2, text: "Upsell/Cross‑sell contextual" }
    ],
    testimonial: {
      quote: "Automatizamos cambios y devoluciones sin fricción y liberamos al equipo de soporte.",
      author: "Diego Pérez",
      role: "Operaciones E‑commerce"
    },
    metrics: [
      { icon: MessageSquare, value: "80%", label: "Consultas automatizadas" },
      { icon: Users, value: "+25%", label: "Repetición de compra" }
    ]
  },
  {
    id: "salud",
    icon: GraduationCap,
    title: "Salud y Clínicas",
    description: "Agenda, confirma y recuerda citas; gestiona pre‑ingreso y seguimiento post consulta en múltiples canales.",
    theme: "accent",
    stats: "-60% llamadas al front‑desk",
    features: [
      { icon: CheckCircle2, text: "Agenda 24/7 con disponibilidad real" },
      { icon: CheckCircle2, text: "Recordatorios y pre‑ingreso" },
      { icon: CheckCircle2, text: "Encuestas de satisfacción automatizadas" }
    ],
    testimonial: {
      quote: "Flujos de agenda y recordatorios corren solos; el equipo se enfoca en pacientes.",
      author: "Dra. Valentina Cruz",
      role: "Administración"
    },
    metrics: [
      { icon: Calendar, value: "-35%", label: "Ausentismo" },
      { icon: Users, value: "+20%", label: "Pacientes atendidos" }
    ]
  },
  {
    id: "finanzas",
    icon: Briefcase,
    title: "Finanzas y Banca",
    description: "Autogestión de tarjetas, bloqueos, reclamos y consultas de saldo con verificación segura y trazabilidad.",
    theme: "neutral",
    stats: "+50% autoservicio",
    features: [
      { icon: CheckCircle2, text: "Verificación segura de identidad" },
      { icon: CheckCircle2, text: "Bloqueo/desbloqueo y reclamos" },
      { icon: CheckCircle2, text: "Reportes y auditoría" }
    ],
    testimonial: {
      quote: "Incrementamos autoservicio y reducimos tiempos de resolución en procesos críticos.",
      author: "Andrés López",
      role: "CX"
    },
    metrics: [
      { icon: Clock, value: "-40%", label: "Tiempo de resolución" },
      { icon: Users, value: "+30%", label: "CSAT" }
    ]
  }
];

// Helper para clases de tema de UseCaseCard
const getUseCaseTheme = (theme: UseCaseData["theme"]) => {
    switch (theme) {
        case "primary": return {
            cardBg: "bg-green-950/50 border-primary/30", // Aumentada opacidad de fondo
            cardHoverBg: "hover:bg-green-900/60",
            textColor: "text-primary",
            glow: "hover:glow-green-soft", // Usar glow suave
            statsBadgeBg: "bg-primary/10",
            statsBadgeText: "text-primary/90",
            iconWrapperBg: "bg-dark-bg/80 shadow-primary/20",
            testimonialBg: "bg-green-950/70 border-primary/30"
        };
        case "secondary": return {
            cardBg: "bg-purple-950/50 border-secondary/30",
            cardHoverBg: "hover:bg-purple-900/60",
            textColor: "text-secondary",
            glow: "hover:glow-purple-soft",
            statsBadgeBg: "bg-secondary/10",
            statsBadgeText: "text-secondary/90",
            iconWrapperBg: "bg-dark-bg/80 shadow-secondary/20",
            testimonialBg: "bg-purple-950/70 border-secondary/30"
        };
        case "accent": return {
            cardBg: "bg-blue-950/50 border-accent/30",
            cardHoverBg: "hover:bg-blue-900/60",
            textColor: "text-accent",
            glow: "hover:glow-blue-soft",
            statsBadgeBg: "bg-accent/10",
            statsBadgeText: "text-accent/90",
            iconWrapperBg: "bg-dark-bg/80 shadow-accent/20",
            testimonialBg: "bg-blue-950/70 border-accent/30"
        };
        default: return { // neutral
            cardBg: "bg-gray-800/50 border-white/20",
            cardHoverBg: "hover:bg-gray-700/60",
            textColor: "text-white",
            glow: "hover:shadow-lg hover:shadow-white/10", // Sombra más sutil
            statsBadgeBg: "bg-white/10",
            statsBadgeText: "text-white/90",
            iconWrapperBg: "bg-dark-bg/80 shadow-white/5",
            testimonialBg: "bg-gray-800/70 border-white/20"
        };
    }
};

// Subcomponente para cada tarjeta de caso de uso
const UseCaseCard: React.FC<{ 
    useCase: UseCaseData; 
    isActive: boolean; 
    onToggle: () => void;
    shouldReduceMotion: boolean;
}> = ({ useCase, isActive, onToggle, shouldReduceMotion }) => {
    const Icon = useCase.icon;
    const theme = getUseCaseTheme(useCase.theme);

    const cardMotionProps = !shouldReduceMotion 
      ? { whileHover: { scale: 1.02, y: -4 }, transition: { duration: 0.25 } } // Sutil y más rápido
      : {};
    
    return (
        <motion.div
            layout // Animación de layout al expandir/colapsar
            variants={fadeIn} // Animación de entrada del staggerContainer
            className="h-full flex flex-col" // flex flex-col para que el botón se alinee abajo
            {...cardMotionProps}
        >
            <button // Botón para accesibilidad
                type="button"
                onClick={onToggle}
                aria-expanded={isActive}
                aria-controls={`testimonial-${useCase.id}`}
                className={`h-full p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-card ${theme.cardBg} ${theme.cardHoverBg} ${theme.glow} ${isActive ? theme.textColor + ' ' + theme.glow.replace('hover:','') + ' ring-2 ring-offset-1' : ''}`}
            >
                <div className="mb-5">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${theme.statsBadgeBg} ${theme.statsBadgeText}`}>
                        {useCase.stats}
                    </span>
                </div>
                
                <div className="mb-5 flex items-center"> {/* Icono y Título en la misma línea */}
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex-shrink-0 flex items-center justify-center ${theme.iconWrapperBg} ${theme.textColor} shadow-lg mr-4`}>
                        <Icon className="w-8 h-8 md:w-9 md:h-9" aria-hidden="true" />
                    </div>
                    <h3 className={`text-xl md:text-2xl font-semibold ${theme.textColor}`}>
                        {useCase.title}
                    </h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    {useCase.description}
                </p>
                
                {/* Características (Opcional: mostrar solo si está activo para reducir altura inicial) */}
                {/* <AnimatePresence> */}
                {/*  {isActive && ( */}
                {/*    <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} className="space-y-2 mb-5"> */}
                        <div className="space-y-2 mb-5">
                            {useCase.features.slice(0, isActive ? useCase.features.length : 2).map((feature, idx) => { // Mostrar 2 por defecto
                                const FeatureIcon = feature.icon;
                                return (
                                <div key={idx} className="flex items-start gap-2.5">
                                    <FeatureIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${theme.textColor}`} aria-hidden="true" />
                                    <span className="text-sm text-muted-foreground/90">{feature.text}</span>
                                </div>
                                );
                            })}
                        </div>
                {/*    </motion.div> */}
                {/*  )} */}
                {/* </AnimatePresence> */}

                {/* Métricas (flex-grow para empujar al fondo si es necesario, y mt-auto en el botón) */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-auto pt-5 border-t border-white/10">
                    {useCase.metrics.map((metric, idx) => {
                        const MetricIcon = metric.icon;
                        return (
                            <div key={idx} className="flex flex-col items-start text-left"> {/* Alineado a la izquierda */}
                                <div className={`flex items-center gap-1.5 ${theme.textColor}`}>
                                    <MetricIcon className="w-4 h-4" aria-hidden="true" />
                                    <span className="text-base font-bold">{metric.value}</span>
                                </div>
                                <span className="text-xs text-muted-foreground/80 mt-0.5">{metric.label}</span>
                            </div>
                        );
                    })}
                </div>
                
                <div className="mt-5 pt-4 border-t border-white/10 text-left">
                    <span className={`text-sm font-semibold ${theme.textColor} flex items-center gap-1.5`}>
                        {isActive ? "Ver menos detalles" : "Ver testimonio y más"}
                        {isActive 
                            ? <ChevronUp size={16} className="transition-transform duration-300" />
                            : <ChevronDown size={16} className="transition-transform duration-300" />
                        }
                    </span>
                </div>
            </button>
        </motion.div>
    );
};


export default function UseCases() {
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Cerrar testimonio si se hace clic fuera de la sección de casos
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sectionRef.current && !sectionRef.current.contains(event.target as Node)) {
        setActiveCaseId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleCase = (caseId: string) => {
    setActiveCaseId(prevId => (prevId === caseId ? null : caseId));
  };
  
  const activeUseCaseData = activeCaseId ? useCasesData.find(uc => uc.id === activeCaseId) : null;

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-4 bg-dark-card relative overflow-hidden" id="casos" aria-labelledby="usecases-title">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg opacity-80" /> {/* Ajustado gradiente */}
      {!shouldReduceMotion && (
        <>
          <div className="absolute top-40 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse-slow-soft"></div>
          <div className="absolute bottom-40 left-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow-soft animation-delay-2000"></div>
        </>
      )}
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold tracking-wide">
              Donde Flow AI aporta más valor
            </span>
          </div>
          <h2 id="usecases-title" className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-accent to-white leading-tight">
            Casos de uso y <span className="text-accent">sectores</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl">
            Un agente único que resuelve procesos clave: agenda, reembolsos, entregas, reclamos y más.
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {useCasesData.map((useCase) => (
            <UseCaseCard 
              key={useCase.id}
              useCase={useCase}
              isActive={activeCaseId === useCase.id}
              onToggle={() => handleToggleCase(useCase.id)}
              shouldReduceMotion={!!shouldReduceMotion}
            />
          ))}
        </motion.div>
        
        <AnimatePresence>
          {activeUseCaseData && (
            <motion.div
              layout // Importante para animar el cambio de altura si el grid se reajusta
              id={`testimonial-${activeUseCaseData.id}`}
              role="region"
              aria-labelledby={`${activeUseCaseData.id}-testimonial-title`}
              initial={{ opacity: 0, y: 20, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto', marginTop: '3rem' }} // marginTop 3rem = theme.space[12]
              exit={{ opacity: 0, y: 20, height: 0, marginTop: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeInOut" }}
              className="mt-12 max-w-3xl mx-auto" // Centrado y con ancho máximo
            >
              <div className={`p-6 md:p-8 rounded-xl ${getUseCaseTheme(activeUseCaseData.theme).testimonialBg} border backdrop-blur-md shadow-xl`}>
                <h3 id={`${activeUseCaseData.id}-testimonial-title`} className="sr-only">Testimonio de {activeUseCaseData.title}</h3>
                <div className="flex items-start gap-4">
                  <div className={`text-5xl ${getUseCaseTheme(activeUseCaseData.theme).textColor} opacity-40 font-serif -mt-1`} aria-hidden="true">“</div>
                  <div className="flex-1">
                    <blockquote className="text-lg md:text-xl mb-6 italic text-white/95 leading-relaxed">
                      {activeUseCaseData.testimonial.quote}
                    </blockquote>
                    <figcaption>
                      <p className={`font-semibold ${getUseCaseTheme(activeUseCaseData.theme).textColor}`}>
                        {activeUseCaseData.testimonial.author}
                      </p>
                      <p className="text-sm text-muted-foreground/80">
                        {activeUseCaseData.testimonial.role}
                      </p>
                    </figcaption>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}
          className="mt-20 md:mt-24 text-center"
        >
          <motion.button 
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05, y: shouldReduceMotion ? 0 : -3 }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            className="px-8 py-3.5 rounded-lg bg-accent text-accent-foreground font-semibold flex items-center justify-center gap-2.5 mx-auto hover:glow-blue-soft transition-all duration-300 shadow-xl shadow-accent/25 text-base"
          >
            Solicitar Demo Personalizada <ArrowRight size={18} aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}