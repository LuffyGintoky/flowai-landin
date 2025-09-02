"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Check, X, Zap, Calendar, MessageCircle, Users, Sparkles, Shield, HelpCircle, Info, ArrowRight, ChevronDown } from "lucide-react"; // Agregado Info, ArrowRight y ChevronDown

// Tipos de Datos
interface FeatureDetail {
  category: string;
  included: boolean;
  text: string;
  tooltip?: string; // Tooltip ahora es opcional
}
interface PlanData {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  priceCLP: number;
  annualPriceUSD?: number; // Opcional para precio anual
  annualPriceCLP?: number; // Opcional para precio anual
  theme: "neutral" | "primary" | "secondary"; // Temas para color-coding
  popular?: boolean;
  ctaText: string;
  ctaLink?: string; // Para enlazar el CTA
  periodLabel: string; // ej. "/mes" o "/año"
  highlightFeatures: string[];
  features: FeatureDetail[];
  isCustom?: boolean; // Para el plan "Growth" o "Enterprise"
}
interface FeatureCategory {
  id: string;
  name: string;
  icon: React.ElementType;
}
interface FAQItem {
  question: string;
  answer: string;
}

// Categorías de características para comparación
const featureCategoriesData: FeatureCategory[] = [
  { id: "messages", name: "Mensajes Automatizados", icon: MessageCircle },
  { id: "channels", name: "Canales de Comunicación", icon: Users },
  { id: "ai", name: "Capacidades de IA", icon: Sparkles },
  { id: "scheduling", name: "Agendamiento Inteligente", icon: Calendar },
  { id: "integrations", name: "Integraciones Clave", icon: Zap },
  { id: "customization", name: "Personalización y Flujos", icon: Shield },
  { id: "support", name: "Soporte Técnico", icon: HelpCircle }
];

