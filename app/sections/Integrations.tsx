"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations"; // Asumo staggerContainer existe
import { ArrowRight, Plus, Check, ExternalLink, X } from "lucide-react"; // Agregado X
import Image from "next/image"; // Importante para las imágenes

// Tipos de Datos
interface Category {
  id: string;
  name: string;
}
interface IntegrationFeature {
  text: string;
  // Podrías añadir un icono específico si lo necesitas
}
interface IntegrationData {
  id: string; // Para keys y aria-controls
  name: string;
  imageSrc: string; // Ruta a la imagen del logo
  category: "communication" | "productivity" | "payment" | "crm" | "analytics"; // Expandir categorías si es necesario
  theme: "primary" | "secondary" | "accent" | "neutral" | string; // string para colores personalizados
  description: string;
  features: IntegrationFeature[];
  documentationUrl?: string; // Opcional
  popular?: boolean;
}

// Categorías de integraciones
const categoriesData: Category[] = [
  { id: "all", name: "Todas" },
  { id: "communication", name: "Comunicación" },
  { id: "productivity", name: "Productividad" },
  { id: "crm", name: "CRM y Ventas" },
  { id: "payment", name: "Pagos" },
  //   { id: "analytics", name: "Análisis" }
];

// Datos de las integraciones (con rutas de imagen reales y temas)
const integrationsData: IntegrationData[] = [
  {
    id: "whatsapp", name: "WhatsApp", imageSrc: "/integrations/whatsapp-logo.svg", category: "communication", theme: "primary",
    description: "Conecta con tus clientes donde están. Automatiza respuestas, envía notificaciones y gestiona conversaciones a escala.",
    features: [ {text:"Respuestas automáticas 24/7"}, {text:"Plantillas de mensajes personalizables"}, {text:"Transferencia inteligente a agentes"}],
    documentationUrl: "#", popular: true
  },
  {
    id: "gmail", name: "Gmail", imageSrc: "/integrations/gmail-logo.svg", category: "communication", theme: "custom-red", // Ejemplo de color custom
    description: "Automatiza el envío de correos electrónicos basados en interacciones de chat, eventos o acciones de CRM.",
    features: [ {text:"Plantillas HTML dinámicas"}, {text:"Seguimiento de aperturas y clics"}, {text:"Programación de secuencias de correo"}],
    documentationUrl: "#"
  },
  {
    id: "gcalendar", name: "Google Calendar", imageSrc: "/integrations/gcalendar-logo.svg", category: "productivity", theme: "accent",
    description: "Agenda citas y reuniones automáticamente desde conversaciones, sincronizando con tu disponibilidad en tiempo real.",
    features: [ {text:"Detección inteligente de disponibilidad"}, {text:"Confirmaciones y recordatorios automáticos"}, {text:"Sincronización con múltiples calendarios"}],
    documentationUrl: "#", popular: true
  },
  {
    id: "notion", name: "Notion", imageSrc: "/integrations/notion-logo.svg", category: "productivity", theme: "neutral",
    description: "Crea y actualiza bases de conocimiento, FAQs y documentación interna directamente desde las interacciones con clientes.",
    features: [ {text:"Creación automática de páginas desde plantillas"}, {text:"Actualización de bases de datos Notion"}, {text:"Organización de información y feedback"}],
    documentationUrl: "#"
  },
  {
    id: "slack", name: "Slack", imageSrc: "/integrations/slack-logo.svg", category: "communication", theme: "secondary",
    description: "Notifica a tu equipo sobre conversaciones importantes, asigna tareas o responde directamente desde Slack.",
    features: [ {text:"Notificaciones en canales específicos"}, {text:"Creación de hilos para seguimiento"}, {text:"Acciones rápidas desde Slack"}],
    documentationUrl: "#", popular: true
  },
  {
    id: "stripe", name: "Stripe", imageSrc: "/integrations/stripe-logo.svg", category: "payment", theme: "custom-purple", // Ejemplo
    description: "Procesa pagos de forma segura, envía facturas y gestiona suscripciones directamente desde el chat.",
    features: [ {text:"Creación de enlaces de pago únicos"}, {text:"Gestión de suscripciones y planes"}, {text:"Notificaciones de pago automáticas"}],
    documentationUrl: "#"
  },
  {
    id: "hubspot", name: "HubSpot", imageSrc: "/integrations/hubspot-logo.svg", category: "crm", theme: "custom-orange", // Ejemplo
    description: "Sincroniza contactos, empresas y conversaciones con tu CRM HubSpot para una vista 360º de tus clientes.",
    features: [ {text:"Creación y actualización de contactos/empresas"}, {text:"Registro de actividades y conversaciones"}, {text:"Disparadores de workflows de HubSpot"}],
    documentationUrl: "#", popular: true
  },
  // Añadir más integraciones...
];

