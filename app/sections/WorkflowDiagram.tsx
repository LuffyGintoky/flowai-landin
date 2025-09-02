"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { fadeIn, drawLine, staggerContainer } from "@/lib/animations"; // Asumo drawLine y staggerContainer existen
import { 
  MessageSquare, Brain, Calendar, Mail, ArrowRight, 
  CheckCircle2, AlertCircle, Clock
} from "lucide-react";

// Tipos para los datos (¡buena práctica!)
interface NodeDetail {
  icon: React.ElementType;
  text: string;
}
interface NodeData {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
  theme: "primary" | "secondary" | "accent" | "neutral"; // Usar temas como en Benefits
  details: NodeDetail[];
  stats: string;
}
interface UseCaseData {
  title: string;
  description: string;
  icon: React.ElementType;
  theme: "primary" | "secondary";
  flowIcons: React.ElementType[];
}
interface StepData {
  title: string;
  description: string;
  theme: "primary" | "secondary" | "accent";
}

// Datos de los nodos del flujo
const nodesData: NodeData[] = [
  {
    id: "whatsapp",
    icon: MessageSquare,
    label: "WhatsApp",
    description: "Recibe mensajes de clientes",
    theme: "primary",
    details: [
      { icon: CheckCircle2, text: "Respuestas automáticas 24/7" },
      { icon: CheckCircle2, text: "Gestión de consultas frecuentes" },
      { icon: CheckCircle2, text: "Transferencia a agentes humanos" }
    ],
    stats: "98% de tasa de respuesta"
  },
  {
    id: "ia",
    icon: Brain,
    label: "Agente IA",
    description: "Procesa y entiende la intención",
    theme: "secondary",
    details: [
      { icon: CheckCircle2, text: "Análisis de sentimiento" },
      { icon: CheckCircle2, text: "Extracción de entidades" },
      { icon: CheckCircle2, text: "Generación de respuestas" }
    ],
    stats: "95% de precisión en intenciones"
  },
  {
    id: "email",
    icon: Mail,
    label: "Gmail",
    description: "Envía confirmaciones",
    theme: "accent",
    details: [
      { icon: CheckCircle2, text: "Plantillas personalizables" },
      { icon: CheckCircle2, text: "Seguimiento automático" },
      { icon: CheckCircle2, text: "Adjuntos inteligentes" }
    ],
    stats: "99.5% de entregabilidad"
  },
  {
    id: "calendar",
    icon: Calendar,
    label: "Calendar",
    description: "Agenda citas automáticamente",
    theme: "neutral",
    details: [
      { icon: CheckCircle2, text: "Detección de disponibilidad" },
      { icon: CheckCircle2, text: "Recordatorios automáticos" },
      { icon: CheckCircle2, text: "Sincronización multiplataforma" }
    ],
    stats: "Reducción de 85% en tiempo de agendamiento"
  }
];

// Ejemplos de casos de uso
const useCasesData: UseCaseData[] = [
  {
    title: "Agendamiento de Citas Automatizado",
    description: "Un cliente solicita una cita vía WhatsApp. Flow AI procesa la solicitud, verifica la disponibilidad en Calendar y envía una confirmación por Gmail, todo sin intervención manual.",
    icon: Clock,
    theme: "primary",
    flowIcons: [MessageSquare, Brain, Calendar, Mail]
  },
  {
    title: "Resolución de Consultas de Producto",
    description: "Un cliente pregunta sobre las características de un producto. Flow AI identifica la consulta, proporciona información precisa y puede incluso guiar hacia opciones de compra.",
    icon: AlertCircle,
    theme: "secondary",
    flowIcons: [MessageSquare, Brain] // Ejemplo de flujo más corto
  }
];

// Pasos del flujo
const stepsData: StepData[] = [
    {
        title: "Recepción y Comprensión Inmediata",
        description: "Los mensajes de clientes por WhatsApp son recibidos y analizados al instante por nuestra IA para entender la intención detrás de cada consulta.",
        theme: "primary",
    },
    {
        title: "Procesamiento Inteligente y Respuesta",
        description: "La IA extrae datos clave, genera respuestas personalizadas o ejecuta acciones, como buscar información o preparar borradores de correo.",
        theme: "secondary",
    },
    {
        title: "Acción y Sincronización Multicanal",
        description: "Flow AI envía confirmaciones por email, agenda citas en Calendar y actualiza tus sistemas, manteniendo todo sincronizado automáticamente.",
        theme: "accent",
    }
];


