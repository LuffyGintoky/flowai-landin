import { Variants } from "framer-motion";

// Animaciones para elementos que aparecen al hacer scroll
export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Animación para tarjetas con efecto de escala
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Animación para líneas de conexión en diagramas
export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" }
  }
};

// Animación para botones con efecto pulse
export const pulseAnimation: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    boxShadow: [
      "0 0 0 0 rgba(94, 247, 166, 0.4)",
      "0 0 0 10px rgba(94, 247, 166, 0)",
      "0 0 0 0 rgba(94, 247, 166, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Animación para hover en tarjetas
export const hoverCard = {
  rest: { 
    scale: 1,
    boxShadow: "0 0 0 rgba(94, 247, 166, 0)"
  },
  hover: { 
    scale: 1.05,
    boxShadow: "0 0 20px rgba(94, 247, 166, 0.5)"
  }
};

// Animación para entrada escalonada de elementos
export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});
