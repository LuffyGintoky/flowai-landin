const FOUNDERS = [
  {
    initials: 'AM',
    name: 'Alejandro Mora',
    role: 'CEO & Co-founder',
    bio: '10 años construyendo equipos de ventas en LATAM. Ex-director comercial en dos scale-ups con salida. Obsesionado con por qué los equipos pierden ventas por no responder a tiempo.',
    linkedin: '#',
    color: '#1a3a5c',
  },
  {
    initials: 'VS',
    name: 'Valentina Soto',
    role: 'CTO & Co-founder',
    bio: 'Ingeniera de sistemas con 8 años en ML aplicado a NLP. Construyó sistemas de detección de intención para e-commerce con millones de transacciones mensuales.',
    linkedin: '#',
    color: '#2a2a4a',
  },
  {
    initials: 'RQ',
    name: 'Rodrigo Quiroga',
    role: 'CPO & Co-founder',
    bio: 'Ex-product manager en HubSpot LATAM. Diseñó flujos de CRM para más de 200 equipos de ventas en México, Colombia y Chile. Entiende el caos del WhatsApp mejor que nadie.',
    linkedin: '#',
    color: '#1a3330',
  },
];

export function Founders() {
  return (
    <section className="la-section la-wrap">
      <div className="la-section-head center" style={{ textAlign: 'center' }}>
        <div className="la-section-eyebrow" style={{ justifyContent: 'center' }}>El equipo</div>
        <h2 className="la-display-md">
          Construido por gente que <span className="k">vivió el problema</span>.
        </h2>
        <hr className="la-rule center" />
        <p className="la-sub" style={{ margin: '0 auto', maxWidth: 580 }}>
          No somos una consultora de IA. Somos un equipo que perdió ventas por WhatsApp
          y decidió resolver el problema de raíz.
        </p>
      </div>
      <div className="la-founders-grid">
        {FOUNDERS.map((f) => (
          <div key={f.name} className="la-founder">
            <div className="la-founder-avatar" style={{ background: `linear-gradient(135deg, ${f.color}, #050d1a)` }}>
              {f.initials}
            </div>
            <div className="la-founder-name">{f.name}</div>
            <div className="la-founder-role">{f.role}</div>
            <p className="la-founder-bio">{f.bio}</p>
            <a href={f.linkedin} className="la-founder-linkedin" target="_blank" rel="noopener noreferrer">
              LinkedIn →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