// Helper para clases de tema (similar al de Benefits, pero adaptado)
const getNodeThemeClasses = (theme: NodeData["theme"], isActive: boolean) => {
  let baseBorder = "border-white/20";
  let hoverGlow = "hover:border-white/50";
  let activeGlow = "border-white/60 shadow-lg shadow-white/20";
  let bg = "bg-white/5";
  let text = "text-white";
  let detailsBg = "bg-white/5 border-white/10";
  let statsText = "text-white/80";
  let detailsIconText = "text-white/70";

  if (theme === "primary") {
    baseBorder = "border-primary/30"; hoverGlow = "hover:glow-green"; activeGlow = "glow-green border-primary/60";
    bg = "bg-primary/5"; text = "text-primary"; detailsBg = "bg-primary/5 border-primary/20";
    statsText = "text-primary/80"; detailsIconText = "text-primary/70";
  } else if (theme === "secondary") {
    baseBorder = "border-secondary/30"; hoverGlow = "hover:glow-purple"; activeGlow = "glow-purple border-secondary/60";
    bg = "bg-secondary/5"; text = "text-secondary"; detailsBg = "bg-secondary/5 border-secondary/20";
    statsText = "text-secondary/80"; detailsIconText = "text-secondary/70";
  } else if (theme === "accent") {
    baseBorder = "border-accent/30"; hoverGlow = "hover:glow-blue"; activeGlow = "glow-blue border-accent/60";
    bg = "bg-accent/5"; text = "text-accent"; detailsBg = "bg-accent/5 border-accent/20";
    statsText = "text-accent/80"; detailsIconText = "text-accent/70";
  }
  
  return {
    nodeWrapper: `${bg} ${text} ${baseBorder} ${hoverGlow} ${isActive ? activeGlow : ''}`,
    label: text,
    detailsWrapper: `${detailsBg}`,
    stats: statsText,
    detailsIcon: detailsIconText,
  };
};

const getUseCaseThemeClasses = (theme: UseCaseData["theme"]) => {
    return theme === "primary" 
        ? { card: "border-primary/20 bg-primary/5", iconWrapper: "bg-primary/20 text-primary", tag: "bg-primary/10 text-primary" }
        : { card: "border-secondary/20 bg-secondary/5", iconWrapper: "bg-secondary/20 text-secondary", tag: "bg-secondary/10 text-secondary" };
};

const getStepThemeClasses = (theme: StepData["theme"]) => {
    if (theme === "primary") return { hoverBorder: "hover:border-primary/30", numBg: "bg-primary/20 text-primary" };
    if (theme === "secondary") return { hoverBorder: "hover:border-secondary/30", numBg: "bg-secondary/20 text-secondary" };
    return { hoverBorder: "hover:border-accent/30", numBg: "bg-accent/20 text-accent" }; // accent
};


