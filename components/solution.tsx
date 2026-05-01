import { IconSparkle, IconBolt, IconCheck } from './icons';

const STEPS = [
  { n: 1, t: 'Conectas WhatsApp Business', d: 'OAuth en menos de 2 minutos. Sin migrar números, sin perder historial.', meta: '✦ 2 min', done: true },
  { n: 2, t: 'Entrenas la IA con tu marca', d: 'Subes catálogo, políticas, FAQs. La IA aprende tu tono y tus reglas.', meta: '✦ 6 min', done: true },
  { n: 3, t: 'Eliges Co-pilot o Autopilot', d: 'Co-pilot pide aprobación. Autopilot opera sola. Tu equipo solo revisa lo escalado.', meta: '✦ 1 min', done: true },
  { n: 4, t: 'Tu equipo aprueba y cierra', d: 'Las conversaciones llegan ordenadas por intención. Lo caliente arriba, lo trivial resuelto solo.', meta: 'En vivo', done: false },
];

export function Solution() {
  return (
    <section id="solucion" className="la-section la-wrap">
      <div className="la-solution">
        <div>
          <div className="la-section-eyebrow">La solución</div>
          <h2 className="la-display-md">
            La <span className="k">IA</span> escribe. Tu <span className="k">equipo</span> decide.
          </h2>
          <hr className="la-rule" />
          <p className="la-sub" style={{ maxWidth: 480 }}>
            FlowAI no reemplaza a tu equipo de ventas. Los multiplica.
          </p>
          <p className="la-aside" style={{ marginTop: 14, maxWidth: 480 }}>
            (Cada mensaje recibe una respuesta sugerida, calibrada con tu catálogo, política y tono.)
          </p>
          <div className="la-bullet-list">
            <div className="la-bullet">
              <div className="la-bullet-mark">
                <IconSparkle style={{ width: 12, height: 12 }} />
              </div>
              <div>
                <b>Razonamiento transparente</b>
                <span>Cada sugerencia muestra de qué fuente salió y por qué. Auditas en un click.</span>
              </div>
            </div>
            <div className="la-bullet">
              <div className="la-bullet-mark">
                <IconBolt style={{ width: 12, height: 12 }} />
              </div>
              <div>
                <b>Co-pilot o Autopilot por canal</b>
                <span>Soporte en autopilot. Ventas premium en co-pilot. Tú defines la regla, no la IA.</span>
              </div>
            </div>
            <div className="la-bullet">
              <div className="la-bullet-mark">
                <IconCheck style={{ width: 12, height: 12 }} />
              </div>
              <div>
                <b>Compliance enterprise</b>
                <span>SOC 2 Type II, GDPR, datos en LATAM. Sin entrenamientos cruzados con otras marcas.</span>
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