// Datos de los planes (mejorados con temas y opción anual)
const plansData: PlanData[] = [
  {
    id: "starter", name: "Starter", description: "Ideal para pequeños negocios o profesionales que inician.",
    priceUSD: 29, priceCLP: 24900,
    annualPriceUSD: 290, annualPriceCLP: 249000, // Ahorro de ~2 meses
    theme: "neutral",
    ctaText: "Probar gratis 14 días", ctaLink: "#prueba-starter",
    periodLabel: "/mes",
    highlightFeatures: ["Automatización básica", "Respuestas IA predefinidas", "Agendamiento simple"],
    features: [
      { category: "messages", included: true, text: "500 mensajes/mes", tooltip: "Mensajes automáticos procesados por la plataforma." },
      { category: "channels", included: true, text: "1 canal (WhatsApp o Email)", tooltip: "Elige un canal para tus automatizaciones." },
      { category: "ai", included: true, text: "Respuestas IA básicas", tooltip: "IA con plantillas y respuestas predefinidas." },
      { category: "scheduling", included: true, text: "Agendamiento simple", tooltip: "Permite a clientes agendar en franjas horarias preestablecidas." },
      { category: "integrations", included: false, text: "Integraciones limitadas", tooltip: "Conexión solo con Google Calendar." },
      { category: "customization", included: false, text: "Personalización de flujos limitada", tooltip: "Ajustes básicos en flujos predefinidos." },
      { category: "support", included: true, text: "Soporte por Email", tooltip: "Soporte técnico a través de correo electrónico." }
    ]
  },
  {
    id: "pro", name: "Pro", description: "Para negocios en crecimiento que buscan automatización avanzada y personalización.",
    priceUSD: 79, priceCLP: 67900,
    annualPriceUSD: 790, annualPriceCLP: 679000, // Ahorro de ~2 meses
    theme: "primary", popular: true,
    ctaText: "Comenzar Plan Pro", ctaLink: "#prueba-pro",
    periodLabel: "/mes",
    highlightFeatures: ["Automatización avanzada", "IA personalizada", "Múltiples canales", "Integraciones clave"],
    features: [
      { category: "messages", included: true, text: "2,000 mensajes/mes", tooltip: "Volumen ampliado de mensajes automáticos." },
      { category: "channels", included: true, text: "Hasta 3 canales", tooltip: "Conecta WhatsApp, Email y Sitio Web (Widget)." },
      { category: "ai", included: true, text: "Respuestas IA avanzadas", tooltip: "IA entrenable con conocimiento específico de tu negocio." },
      { category: "scheduling", included: true, text: "Agendamiento completo y recordatorios", tooltip: "Gestión avanzada de citas, recordatorios y cancelaciones." },
      { category: "integrations", included: true, text: "Integraciones estándar", tooltip: "Conexión con CRMs populares, herramientas de marketing, etc." },
      { category: "customization", included: true, text: "Personalización de flujos", tooltip: "Editor visual para crear y modificar flujos de conversación." },
      { category: "support", included: true, text: "Soporte por Chat y Email", tooltip: "Acceso a soporte técnico vía chat en vivo y email." }
    ]
  },
  {
    id: "growth", name: "Growth", description: "Solución completa para empresas con alto volumen y necesidades complejas.",
    priceUSD: 0, priceCLP: 0, // Precio personalizado
    theme: "secondary",
    isCustom: true, // Indica que el precio es personalizado
    ctaText: "Contactar para Demo", ctaLink: "#contacto",
    periodLabel: "Personalizado",
    highlightFeatures: ["Volumen ilimitado (personalizado)", "IA y flujos a medida", "Integraciones dedicadas", "Soporte prioritario"],
    features: [
      { category: "messages", included: true, text: "Mensajes personalizables (alto volumen/ilimitado)", tooltip: "Volumen adaptado a tus necesidades." },
      { category: "channels", included: true, text: "Todos los canales y APIs", tooltip: "Acceso completo a canales existentes y futuros, más API." },
      { category: "ai", included: true, text: "IA dedicada y entrenamiento continuo", tooltip: "Modelo de IA exclusivo y optimización constante." },
      { category: "scheduling", included: true, text: "Agendamiento avanzado con reglas de negocio", tooltip: "Sistema de agendamiento a medida con lógica compleja." },
      { category: "integrations", included: true, text: "Todas las integraciones y desarrollos custom", tooltip: "Acceso total y desarrollo de integraciones a medida." },
      { category: "customization", included: true, text: "Personalización completa y consultoría", tooltip: "Control total y acompañamiento estratégico." },
      { category: "support", included: true, text: "Soporte prioritario 24/7 y gestor de cuenta", tooltip: "Atención premium y un especialista dedicado." }
    ]
  }
];

// FAQs
const faqsData: FAQItem[] = [
    { question: "¿Puedo cambiar de plan en cualquier momento?", answer: "Sí, puedes actualizar, degradar o cancelar tu plan en cualquier momento desde tu panel de control. Los cambios se aplicarán al inicio del siguiente ciclo de facturación." },
    { question: "¿Ofrecen un período de prueba gratuito?", answer: "¡Claro! Todos nuestros planes (excepto el Growth personalizado) incluyen un período de prueba gratuito de 14 días. No necesitas ingresar tarjeta de crédito para comenzar." },
    { question: "¿Cómo funciona la facturación para planes anuales?", answer: "Al elegir un plan anual, realizas un pago único por 12 meses de servicio, beneficiándote de un descuento significativo (generalmente equivalente a 2 meses gratis)." },
    { question: "¿Qué sucede si supero los límites de mi plan?", answer: "Te notificaremos antes de alcanzar tus límites. Podrás optar por actualizar a un plan superior o adquirir paquetes adicionales de mensajes o funcionalidades, según corresponda." },
    { question: "¿Qué tipo de soporte ofrecen?", answer: "Todos los planes incluyen soporte. El plan Starter ofrece soporte por email, el Pro añade chat en vivo, y el Growth incluye un gestor de cuenta dedicado y soporte prioritario 24/7." }
];