export default function WorkflowDiagram() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Cerrar nodo si se hace clic fuera del área de nodos
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (diagramRef.current && !diagramRef.current.contains(event.target as Node)) {
        setActiveNodeId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNodeToggle = (nodeId: string) => {
    setActiveNodeId(prevId => (prevId === nodeId ? null : nodeId));
  };
  
  const lineVariants = !shouldReduceMotion ? drawLine : { visible: { pathLength: 1, opacity: 1 }}; // Simplificado si reduceMotion

  return (
    <section className="py-20 md:py-28 px-4 bg-dark-bg relative overflow-hidden" id="funcionamiento" aria-labelledby="workflow-title">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-card via-dark-bg to-dark-bg opacity-70" />
      {!shouldReduceMotion && (
        <>
          <div className="absolute top-40 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow-soft"></div>
          <div className="absolute bottom-40 right-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow-soft animation-delay-2000"></div>
        </>
      )}
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-semibold tracking-wide">
              Nuestro Proceso
            </span>
          </div>
          <h2 id="workflow-title" className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary to-white leading-tight">
            Así Funciona Flow AI: <span className="text-secondary">Simple y Potente</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl">
            Visualiza cómo nuestra automatización conversacional multicanal conecta tus herramientas y optimiza cada interacción.
          </p>
        </motion.div>
        
        {/* Sección del Diagrama Interactivo */}
        <motion.div 
          ref={diagramRef} // Ref para el clic afuera
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn} // O un stagger si hay más elementos principales aquí
          className="max-w-5xl mx-auto p-6 md:p-8 rounded-2xl glass backdrop-blur-md border border-white/10 shadow-xl"
        >
          {/* Nodos del diagrama */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-4 relative mb-12 md:mb-16"> {/* items-start en mobile */}
            {nodesData.map((node, index) => {
              const Icon = node.icon;
              const isActive = activeNodeId === node.id;
              const theme = getNodeThemeClasses(node.theme, isActive);
              const nodeMotionProps = !shouldReduceMotion 
                ? { whileHover: { scale: 1.05, y: -5 }, transition: { delay: index * 0.15, duration: 0.4 } } 
                : { transition: { delay: index * 0.15, duration: 0.4 } };

              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative z-10 flex flex-col items-center w-full md:w-auto" // w-full en mobile
                  {...nodeMotionProps}
                >
                  <button // Convertido a botón para accesibilidad
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={`details-${node.id}`}
                    onClick={() => handleNodeToggle(node.id)}
                    className={`w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center border-2 cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg ${theme.nodeWrapper} ${isActive ? 'ring-2 ring-offset-1' : ''}`}
                    // El focus-visible:ring-offset-dark-bg asume que dark-bg es el color del fondo exterior al botón
                  >
                    <Icon className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />
                  </button>
                  
                  <div className="text-center mt-4">
                    <p className={`font-semibold text-lg ${theme.label}`}>
                      {node.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {node.description}
                    </p>
                  </div>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        id={`details-${node.id}`}
                        role="region" // Para accesibilidad
                        aria-labelledby={`${node.id}-details-title`}
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }} // marginTop: '1rem' es theme.space[4]
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeInOut" }}
                        className={`mt-4 p-4 rounded-lg w-full md:w-64 text-left ${theme.detailsWrapper}`} // w-full en mobile, ancho fijo en desktop
                      >
                        <h4 id={`${node.id}-details-title`} className="sr-only">{node.label} Detalles</h4>
                        <p className={`text-sm font-semibold mb-2 ${theme.stats}`}>
                          {node.stats}
                        </p>
                        <ul className="space-y-1.5">
                          {node.details.map((detail, idx) => {
                            const DetailIcon = detail.icon;
                            return (
                              <li key={idx} className="flex items-start gap-2">
                                <DetailIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${theme.detailsIcon}`} aria-hidden="true" />
                                <span className="text-sm text-muted-foreground/90">{detail.text}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
            
            {/* Líneas de conexión (mantenida la estructura CSS por simplicidad de la refactorización) */}
            {/* Desktop Lines */}
            <div className="absolute top-12 md:top-14 left-0 right-0 h-0.5 hidden md:block -z-10"> {/* -z-10 para estar detrás */}
              <motion.div 
                className="absolute left-[12.5%] right-[12.5%] h-full" // Ajustado para 4 nodos
                initial="hidden" whileInView="visible" viewport={{ once: true }}
              >
                {[0, 1, 2].map(i => (
                  <motion.div 
                    key={i}
                    className={`absolute h-full bg-gradient-to-r ${
                        i === 0 ? 'left-0 w-[25%] from-primary to-secondary' : 
                        i === 1 ? 'left-[calc(25%+12.5%/2)] w-[25%] from-secondary to-accent' : // Ajuste de posicionamiento y ancho
                        'left-[calc(50%+12.5%)] w-[25%] from-accent to-neutral-line' // neutral-line debe ser un color en tu config
                    }`}
                    variants={lineVariants} custom={i}
                  />
                ))}
              </motion.div>
            </div>
            {/* Mobile Lines */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 md:hidden -z-10">
              <motion.div className="absolute top-[10%] bottom-[10%] w-full"
                initial="hidden" whileInView="visible" viewport={{ once: true }}
              >
                 {[0, 1, 2].map(i => (
                  <motion.div 
                    key={i}
                    className={`absolute w-full bg-gradient-to-b ${
                        i === 0 ? 'top-0 h-[25%] from-primary to-secondary' :
                        i === 1 ? 'top-[calc(25%+10%/2)] h-[25%] from-secondary to-accent' :
                        'top-[calc(50%+10%)] h-[25%] from-accent to-neutral-line'
                    }`}
                    variants={lineVariants} custom={i}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>


        {/* Subsección: Pasos del Flujo (más prominente) */}
        <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}
            className="mt-20 md:mt-28"
        >
            <h3 className="text-2xl md:text-3xl font-bold mb-10 md:mb-12 text-center">
                En Solo <span className="text-primary">3 Simples Pasos</span>
            </h3>
            <motion.div 
                variants={staggerContainer(0.2, 0.3)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            >
                {stepsData.map((step, index) => {
                    const theme = getStepThemeClasses(step.theme);
                    const stepMotionProps = !shouldReduceMotion ? { whileHover: { y: -8, scale: 1.02 } } : {};
                    return (
                        <motion.div 
                            key={index}
                            variants={fadeIn} // Animación de entrada para cada paso
                            className={`p-6 md:p-8 rounded-xl border border-white/10 bg-dark-bg/60 backdrop-blur-md hover:shadow-xl transition-all duration-300 ${theme.hoverBorder}`}
                            {...stepMotionProps}
                        >
                            <div className="flex items-center mb-5">
                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${theme.numBg} flex items-center justify-center mr-4 text-xl md:text-2xl font-bold flex-shrink-0`}>
                                    {index + 1}
                                </div>
                                <h4 className="font-semibold text-lg md:text-xl">{step.title}</h4>
                            </div>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>

        {/* Subsección: Casos de Uso (mejorada) */}
        <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}
            className="mt-20 md:mt-28"
        >
            <h3 className="text-2xl md:text-3xl font-bold mb-10 md:mb-12 text-center">
                Flow AI en Acción: <span className="text-secondary">Resultados Reales</span>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {useCasesData.map((useCase, index) => {
                    const Icon = useCase.icon;
                    const theme = getUseCaseThemeClasses(useCase.theme);
                    const useCaseMotionProps = !shouldReduceMotion 
                        ? { initial:{ opacity: 0, y: 20 }, whileInView:{ opacity: 1, y: 0 }, viewport:{ once: true }, transition:{ delay: index * 0.2, duration: 0.5 } }
                        : {};
                    return (
                        <motion.div 
                            key={index}
                            className={`p-6 md:p-8 rounded-xl border backdrop-blur-md hover:shadow-lg transition-shadow duration-300 ${theme.card}`}
                            {...useCaseMotionProps}
                        >
                            <div className="flex items-start md:items-center mb-5"> {/* items-start en mobile */}
                                <div className={`w-11 h-11 md:w-12 md:h-12 rounded-lg ${theme.iconWrapper} flex items-center justify-center mr-4 flex-shrink-0`}>
                                    <Icon className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                                </div>
                                <h4 className="font-semibold text-lg md:text-xl">{useCase.title}</h4>
                            </div>
                            <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
                                {useCase.description}
                            </p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center space-x-1">
                                    <span className="text-xs font-medium text-muted-foreground mr-1">Flujo:</span>
                                    {useCase.flowIcons.map((FlowIcon, idx) => (
                                        <div key={idx} className="flex items-center">
                                            <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full ${idx === 0 ? 'bg-primary/10 border-primary/30 text-primary' : idx === 1 ? 'bg-secondary/10 border-secondary/30 text-secondary' : idx === 2 && useCase.flowIcons.length > 3 ? 'bg-accent/10 border-accent/30 text-accent' : 'bg-white/10 border-white/30 text-white'} flex items-center justify-center border`}>
                                                <FlowIcon size={idx === 0 ? 14 : 16} aria-hidden="true" /> {/* Ajuste de tamaño de icono */}
                                            </div>
                                            {idx < useCase.flowIcons.length - 1 && <ArrowRight size={14} className="mx-1 text-muted-foreground/70" aria-hidden="true" />}
                                        </div>
                                    ))}
                                </div>
                                <div className={`text-xs font-semibold px-3 py-1.5 rounded-full ${theme.tag}`}>
                                    Totalmente Automatizado
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
        
        {/* CTA de la Sección */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}
          className="mt-20 md:mt-24 text-center"
        >
          <motion.button 
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05, y: shouldReduceMotion ? 0 : -3 }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            className="px-8 py-3.5 rounded-lg bg-secondary text-secondary-foreground font-semibold flex items-center justify-center gap-2.5 mx-auto hover:glow-purple-soft transition-all duration-300 shadow-xl shadow-secondary/25 text-base"
          >
            Ver Demostración en Vivo <ArrowRight size={18} aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}