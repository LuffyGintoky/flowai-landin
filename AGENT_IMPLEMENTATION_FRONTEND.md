# AGENT_IMPLEMENTATION_FRONTEND.md – Implementación técnica del Frontend

## 🎯 Objetivo

Construir la landing page oficial de la plataforma de automatización conversacional con IA, basada en el diseño definido en `AGENT_FDESIGN_FRONTEND.md`. Debe ser completamente responsive, accesible, rápida y estéticamente coherente con un estilo oscuro, técnico y moderno.

---

## 🧱 Stack tecnológico

- ✅ Framework: [Next.js](https://nextjs.org/) (App Router)
- ✅ CSS: [Tailwind CSS v4](https://tailwindcss.com/) con configuración `dark` por defecto
- ✅ UI: [shadcn/ui](https://ui.shadcn.com/) para botones, tabs, modales
- ✅ Animaciones: [Framer Motion](https://www.framer.com/motion/)
- ✅ Iconografía: [Lucide-react](https://lucide.dev/icons/)
- ✅ Hosting: Vercel

---

## 🗂️ Estructura de carpetas recomendada

app/
├── layout.tsx # Layout general (navbar + footer)
├── page.tsx # Landing principal
├── sections/ # Secciones individuales como componentes
│ ├── Hero.tsx
│ ├── Benefits.tsx
│ ├── WorkflowDiagram.tsx
│ ├── UseCases.tsx
│ ├── Integrations.tsx
│ ├── Pricing.tsx
│ ├── CTA.tsx
│ └── Footer.tsx
components/
├── ui/ # Componentes base reusables (botones, cards, etc.)
lib/
├── animations.ts # Configuración de framer motion
├── utils.ts # Utilidades (conversor CLP/USD, etc.)
public/
├── images/ # Ilustraciones, íconos, etc.
styles/
├── globals.css
tailwind.config.ts


---

## 📌 Requisitos clave por sección

### `Hero.tsx`
- Título + subtítulo
- Botón CTA con animación (pulse o hover-glow)
- Ilustración SVG o animación (diagrama de flujo animado)
- Fondo con gradiente o fondo glow

### `Benefits.tsx`
- Tarjetas con íconos, textos cortos
- Hover: `scale-105`, sombra suave y glow
- Alinear a mobile/tablet con `grid-cols` adaptables

### `WorkflowDiagram.tsx`
- Diagrama animado de flujo (SVG o JSX puro)
- Conexiones animadas al hover con Framer Motion
- Scroll Reveal

### `UseCases.tsx`
- Tarjetas de industria
- Fondo por color de rubro
- Hover: tilt leve (transform 3D)

### `Integrations.tsx`
- Mosaico de logos (SVG)
- Hover: glowing border
- Reutilizable para futuras integraciones

### `Pricing.tsx`
- 3 tarjetas con planes
- Botón destacado en plan recomendado
- Toggle visual para CLP/USD
- Glow y microinteracciones

### `CTA.tsx`
- Frase final potente
- Fondo llamativo
- Botón vibrante con animación

### `Footer.tsx`
- Links a términos, contacto, redes
- Estilo técnico y sobrio
- Contraste alto para accesibilidad

---

## 🧪 Accesibilidad y buenas prácticas

- Uso correcto de `aria-labels` en botones y links
- Contraste suficiente de colores (WCAG AA mínimo)
- Tipografía legible y adaptable
- Animaciones opcionales o respetuosas con `prefers-reduced-motion`

---

## 🧰 Dependencias a instalar

```bash
npm install tailwindcss lucide-react framer-motion clsx shadcn/ui
✅ Checklist de implementación técnica
 Tipografía cargada globalmente desde Google Fonts

 Dark mode habilitado y forzado en Tailwind config

 Animaciones definidas en archivo central animations.ts

 Secciones importadas modularmente en page.tsx

 Todos los textos en español (editable desde archivo JSON si se planea multilenguaje)

 Componentes preparados para mobile-first

