const LOGOS = [
  { name: 'Pulse', glyph: 'P' },
  { name: 'Norte', glyph: 'N' },
  { name: 'Coyote', glyph: 'C' },
  { name: 'Mareas', glyph: 'M' },
  { name: 'Adobe Studio', glyph: 'AS' },
  { name: 'Ríos & Cía', glyph: 'R&' },
];

export function LogosStrip() {
  return (
    <section className="la-logos">
      <div className="la-wrap la-logos-inner">
        <div className="la-logos-label">Equipos LATAM ya operan con FlowAI</div>
        <div className="la-logos-row">
          {LOGOS.map((it) => (
            <span key={it.name} className="la-logos-item">
              <span className="glyph">{it.glyph}</span>
              {it.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