// Helper para temas de plan
const getPlanThemeClasses = (theme: PlanData["theme"]) => {
    switch (theme) {
        case "primary": return {
            border: "border-primary/40 hover:border-primary/70",
            bgCard: "bg-gradient-to-br from-primary/10 via-dark-card to-dark-card",
            text: "text-primary",
            badge: "bg-primary text-primary-foreground",
            button: "bg-primary text-primary-foreground hover:glow-green-soft",
            highlightDot: "bg-primary"
        };
        case "secondary": return {
            border: "border-secondary/40 hover:border-secondary/70",
            bgCard: "bg-gradient-to-br from-secondary/10 via-dark-card to-dark-card",
            text: "text-secondary",
            badge: "bg-secondary text-white", // Asumiendo secondary es oscuro
            button: "bg-secondary text-white hover:glow-purple-soft",
            highlightDot: "bg-secondary"
        };
        default: return { // neutral
            border: "border-white/20 hover:border-white/40",
            bgCard: "bg-gradient-to-br from-dark-bg via-dark-card to-dark-card/80",
            text: "text-white",
            badge: "bg-white/10 text-white",
            button: "border border-white/20 hover:border-white/40 text-white hover:bg-white/5",
            highlightDot: "bg-white"
        };
    }
};

// Tooltip Component
const Tooltip: React.FC<{ text: string; x: number; y: number }> = ({ text, x, y }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: 10 }}
    transition={{ duration: 0.15 }}
    className="fixed bg-dark-bg border border-white/20 p-2.5 rounded-md text-xs max-w-xs z-[100] shadow-xl pointer-events-none"
    style={{
      left: x,
      top: y,
      transform: 'translate(-50%, calc(-100% - 10px))', // Posiciona arriba del cursor
    }}
  >
    {text}
  </motion.div>
);


