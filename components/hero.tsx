import { IconCheck, IconX, IconEdit, IconSparkle, IconArrowRight } from './icons';

export function Hero() {
  return (
    <section className="la-hero la-wrap">
      <div className="la-hero-l">
        <div className="la-eyebrow">
          <span className="dot" />
          Piloto privado · Norte de Chile
          <span className="sep" />
          Cupos limitados
        </div>

        <h1 className="la-display">
          Tus cotizaciones<br />
          <span className="k">respondidas a tiempo</span>,<br />
          aunque estés en <span className="k">faena</span>.
        </h1>

        <hr className="la-rule" />

        <p className="la-sub">
          El agente cotiza según tus tarifas,<br />
          responde con tu tono y te avisa<br />
          cuando necesita que apruebas.
        </p>

        <p className="la-aside" style={{ marginTop: 18, maxWidth: 460 }}>
          (Co-pilot o autopilot — tú decides cuándo intervenir.)
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
          <div className="la-float-stat-l">Cotizaciones enviadas hoy</div>
          <div className="la-float-stat-v">
            5<span style={{ fontSize: 14, color: 'var(--ink-mute)', fontWeight: 500 }}> / 5</span>
          </div>
          <div className="la-float-stat-d">El dueño estaba en faena</div>
        </div>

        <div className="la-chat">
          <div className="la-chat-hd">
            <div className="la-chat-avatar">PS</div>
            <div className="la-chat-info">
              <div className="la-chat-name">Pedro Sandoval · 🇨🇱</div>
              <div className="la-chat-meta">
                <span className="wa" />
                WhatsApp Business · En línea
              </div>
            </div>
          </div>
          <div className="la-chat-thread">
            <div className="la-msg la-msg-them">¿Tienen disponibilidad para catering de 80 personas desde el lunes en faena norte?</div>
            <div className="la-msg la-msg-ai">
              <span className="la-msg-ai-tag">✦ Sugerencia IA</span>
              Confirmamos disponibilidad para 80 personas desde el lunes. Le preparamos la cotización con traslado incluido. ¿Le enviamos la propuesta hoy?
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
            Solicitud detectada
          </div>
          <div className="row2">Cotización urgente · faena</div>
          <div className="row3">
            <div className="barwrap"><i style={{ width: '94%' }} /></div>
            <span className="pct">94%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
