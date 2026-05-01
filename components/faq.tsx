'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: '¿Funciona con mi número de WhatsApp actual?',
    a: 'Sí. Migramos tu número existente a WhatsApp Business API sin cambiar el número ni perder el historial de conversaciones. El proceso tarda menos de 24 horas.',
  },
  {
    q: '¿Qué pasa con las conversaciones que ya tengo abiertas?',
    a: 'No se interrumpen. Durante la migración las conversaciones activas siguen disponibles, y una vez conectado FlowAI, todo el historial previo queda accesible desde el inbox.',
  },
  {
    q: '¿El número de WhatsApp es mío o de FlowAI?',
    a: 'Es 100% tuyo. FlowAI actúa como Business Solution Provider (BSP) de Meta, lo que nos permite conectar tu número a nuestra plataforma sin que pierdas la propiedad ni el control.',
  },
  {
    q: '¿Cómo aprende la IA mi tono y mis productos?',
    a: 'Subes tu catálogo, políticas de garantía, FAQs y ejemplos de conversaciones que cerraron bien. La IA usa esa base para generar respuestas alineadas con tu marca — sin mezclar información de otros clientes.',
  },
  {
    q: '¿Puedo usar FlowAI sin automatizar nada todavía?',
    a: 'Sí. El modo Co-pilot es exactamente eso: la IA sugiere, tu equipo decide. Ningún mensaje sale sin aprobación humana. Puedes activar Autopilot por canal cuando estés listo.',
  },
  {
    q: '¿Mis datos se usan para entrenar modelos de terceros?',
    a: 'No. Tus conversaciones, catálogo y datos de clientes son exclusivamente tuyos. Nunca se usan para entrenar modelos compartidos ni se acceden fuera del procesamiento de tus propias respuestas.',
  },
  {
    q: '¿Qué pasa si supero el límite de chats del plan Starter?',
    a: 'Te notificamos antes de llegar al límite. Puedes hacer upgrade en cualquier momento desde la plataforma, sin perder conversaciones ni historial.',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="la-section la-wrap">
      <div className="la-section-head center" style={{ textAlign: 'center' }}>
        <div className="la-section-eyebrow" style={{ justifyContent: 'center' }}>Preguntas frecuentes</div>
        <h2 className="la-display-md">
          Todo lo que quieres saber antes de <span className="k">empezar</span>.
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
