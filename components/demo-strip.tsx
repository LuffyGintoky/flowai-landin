const BARS = [42, 58, 51, 72, 68, 84, 78, 91, 88, 96];

function DemoChart() {
  return (
    <div style={{ background: 'rgba(5,13,26,.7)', border: '1px solid var(--line-2)', borderRadius: 12, padding: 24, backdropFilter: 'blur(20px)', boxShadow: '0 30px 60px rgba(0,0,0,.4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--ink-mute)' }}>
            Tasa de aprobación IA
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: 'white', marginTop: 6, letterSpacing: '-0.02em' }}>
            96<span style={{ color: 'var(--gold)', fontSize: 20 }}>%</span>
          </div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--green)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em' }}>
          ↑ +14 pts
        </div>
      </div>
      <svg viewBox="0 0 320 100" style={{ width: '100%', height: 100 }}>
        <defs>
          <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6c98c" stopOpacity=".95" />
            <stop offset="1" stopColor="#c8a97e" stopOpacity=".15" />
          </linearGradient>
        </defs>
        {BARS.map((b, i) => {
          const x = 8 + i * 30;
          const h = b * 0.85;
          return (
            <rect key={i} x={x} y={100 - h} width={20} height={h} rx={2}
              fill="url(#bar-grad)" stroke="rgba(200,169,126,.4)" strokeWidth=".5" />
          );
        })}
        <polyline
          fill="none" stroke="#e6c98c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
          points={BARS.map((b, i) => `${18 + i * 30},${100 - b * 0.85 - 3}`).join(' ')}
          style={{ filter: 'drop-shadow(0 0 4px rgba(230,201,140,.7))' }}
        />
        {BARS.map((b, i) => (
          <circle key={i} cx={18 + i * 30} cy={100 - b * 0.85 - 3} r="2.2" fill="#e6c98c" />
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 9.5, color: 'var(--ink-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em' }}>
        <span>Día 1</span><span>15</span><span>30</span><span>45</span><span>Día 60</span>
      </div>
    </div>
  );
}

export function DemoStrip() {
  return (
    <section className="la-section la-wrap" style={{ paddingTop: 0 }}>
      <div className="la-demo">
        <div className="la-demo-l">
          <div className="la-section-eyebrow">Resultados reales</div>
          <h3>
            De <span style={{ color: 'var(--gold)' }}>4 horas/día</span><br />
            en WhatsApp,<br />
            a <em>40 minutos</em>
          </h3>
          <hr className="la-rule" />
          <p className="la-body" style={{ marginTop: 0 }}>
            Beta privada con 12 marcas en México y Colombia.
          </p>
          <p className="la-aside" style={{ marginTop: 8 }}>
            (Promedio tras 60 días operando con FlowAI en producción.)
          </p>
          <div className="la-demo-stats">
            <div className="la-demo-stat"><b>3.2<em>×</em></b><span>Conversión</span></div>
            <div className="la-demo-stat"><b>92<em>%</em></b><span>Auto-resueltos</span></div>
            <div className="la-demo-stat"><b>1m 42s</b><span>SLA</span></div>
          </div>
        </div>
        <div className="la-demo-r">
          <DemoChart />
        </div>
      </div>
    </section>
  );
}
