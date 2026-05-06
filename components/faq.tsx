'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: '¿Funciona con mi número de WhatsApp actual?',
    a: 'Sí. Migramos tu número existente a WhatsApp Business API sin cambiar el número ni perder el historial de conversaciones. El proceso tarda menos de 24 horas.',
  },
  {
    q: '¿Qué pasa con las solicitudes y cotizaciones que ya tengo abiertas?',
    a: 'No se interrumpen. Durante la migración las conversaciones activas siguen disponibles, y una vez conectado FlowAI, todo el historial previo queda accesible desde el inbox.',
  },
  {
    q: '¿El número de WhatsApp es mío o de FlowAI?',
    a: 'Es 100% tuyo. FlowAI actúa como Business Solution Provider (BSP) de Meta, lo que nos permite conectar tu número a nuestra plataforma sin que pierdas la propiedad ni el control.',
  },
  {
    q: '¿Cómo aprende la IA mis servicios, tarifas y condiciones comerciales?',
    a: 'Cargas tus servicios, tarifas vigentes, plazos de entrega y condiciones contractuales. La IA usa esa base para generar cotizaciones alineadas con tu oferta real — sin mezclar información de otros proveedores.',
  },
  {
    q: '¿Funciona para cotizaciones técnicas con especificaciones complejas?',
    a: 'Sí. Puedes cargar fichas técnicas, especificaciones de servicio y requisitos por tipo de faena. La IA utiliza ese contexto para generar cotizaciones detalladas y consistentes con tu oferta técnica real.',
  },
  {
    q: '¿Puedo usarlo si mis clientes son mineras grandes con procesos de compra formales?',
    a: 'Sí. FlowAI gestiona el canal WhatsApp, que es donde suelen llegar las solicitudes iniciales aunque el proceso de compra sea formal. La cotización sale profesional y documentada, lista para el proceso de adjudicación.',
  },
  {
    q: '¿Puedo usar FlowAI sin automatizar nada todavía?',
    a: 'Sí. El modo Co-pilot es exactamente eso: la IA genera la cotización, pero ningún mensaje sale sin que tú lo apruebas primero. Puedes activar Autopilot por tipo de solicitud cuando estés listo.',
  },
  {
    q: '¿Mis datos y cotizaciones se comparten con terceros?',
    a: 'No. Tus conversaciones, tarifas, condiciones comerciales y datos de clientes son exclusivamente tuyos. Nunca se usan para entrenar modelos compartidos ni se acceden fuera del procesamiento de tus propias solicitudes.',
  },
  {
    q: '¿Qué pasa si supero el límite de solicitudes del plan Starter?',
    a: 'Te notificamos antes de llegar al límite. Puedes hacer upgrade en cualquier momento desde la plataforma, sin perder cotizaciones ni historial.',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="la-section la-wrap">
      <div className="la-section-head center" style={{ textAlign: 'center' }}>
        <div className="la-section-eyebrow" style={{ justifyContent: 'center' }}>Preguntas frecuentes</div>
        <h2 className="la-display-md">
          Todo lo que quieres saber<br />
          antes de <span className="k">empezar</span>.
        </h2>
        <hr className="la-rule center" />
      </div>
      <div className="la-faq-list">
        {FAQS.map((item, i) => (
          <div key={i} className={`la-faq-item${open === i ? ' is-open' : ''}`}>
            <button
              className="la-faq-q"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span>{item.q}</span>
              <span className="la-faq-icon">{open === i ? '−' : '+'}</span>
            </button>
            <div className={`la-faq-a${open === i ? ' is-open' : ''}`}>
              <div className="la-faq-a-inner">{item.a}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <p className="la-aside">
          ¿Tienes otra pregunta?{' '}
          <a href="mailto:contacto@flowai.cl" style={{ color: 'var(--gold)', borderBottom: '1px solid color-mix(in oklab, var(--gold) 40%, transparent)' }}>
            Escríbenos directo
          </a>.
        </p>
      </div>
    </section>
  );
}