// Helper para clases de tema
const getIntegrationTheme = (theme: IntegrationData["theme"]) => {
    // Base para colores custom, puedes expandir esto
    const customColors: Record<string, { card: string, text: string, bg: string, glow: string }> = {
        "custom-red": { card: "border-red-500/40 hover:border-red-500/70", text: "text-red-500", bg: "bg-red-950/50", glow: "hover:shadow-lg hover:shadow-red-500/20" },
        "custom-purple": { card: "border-purple-500/40 hover:border-purple-500/70", text: "text-purple-500", bg: "bg-purple-950/50", glow: "hover:shadow-lg hover:shadow-purple-500/20" },
        "custom-orange": { card: "border-orange-500/40 hover:border-orange-500/70", text: "text-orange-500", bg: "bg-orange-950/50", glow: "hover:shadow-lg hover:shadow-orange-500/20" },
    };

    if (customColors[theme]) return customColors[theme];

    switch (theme) {
        case "primary": return { card: "border-primary/40 hover:border-primary/70", text: "text-primary", bg: "bg-green-950/50", glow: "hover:glow-green-soft" };
        case "secondary": return { card: "border-secondary/40 hover:border-secondary/70", text: "text-secondary", bg: "bg-purple-950/50", glow: "hover:glow-purple-soft" };
        case "accent": return { card: "border-accent/40 hover:border-accent/70", text: "text-accent", bg: "bg-blue-950/50", glow: "hover:glow-blue-soft" };
        default: return { card: "border-white/30 hover:border-white/60", text: "text-white", bg: "bg-gray-800/50", glow: "hover:shadow-lg hover:shadow-white/10" }; // neutral
    }
};


// Subcomponente IntegrationCard
const IntegrationCard: React.FC<{
    integration: IntegrationData;
    onSelect: () => void;
    isSelected: boolean;
    shouldReduceMotion: boolean;
}> = ({ integration, onSelect, isSelected, shouldReduceMotion }) => {
    const theme = getIntegrationTheme(integration.theme);
    const cardMotionProps = !shouldReduceMotion ? { whileHover: { scale: 1.05, y: -3 }, transition: { duration: 0.2 } } : {};

    return (
        <motion.div
            layout // Para animación si el grid cambia
            variants={fadeIn}
            className="flex flex-col items-center"
            {...cardMotionProps}
        >
            <button
                type="button"
                onClick={onSelect}
                aria-pressed={isSelected} // Indica si está seleccionado para mostrar detalles
                aria-label={`Ver detalles de ${integration.name}`}
                className={`relative w-28 h-28 md:w-32 md:h-32 p-2 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg ${theme.card} ${theme.bg} ${theme.glow} ${isSelected ? 'ring-2 ring-offset-1 ' + theme.text : ''}`}
            >
                <Image
                    src={integration.imageSrc}
                    alt={`Logo de ${integration.name}`}
                    width={64} // Ajusta según el tamaño de tus logos
                    height={64}
                    className="object-contain w-12 h-12 md:w-16 md:h-16 group-hover:scale-110 transition-transform duration-300"
                />
                {integration.popular && (
                    <div className="absolute -top-2.5 -right-2.5 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-semibold shadow-md">
                        POPULAR
                    </div>
                )}
                 {!shouldReduceMotion && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-black/30 rounded-[14px]"> {/* Ajuste de radio para el overlay */}
                        <Plus size={24} className="text-white" />
                    </div>
                 )}
            </button>
            <div className="mt-3 text-center px-1">
                <p className="text-sm font-semibold">{integration.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{integration.category}</p>
            </div>
        </motion.div>
    );
};