export default function Pricing() {
  const [currency, setCurrency] = useState<"USD" | "CLP">("USD");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleShowTooltip = (
    text: string | undefined,
    event: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>
  ) => {
    if (!text) return;

    // For mouse events use cursor position; for focus events use element position
    if ("clientX" in event && "clientY" in event) {
      setTooltip({ text, x: event.clientX, y: event.clientY });
    } else {
      const targetElement = event.currentTarget as HTMLElement;
      const rect = targetElement.getBoundingClientRect();
      setTooltip({ text, x: rect.left + rect.width / 2, y: rect.top });
    }
  };
  const handleHideTooltip = () => setTooltip(null);

  const getPrice = (plan: PlanData) => {
    if (plan.isCustom) return plan.periodLabel; // "Personalizado"

    const price = billingCycle === "annually"
      ? (currency === "USD" ? plan.annualPriceUSD : plan.annualPriceCLP)
      : (currency === "USD" ? plan.priceUSD : plan.priceCLP);
    
    const currencySymbol = currency === "USD" ? "$" : "$";
    const formattedPrice = price?.toLocaleString(currency === "CLP" ? "es-CL" : "en-US") || "N/A";
    return `${currencySymbol}${formattedPrice}`;
  };

  const getPeriodLabel = (plan: PlanData) => {
    if (plan.isCustom) return "";
    return billingCycle === "annually" ? "/año" : "/mes";
  };
  
  const getSavingsText = (plan: PlanData) => {
    if (plan.isCustom || billingCycle === "monthly" || !plan.annualPriceUSD || !plan.priceUSD ) return "";
    // Calcula ahorro aproximado de 2 meses
    return `Ahorra ~16% (2 meses gratis)`; 
  };

  return (
    <section className="py-20 md:py-28 px-4 bg-dark-card relative overflow-hidden" id="precios" aria-labelledby="pricing-title">
      <div className="absolute inset-0 bg-gradient-to-tr from-dark-bg via-dark-card to-dark-bg opacity-80" />
      {!shouldReduceMotion && (
        <>
          <div className="absolute top-40 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-slow-soft"></div>
          <div className="absolute bottom-40 right-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow-soft animation-delay-2000"></div>
        </>
      )}
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide">
              Planes Flexibles y Transparentes
            </span>
          </div>
          <h2 id="pricing-title" className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary to-white leading-tight">
            Encuentra el Plan Perfecto <span className="text-secondary">Para Ti</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl">
            Elige la opción que mejor se adapte al tamaño y necesidades de tu negocio, con la flexibilidad de escalar cuando lo necesites.
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-12 md:mb-16"
        >
          {/* Selector de Moneda y Ciclo de Facturación */}
          <div className="flex gap-2">
            {[{val: "monthly", label: "Mensual"}, {val: "annually", label: "Anual (Ahorra)"}].map(cycle => (
              <button key={cycle.val} onClick={() => setBillingCycle(cycle.val as "monthly" | "annually")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-card ${billingCycle === cycle.val ? "bg-primary text-primary-foreground shadow-md" : "bg-dark-bg text-muted-foreground hover:text-white"}`}>
                {cycle.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {[{val: "USD", label: "USD"}, {val: "CLP", label: "CLP"}].map(curr => (
              <button key={curr.val} onClick={() => setCurrency(curr.val as "USD" | "CLP")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-card ${currency === curr.val ? "bg-primary text-primary-foreground shadow-md" : "bg-dark-bg text-muted-foreground hover:text-white"}`}>
                {curr.label}
              </button>
            ))}
          </div>
          {/* Selector de Vista */}
          <div className="bg-dark-bg rounded-lg p-1 flex shadow-md">
            {[{val: "cards", label: "Tarjetas"}, {val: "table", label: "Comparar"}].map(vm => (
               <button key={vm.val} onClick={() => setViewMode(vm.val as "cards" | "table")}
                aria-pressed={viewMode === vm.val}
                className={`px-5 py-2 rounded-md text-sm font-semibold transition-all duration-300 flex items-center gap-2 focus:outline-none focus-visible:ring-1 ${viewMode === vm.val ? "bg-secondary text-white shadow-inner" : "text-muted-foreground hover:text-white"}`}>
                {/* Iconos para Tarjetas/Tabla pueden ir aquí */}
                {vm.label}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>{tooltip && <Tooltip {...tooltip} />}</AnimatePresence>
        
        {/* Vistas de Planes */}
        <AnimatePresence mode="wait">
            {viewMode === "cards" ? (
            <motion.div 
                key="cards-view"
                variants={staggerContainer(0.1, 0.2)} initial="hidden" animate="visible" exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" // max-w-6xl
            >
                {plansData.map((plan) => {
                    const theme = getPlanThemeClasses(plan.theme);
                    const cardMotionProps = !shouldReduceMotion ? { whileHover: { scale: 1.02, y: -6 }, transition:{ type: "spring", stiffness: 300, damping: 15 } } : {};
                    return (
                    <motion.div
                        key={plan.id} layoutId={`plan-card-${plan.id}`} variants={fadeIn}
                        className={`relative flex flex-col h-full p-6 md:p-8 rounded-2xl border-2 shadow-xl transition-all duration-300 ${theme.border} ${theme.bgCard}`}
                        {...cardMotionProps}
                    >
                        {plan.popular && (
                        <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 ${theme.badge} text-xs font-bold px-4 py-1.5 rounded-full shadow-lg`}>
                            Más Popular
                        </div>
                        )}
                        {billingCycle === 'annually' && getSavingsText(plan) && (
                           <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-xs px-3 py-1 rounded-full rotate-3 border border-white/5 text-white font-medium">
                             {getSavingsText(plan)}
                           </div>
                        )}
                        
                        <h3 className={`text-2xl font-bold mb-2 mt-5 ${theme.text}`}>{plan.name}</h3>
                        <p className="text-sm text-muted-foreground mb-6 min-h-[3em]">{plan.description}</p> {/* min-h para alinear */}
                        
                        <div className="mb-6 space-y-1.5">
                            {plan.highlightFeatures.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                                <div className={`w-2 h-2 rounded-full ${theme.highlightDot} flex-shrink-0`}></div>
                                <span className="text-sm font-medium text-white/90">{feature}</span>
                            </div>
                            ))}
                        </div>

                        <div className="my-6 p-4 bg-dark-bg/60 backdrop-blur-sm rounded-xl border border-white/10">
                            <div className="flex items-baseline justify-center">
                                <span className={`text-4xl font-bold ${theme.text}`}>{getPrice(plan)}</span>
                                {!plan.isCustom && <span className="text-muted-foreground ml-1.5 text-sm">{getPeriodLabel(plan)}</span>}
                            </div>
                            {billingCycle === 'monthly' && getSavingsText(plan) && (
                                <p className="text-xs text-primary text-center mt-1">{getSavingsText(plan)} si pagas anual</p>
                            )}
                        </div>
                        
                        <div className="space-y-2.5 mb-8 flex-grow"> {/* flex-grow para empujar CTA abajo */}
                            {plan.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2.5"
                                onMouseEnter={e => handleShowTooltip(feature.tooltip, e)} onMouseLeave={handleHideTooltip}
                                onFocus={e => handleShowTooltip(feature.tooltip, e)} onBlur={handleHideTooltip} tabIndex={feature.tooltip ? 0 : -1} // Para accesibilidad de tooltip
                                aria-describedby={feature.tooltip ? `tooltip-${plan.id}-${i}` : undefined}
                            >
                                {feature.included 
                                    ? <Check className={`w-5 h-5 ${theme.text} mt-0.5 flex-shrink-0`} aria-hidden="true"/> 
                                    : <X className="w-5 h-5 text-muted-foreground/70 mt-0.5 flex-shrink-0" aria-hidden="true"/>}
                                <span className={`text-sm ${feature.included ? 'text-white/90' : 'text-muted-foreground/80'}`}>
                                {feature.text}
                                </span>
                                {feature.tooltip && <span id={`tooltip-${plan.id}-${i}`} className="sr-only">{feature.tooltip}</span>}
                            </div>
                            ))}
                        </div>
                        
                        <div className="mt-auto">
                            <a href={plan.ctaLink || "#"}
                                className={`w-full block text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-card ${theme.button} ${plan.theme === 'neutral' ? 'focus-visible:ring-white' : plan.theme === 'primary' ? 'focus-visible:ring-primary' : 'focus-visible:ring-secondary' }`}>
                            {plan.ctaText}
                            </a>
                        </div>
                    </motion.div>
                    );
                })}
            </motion.div>
            ) : (
            <motion.div 
                key="table-view"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="max-w-7xl mx-auto bg-dark-bg/70 backdrop-blur-md rounded-2xl border border-white/10 overflow-x-auto shadow-2xl"
                // overflow-x-auto para responsividad de la tabla
            >
                <table className="w-full min-w-[1024px]" aria-label="Comparación de Planes">
                    <caption className="sr-only">Tabla comparativa de características de los planes Starter, Pro y Growth.</caption>
                    <thead className="sticky top-0 bg-dark-bg/80 backdrop-blur-sm z-10">
                        <tr>
                            <th scope="col" className="p-4 md:p-6 text-left text-base font-semibold border-b border-r border-white/10 w-[25%]">
                                Características
                            </th>
                            {plansData.map(plan => {
                                const theme = getPlanThemeClasses(plan.theme);
                                return (
                                <th key={plan.id} scope="col" 
                                    className={`p-4 md:p-6 text-center text-base font-semibold border-b border-white/10 w-[25%] ${plan.popular ? theme.bgCard.replace('bg-gradient-to-br','').split(' ')[0] : ''}`}> {/* simplified bg for popular */}
                                    {plan.popular && <div className={`inline-block ${theme.badge} text-xs px-2.5 py-1 rounded-full mb-2`}>Más Popular</div>}
                                    <h3 className={`text-xl font-bold ${theme.text}`}>{plan.name}</h3>
                                    <div className="my-2">
                                        <span className={`text-2xl font-bold ${theme.text}`}>{getPrice(plan)}</span>
                                        {!plan.isCustom && <span className="text-xs text-muted-foreground ml-1">{getPeriodLabel(plan)}</span>}
                                    </div>
                                    <a href={plan.ctaLink || "#"} className={`block w-full max-w-[200px] mx-auto py-2.5 px-3 text-sm rounded-lg font-semibold transition-all duration-300 ${theme.button}`}>
                                        {plan.ctaText}
                                    </a>
                                </th>
                            )})}
                        </tr>
                    </thead>
                    <tbody>
                        {featureCategoriesData.map(category => (
                        <React.Fragment key={category.id}>
                            <tr>
                                <td colSpan={plansData.length + 1} className="p-3 md:p-4 bg-dark-card/40 border-b border-t border-white/10">
                                    <div className="flex items-center gap-2.5">
                                        <category.icon className="w-5 h-5 text-primary" aria-hidden="true"/>
                                        <h4 className="text-base font-semibold text-white/95">{category.name}</h4>
                                    </div>
                                </td>
                            </tr>
                            {plansData[0].features.filter(f => f.category === category.id).map((featureTemplate, idx) => (
                            <tr key={`${category.id}-${idx}`} className="hover:bg-white/5 transition-colors duration-150">
                                <th scope="row" 
                                    className="p-3 md:p-4 text-left text-sm font-normal text-muted-foreground border-b border-r border-white/10"
                                    onMouseEnter={e => handleShowTooltip(featureTemplate.tooltip, e)} onMouseLeave={handleHideTooltip}
                                    onFocus={e => handleShowTooltip(featureTemplate.tooltip, e)} onBlur={handleHideTooltip} tabIndex={featureTemplate.tooltip ? 0 : -1}
                                    aria-describedby={featureTemplate.tooltip ? `tooltip-table-${category.id}-${idx}` : undefined}
                                >
                                    {featureTemplate.text}
                                    {featureTemplate.tooltip && (
                                        <Info size={14} className="inline-block ml-1 text-muted-foreground/70" aria-hidden="true"/>
                                    )}
                                    {featureTemplate.tooltip && <span id={`tooltip-table-${category.id}-${idx}`} className="sr-only">{featureTemplate.tooltip}</span>}
                                </th>
                                {plansData.map(plan => {
                                    const planFeature = plan.features.find(f => f.category === category.id && f.text === featureTemplate.text);
                                    const theme = getPlanThemeClasses(plan.theme);
                                    return (
                                    <td key={`${plan.id}-${category.id}-${idx}`} className="p-3 md:p-4 text-center border-b border-white/10"
                                        onMouseEnter={e => handleShowTooltip(planFeature?.tooltip || featureTemplate.tooltip, e)} onMouseLeave={handleHideTooltip}
                                        onFocus={e => handleShowTooltip(planFeature?.tooltip || featureTemplate.tooltip, e)} onBlur={handleHideTooltip} tabIndex={(planFeature?.tooltip || featureTemplate.tooltip) ? 0 : -1}
                                    >
                                        {planFeature?.included 
                                        ? <Check className={`w-6 h-6 ${theme.text}`} aria-label="Incluido"/> 
                                        : <X className="w-6 h-6 text-muted-foreground/60" aria-label="No incluido"/>}
                                    </td>
                                )})}
                            </tr>
                            ))}
                        </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </motion.div>
            )}
        </AnimatePresence>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}
          className="text-center mt-20 md:mt-28 max-w-3xl mx-auto"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-white/10 backdrop-blur-md shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-secondary">
              ¿Necesitas Algo Más Específico?
            </h3>
            <p className="text-muted-foreground mb-8 text-base md:text-lg">
              Para empresas con requerimientos únicos, alto volumen de interacciones o necesidades de integración a medida, ofrecemos planes Enterprise personalizados con acompañamiento estratégico y soporte dedicado.
            </p>
            <motion.a 
                href="#contacto-enterprise" // Enlace a sección o formulario de contacto
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.05, y: shouldReduceMotion ? 0 : -2 }}
                whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-semibold bg-gradient-to-r from-primary via-purple-500 to-secondary text-white hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 text-base"
            >
              Contactar para Plan Enterprise <ArrowRight size={18} />
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}
          className="mt-20 md:mt-28 max-w-4xl mx-auto"
        >
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Preguntas <span className="text-primary">Frecuentes</span>
            </h3>
            <p className="text-muted-foreground text-lg">Todo lo que necesitas saber sobre nuestros planes y precios.</p>
          </div>
          <div className="space-y-4">
            {faqsData.map((faq, index) => (
              <details key={index} className="group p-4 md:p-6 rounded-xl bg-dark-bg border border-white/10 hover:border-white/20 transition-colors duration-300 cursor-pointer">
                <summary className="flex justify-between items-center font-semibold text-base md:text-lg list-none">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <p className="text-muted-foreground/90 mt-3 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}