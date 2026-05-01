import { IconCheck, IconX, IconEdit, IconSparkle, IconArrowRight } from './icons';

export function Hero() {
  return (
    <section className="la-hero la-wrap">
      <div className="la-hero-l">
        <div className="la-eyebrow">
          <span className="dot" />
          Beta privada · LATAM 2026
          <span className="sep" />
          Cupos limitados
        </div>

        <h1 className="la-display">
          Tu <span className="k">equipo de ventas</span>{' '}
          en <span className="k">WhatsApp</span>,{' '}
          operado por <span className="k">IA</span>
        </h1>

        <hr className="la-rule" />

        <p className="la-sub">
          Responde con tu tono, califica intención en tiempo real y deja que tu equipo apruebe lo que importa.
        </p>

        <p className="la-aside" style={{ marginTop: 18, maxWidth: 460 }}>
          (Co-pilot o autopilot — tú decides hasta dónde llega.)
        </p>

        <div className="la-hero-ctas" style={{ marginTop: 36 }}>
          <a href="#waitlist" className="la-btn-gold lg">
            Unirme a la lista de espera
            <IconArrowRight style={{ width: 14, height: 14 }} />
          </a>
          <a href="#solucion" className="la-btn-ghost" style={{ height: 54, padding: '0 22px', fontSize: 11.5 }}>
            Ver cómo funciona
          </a>
        </div>

        <div className="la-hero-meta">
          <span><IconCheck className="check" /> Sin tarjeta</span>
          <span className="la-hero-meta-sep" />
          <span>Setup en <b>&lt; 10 min</b></span>
          <span className="la-hero-meta-sep" />
          <span>SOC 2 · GDPR</span>
        </div>
      </div>

      <div className="la-hero-visual" aria-hidden="true">
        <div className="la-hero-orb" />
        <div className="la-hero-streak" />

        <div className="la-float-card la-float-stat">
          <div className="la-float-stat-l">Aprobadas hoy</div>
          <div className="la-float-stat-v">
            184<span style={{ fontSize: 14, color: 'var(--ink-mute)', fontWeight: 500 }}> / 200</span>
          </div>
          <div className="la-float-stat-d">+92% sin intervención humana</div>
        </div>

        <div className="la-chat">
          <div className="la-chat-hd">
            <div className="la-chat-avatar">LM</div>
            <div className="la-chat-info">
              <div className="la-chat-name">Lucía Marín · 🇲🇽</div>
              <div className="la-chat-meta">
                <span className="wa" />
                WhatsApp Business · En línea
              </div>
            </div>
          </div>
          <div className="la-chat-thread">
            <div className="la-msg la-msg-them">¿Y la garantía cuánto dura?</div>
            <div className="la-msg la-msg-ai">
              <span className="la-msg-ai-tag">✦ Sugerencia IA</span>
              24 meses contra defectos de fábrica. ¿Procedemos con el envío para mañana?
            </div>
          </div>
          <div className="la-chat-foot">
            <div className="la-chat-conf">
              <div className="bar"><i style={{ width: '94%' }} /></div>
              94% confianza
            </div>
            <div className="la-chat-actions">
              <button title="Rechazar"><IconX style={{ width: 13, height: 13 }} /></button>
              <button title="Editar"><IconEdit style={{ width: 13, height: 13 }} /></button>
              <button className="ok" title="Aprobar"><IconCheck style={{ width: 13, height: 13 }} /></button>
            </div>
          </div>
        </div>

        <div className="la-float-card la-float-intent">
          <div className="row1">
            <IconSparkle className="sparkle" />
            Intención detectada
          </div>
          <div className="row2">Compra · alta urgencia</div>
          <div className="row3">
            <div className="barwrap"><i style={{ width: '94%' }} /></div>
            <span className="pct">94%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
