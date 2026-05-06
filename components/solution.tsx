import { IconSparkle, IconBolt, IconCheck } from './icons';

const STEPS = [
  { n: 1, t: 'Conectas WhatsApp Business', d: 'OAuth en menos de 2 minutos. Sin migrar números, sin perder historial.', meta: '✦ 2 min', done: true },
  { n: 2, t: 'Cargas tus servicios, tarifas y condiciones comerciales', d: 'La IA entiende tus precios, plazos de entrega y restricciones operativas. Sin fórmulas, sin código.', meta: '✦ 6 min', done: true },
  { n: 3, t: 'Eliges Co-pilot o Autopilot', d: 'Co-pilot pide aprobación. Autopilot opera sola. Tú decides qué tipo de solicitud se automatiza.', meta: '✦ 1 min', done: true },
  { n: 4, t: 'Apruebas, ajustas y envías', d: 'Las cotizaciones llegan listas, ordenadas por urgencia. Revisas, ajustas si hace falta y las envías con tu firma.', meta: 'En vivo', done: false },
];

export function Solution() {
  return (
    <section id="solucion" className="la-section la-wrap">
      <div className="la-solution">
        <div>
          <div className="la-section-eyebrow">La solución</div>
          <h2 className="la-display-md">
            La <span className="k">IA</span> cotiza.<br />
            Tú apruebas<br />
            y <span className="k">firmas</span>.
          </h2>
          <hr className="la-rule" />
          <p className="la-sub" style={{ maxWidth: 480 }}>
            FlowAI no reemplaza tu juicio<br />
            comercial. Lo libera para lo que importa.
          </p>
          <p className="la-aside" style={{ marginTop: 14, maxWidth: 480 }}>
            (Cada solicitud recibe una cotización preparada, calibrada con tus tarifas y condiciones reales.)
          </p>
          <div className="la-bullet-list">
            <div className="la-bullet">
              <div className="la-bullet-mark">
                <IconSparkle style={{ width: 12, height: 12 }} />
              </div>
              <div>
                <b>Razonamiento transparente</b>
                <span>Cada cotización cita la tarifa exacta que usó y por qué. Sabes de dónde sale cada número antes de aprobar.</span>
              </div>
            </div>
            <div className="la-bullet">
              <div className="la-bullet-mark">
                <IconBolt style={{ width: 12, height: 12 }} />
              </div>
              <div>
                <b>Co-pilot o Autopilot por tipo de solicitud</b>
                <span>Solicitudes simples en autopilot. Cotizaciones complejas en co-pilot. Tú defines la regla, no la IA.</span>
              </div>
            </div>
            <div className="la-bullet">
              <div className="la-bullet-mark">
                <IconCheck style={{ width: 12, height: 12 }} />
              </div>
              <div>
                <b>Compliance enterprise</b>
                <span>SOC 2 Type II, GDPR, datos en LATAM. Sin entrenamientos cruzados con otros proveedores.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="la-flow">
          {STEPS.map((s) => (
            <div key={s.n} className="la-flow-step">
              <div className={`la-flow-step-num${s.done ? ' done' : ''}`}>
                {s.done ? <IconCheck style={{ width: 13, height: 13 }} /> : s.n}
              </div>
              <div className="la-flow-step-body">
                <div className="la-flow-step-title">{s.t}</div>
                <div className="la-flow-step-detail">{s.d}</div>
                <div className="la-flow-step-meta">{s.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