// Subcomponente IntegrationDetailPanel
const IntegrationDetailPanel: React.FC<{
    integration: IntegrationData;
    onClose: () => void;
}> = ({ integration, onClose }) => {
    const theme = getIntegrationTheme(integration.theme);
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto', transition: { duration: 0.35, ease: "easeInOut" } }}
            exit={{ opacity: 0, y: 30, height: 0, transition: { duration: 0.25, ease: "easeInOut" } }}
            className="mt-12 max-w-3xl mx-auto" // Ancho máximo para el panel
            role="dialog" // Es un tipo de diálogo
            aria-labelledby={`detail-title-${integration.id}`}
            aria-modal="true" // Ya que es el foco principal cuando está abierto
        >
            <div className={`p-6 md:p-8 rounded-2xl border-2 ${theme.card} ${theme.bg} backdrop-blur-md shadow-2xl relative`}>
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label="Cerrar detalles de integración"
                >
                    <X size={20} />
                </button>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className={`w-20 h-20 md:w-24 md:h-24 p-2 rounded-xl border-2 ${theme.card} ${theme.bg} flex-shrink-0 flex items-center justify-center`}>
                        <Image src={integration.imageSrc} alt={`Logo de ${integration.name}`} width={80} height={80} className="object-contain w-14 h-14 md:w-16 md:h-16" />
                    </div>
                    <div className="flex-1">
                        <h3 id={`detail-title-${integration.id}`} className={`text-2xl font-bold mb-2 ${theme.text}`}>
                            {integration.name}
                        </h3>
                        <p className="text-muted-foreground mb-5 text-base leading-relaxed">
                            {integration.description}
                        </p>
                        <h4 className={`text-sm font-semibold mb-2 ${theme.text}`}>Características clave:</h4>
                        <ul className="space-y-1.5 mb-6">
                            {integration.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <Check className={`w-4 h-4 mt-1 flex-shrink-0 ${theme.text}`} aria-hidden="true" />
                                    <span className="text-sm text-muted-foreground/90">{feature.text}</span>
                                </li>
                            ))}
                        </ul>
                        {integration.documentationUrl && (
                            <a 
                                href={integration.documentationUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium border-2 ${theme.card} ${theme.text} hover:bg-white/5 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${theme.text === 'text-white' ? 'focus-visible:ring-offset-gray-800' : 'focus-visible:ring-offset-dark-bg'}`}
                            >
                                Ver Documentación <ExternalLink size={16} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


export default function Integrations() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedIntegrationId, setSelectedIntegrationId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const filteredIntegrations = activeCategory === "all" 
    ? integrationsData 
    : integrationsData.filter(integration => integration.category === activeCategory);
  
  const selectedIntegrationData = selectedIntegrationId 
    ? integrationsData.find(int => int.id === selectedIntegrationId) 
    : null;

  // Efecto para cerrar el panel si se hace clic afuera (o si la integración seleccionada desaparece por filtro)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (detailPanelRef.current && !detailPanelRef.current.contains(event.target as Node)) {
        // Verifica si el clic fue en una tarjeta de integración para evitar cierre inmediato
        const clickedOnCard = (event.target as HTMLElement).closest('[role="button"][aria-pressed]');
        if (!clickedOnCard) {
            setSelectedIntegrationId(null);
        }
      }
    }
    if (selectedIntegrationId) {
        document.addEventListener("mousedown", handleClickOutside);
    }
    // Si la integración seleccionada ya no está en las filtradas, deselecciónala
    if (selectedIntegrationId && !filteredIntegrations.find(fi => fi.id === selectedIntegrationId)) {
        setSelectedIntegrationId(null);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedIntegrationId, filteredIntegrations]);


  return (
    <section className="py-20 md:py-28 px-4 bg-dark-bg relative overflow-hidden" id="integraciones" aria-labelledby="integrations-title">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-card via-dark-bg to-dark-bg opacity-80" />
      {!shouldReduceMotion && (
        <>
          <div className="absolute top-40 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-slow-soft"></div>
          <div className="absolute bottom-40 right-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow-soft animation-delay-2000"></div>
        </>
      )}
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide">
              Integraciones y datos
            </span>
          </div>
          <h2 id="integrations-title" className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white leading-tight">
            Conecta tu CRM, ERP y <span className="text-primary">e‑commerce</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl">
            Flow AI se integra con tus sistemas para responder con contexto y ejecutar acciones reales: pagos, reservas, reembolsos y más.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount:0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16"
          role="tablist" // Para accesibilidad de los filtros
          aria-label="Categorías de integraciones"
        >
          {categoriesData.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                // setSelectedIntegrationId(null); // Opcional: cerrar detalle al cambiar filtro
              }}
              role="tab"
              aria-selected={activeCategory === category.id}
              aria-controls="integrations-grid" // Controla el grid
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg ${activeCategory === category.id 
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                : 'bg-dark-card text-muted-foreground hover:bg-dark-card/80 hover:text-white'}`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>
        
        <motion.div 
          id="integrations-grid"
          role="tabpanel" // El contenido que muestran los tabs
          aria-labelledby={categoriesData.find(c => c.id === activeCategory)?.name} // Etiquetado por el tab activo
          key={activeCategory} // Importante para que Framer Motion re-anime al cambiar filtro
          variants={staggerContainer(0.05, 0.1)} initial="hidden" animate="visible" // Usar animate en vez de whileInView para re-animar
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10 max-w-6xl mx-auto" // max-w-6xl y xl:grid-cols-6
        >
          {filteredIntegrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onSelect={() => setSelectedIntegrationId(prevId => prevId === integration.id ? null : integration.id)}
              isSelected={selectedIntegrationId === integration.id}
              shouldReduceMotion={!!shouldReduceMotion}
            />
          ))}
        </motion.div>
        
        {/* Referencia para el panel de detalle para el clic afuera */}
        <div ref={detailPanelRef}> 
            <AnimatePresence mode="wait"> {/* mode="wait" para transiciones más limpias */}
            {selectedIntegrationData && (
                <IntegrationDetailPanel
                    key={selectedIntegrationData.id} // Key para forzar re-render si cambia la integración
                    integration={selectedIntegrationData}
                    onClose={() => setSelectedIntegrationId(null)}
                />
            )}
            </AnimatePresence>
        </div>
        
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}
          className="text-center mt-20 md:mt-28 max-w-2xl mx-auto"
        >
          <div className="p-6 md:p-8 rounded-xl border border-white/10 bg-dark-card/60 backdrop-blur-md shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold mb-4">¿No Encuentras tu Herramienta Favorita?</h3>
            <p className="text-muted-foreground mb-6 text-base md:text-lg">
              Nuestro ecosistema crece constantemente. Si necesitas una integración específica, contáctanos. ¡Tu feedback nos ayuda a priorizar nuestra hoja de ruta!
            </p>
            <motion.a 
              href="#contacto" // Asumiendo una sección de contacto
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05, y: shouldReduceMotion ? 0 : -2 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:glow-green-soft transition-all duration-300 shadow-lg shadow-primary/25 text-base"
            >
              Solicitar Nueva Integración <ArrowRight size={18} aria-hidden="true" />
            </motion.a>
          </div>
          
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { value: integrationsData.length, label: "Integraciones Activas", themeColor: "text-primary" },
              { value: "12+", label: "En Desarrollo Próximamente", themeColor: "text-secondary" }, // Ejemplo
              { value: "API", label: "Abierta para Desarrolladores", themeColor: "text-accent" } // Ejemplo
            ].map(stat => (
              <div key={stat.label} className="text-center p-4 rounded-lg bg-dark-card/40">
                <p className={`text-4xl md:text-5xl font-bold ${stat.themeColor}`}>{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}