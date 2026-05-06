const FOUNDERS = [
  {
    initials: 'DB',
    name: 'Dani Bascuñán',
    role: 'Fundador · Shinsekai',
    bio: 'Fundador de Shinsekai, empresa de ingeniería y desarrollo de software en Antofagasta. Años trabajando con empresas del norte de Chile en automatización de procesos industriales y herramientas digitales. Construyó FlowAI al ver de primera mano cómo los proveedores mineros pierden contratos valiosos por no contar con las herramientas correctas.',
    linkedin: 'https://www.shinsekai.cl/',
    color: '#1a3a5c',
  },
  {
    initials: 'EI',
    name: 'Equipo de ingeniería',
    role: 'Antofagasta · Chile',
    bio: 'Ingenieros con experiencia en automatización de procesos, sistemas de mensajería y desarrollo de software para industria. Construimos herramientas para el norte de Chile — no plantillas genéricas adaptadas.',
    linkedin: 'https://www.shinsekai.cl/',
    color: '#2a2a4a',
  },
];

export function Founders() {
  return (
    <section className="la-section la-wrap">
      <div className="la-section-head center" style={{ textAlign: 'center' }}>
        <div className="la-section-eyebrow" style={{ justifyContent: 'center' }}>El equipo</div>
        <h2 className="la-display-md">
          Construido por gente que<br />
          <span className="k">conoce el norte</span>.
        </h2>
        <hr className="la-rule center" />
        <p className="la-sub" style={{ margin: '0 auto', maxWidth: 580 }}>
          No somos una consultora de IA. Somos ingenieros de Antofagasta que entienden cómo opera la industria minera y sus proveedores.
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
              Shinsekai →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
