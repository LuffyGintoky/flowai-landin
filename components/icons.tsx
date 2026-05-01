import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function FlowAILogo(props: IconProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" {...props}>
      <defs>
        <linearGradient id="fl-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a6fa8" />
          <stop offset=".5" stopColor="#1a3a5c" />
          <stop offset="1" stopColor="#0d1e30" />
        </linearGradient>
        <linearGradient id="fl-b" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#d8c9a8" />
          <stop offset="1" stopColor="#8a7a55" />
        </linearGradient>
      </defs>
      <path d="M30 25 C 60 5, 95 25, 95 55 C 95 75, 70 80, 55 75" stroke="url(#fl-a)" strokeWidth="14" strokeLinecap="round" fill="none"/>
      <path d="M65 45 C 80 50, 90 70, 90 95 C 60 115, 25 95, 25 65 C 25 50, 45 45, 60 50" stroke="url(#fl-a)" strokeWidth="14" strokeLinecap="round" fill="none"/>
      <path d="M30 25 C 55 12, 80 25, 88 45" stroke="url(#fl-b)" strokeWidth="1.5" fill="none" opacity=".75"/>
      <path d="M30 75 C 55 95, 80 90, 88 65" stroke="url(#fl-b)" strokeWidth="1.5" fill="none" opacity=".55"/>
    </svg>
  );
}

export const IconCheck = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m3 8.5 3.2 3L13 4.5"/>
  </svg>
);

export const IconX = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
    <path d="m4 4 8 8M12 4l-8 8"/>
  </svg>
);

export const IconEdit = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M11 2.5 13.5 5 5 13.5H2.5V11L11 2.5zM9.5 4l2.5 2.5"/>
  </svg>
);

export const IconSparkle = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M8 2v3M8 11v3M2 8h3M11 8h3M4 4l2 2M10 10l2 2M12 4l-2 2M6 10l-2 2"/>
  </svg>
);

export const IconBolt = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" {...p}>
    <path d="M9 1.5 3 9.5h4l-1 5 6-8H8l1-5z"/>
  </svg>
);

export const IconWhatsApp = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="currentColor" {...p}>
    <path d="M8 1.3a6.7 6.7 0 0 0-5.7 10.2L1.3 14.7l3.3-1A6.7 6.7 0 1 0 8 1.3zm0 12.1a5.4 5.4 0 0 1-2.7-.7l-.2-.1-2 .6.6-1.9-.2-.2A5.4 5.4 0 1 1 8 13.4zm3-4c-.2-.1-1-.5-1.1-.5-.2-.1-.3-.1-.4.1l-.5.6c-.1.1-.2.1-.4 0a4.4 4.4 0 0 1-2.2-1.9c-.2-.3.2-.3.4-1 0-.1 0-.2 0-.3l-.5-1.2c-.1-.3-.3-.3-.4-.3h-.3c-.1 0-.3 0-.5.2-.2.2-.6.6-.6 1.4 0 .9.6 1.7.7 1.8.1.1 1.3 2 3.1 2.8 1.2.5 1.6.5 2.2.5.4 0 1-.4 1.2-.8.1-.4.1-.8.1-.8 0 0-.2-.1-.3-.2z"/>
  </svg>
);

export const IconPipeline = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" {...p}>
    <rect x="2" y="3" width="3" height="10" rx="1"/>
    <rect x="6.5" y="3" width="3" height="7" rx="1"/>
    <rect x="11" y="3" width="3" height="4" rx="1"/>
  </svg>
);

export const IconChart = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M2 13h12M4 11V8M7 11V5M10 11V7M13 11V3"/>
  </svg>
);

export const IconMail = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="3.5" width="12" height="9" rx="1.5"/>
    <path d="m2.5 4.5 5.5 4 5.5-4"/>
  </svg>
);

export const IconUser = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" {...p}>
    <circle cx="8" cy="5.5" r="2.5"/>
    <path d="M3 13c.8-2.3 2.8-3.5 5-3.5s4.2 1.2 5 3.5"/>
  </svg>
);

export const IconBuilding = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M2.5 14V3.5l5-1.5v12M7.5 14V6l5 1.5V14M2.5 14h11M5 6h0M5 8.5h0M5 11h0M9.5 9h0M9.5 11h0"/>
  </svg>
);

export const IconGlobe = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
    <circle cx="8" cy="8" r="6"/>
    <path d="M2 8h12M8 2c2 2 2 10 0 12M8 2c-2 2-2 10 0 12"/>
  </svg>
);

export const IconArrowRight = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 8h10M9 4l4 4-4 4"/>
  </svg>
);

export const TwitterX = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="currentColor" {...p}>
    <path d="M11.6 2h2.2L9.1 7.5 14.5 14h-4.3L7.2 10.4 3.8 14H1.6l5-5.7L1 2h4.4l2.7 3.5L11.6 2zm-.8 11h1.2L4.6 3H3.3l7.5 10z"/>
  </svg>
);

export const Linkedin = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="currentColor" {...p}>
    <path d="M3.3 2A1.3 1.3 0 1 0 3.3 4.6 1.3 1.3 0 0 0 3.3 2zM2.1 5.7h2.4V14H2.1V5.7zm4 0h2.3v1.1h.1c.3-.6 1.1-1.2 2.3-1.2 2.4 0 2.9 1.6 2.9 3.6V14h-2.4V9.6c0-1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V14H6V5.7z"/>
  </svg>
);

export const Youtube = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="currentColor" {...p}>
    <path d="M14.7 4.5a1.7 1.7 0 0 0-1.2-1.2C12.4 3 8 3 8 3s-4.4 0-5.5.3a1.7 1.7 0 0 0-1.2 1.2A18 18 0 0 0 1 8a18 18 0 0 0 .3 3.5 1.7 1.7 0 0 0 1.2 1.2C3.6 13 8 13 8 13s4.4 0 5.5-.3a1.7 1.7 0 0 0 1.2-1.2A18 18 0 0 0 15 8a18 18 0 0 0-.3-3.5zM6.6 10.1V5.9L10.4 8l-3.8 2.1z"/>
  </svg>
);
