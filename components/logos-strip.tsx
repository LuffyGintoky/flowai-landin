const LOGOS = [
  { name: 'Catering Industrial', glyph: 'CI' },
  { name: 'Lavandería', glyph: 'LV' },
  { name: 'Transporte de Personal', glyph: 'TP' },
  { name: 'Limpieza Industrial', glyph: 'LI' },
  { name: 'Servicios Especializados', glyph: 'SE' },
  { name: 'Mantención', glyph: 'MN' },
];

export function LogosStrip() {
  return (
    <section className="la-logos">
      <div className="la-wrap la-logos-inner">
        <div className="la-logos-label">Diseñado para proveedores del norte de Chile</div>
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
