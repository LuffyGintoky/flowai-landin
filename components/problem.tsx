const PAINS = [
  {
    num: 'Problema 01',
    title: 'WhatsApp se llena, el equipo se quema',
    body: 'El 70% de los leads llega por WhatsApp y la mayoría no se contesta en menos de una hora. Cada minuto es una venta que se enfría.',
    quote: 'Teníamos 400 chats abiertos. Mi equipo respondía hasta las 11 pm y aún así perdíamos clientes.',
    author: 'Carlos V.',
    role: 'Fundador · Muebles Bruma, Medellín',
  },
  {
    num: 'Problema 02',
    title: 'Bots genéricos que apagan la marca',
    body: 'Los chatbots clásicos hablan como FAQ. Tus clientes lo notan. La conversión cae, la confianza también.',
    quote: 'Probamos tres bots. Todos sonaban igual. Ninguno cerraba la venta.',
    author: 'Mariana R.',
    role: 'Directora Comercial · Tienda Nómada, CDMX',
  },
  {
    num: 'Problema 03',
    title: 'Sin visibilidad de qué calienta y qué enfría',
    body: 'Sin clasificar intención ni medir el funnel en WhatsApp, vuelas a ciegas. ¿Qué leads cerrar primero? Imposible saberlo.',
    quote: 'No teníamos forma de saber qué cliente estaba a punto de comprar y cuál solo curioseaba.',
    author: 'Diego A.',
    role: 'CEO · Agencia Raíz, Santiago',
  },
];

export function Problem() {
  return (
    <section id="problema" className="la-section la-wrap">
      <div className="la-section-head">
        <div className="la-section-eyebrow">El dolor que ya conoces</div>
        <h2 className="la-display-md">
          Tu <span className="k">CRM</span> no fue construido para <span className="k">WhatsApp</span>.
        </h2>
        <hr className="la-rule" />
        <p className="la-sub" style={{ maxWidth: 620 }}>
          Tampoco para vender con IA.
        </p>
        <p className="la-aside" style={{ marginTop: 14, maxWidth: 600 }}>
          (Los equipos que más facturan en LATAM viven en chats. Sus herramientas viven en pestañas.)
        </p>
      </div>
      <div className="la-problem-grid">
        {PAINS.map((p) => (
          <div key={p.num} className="la-pain">
            <div className="la-pain-num">{p.num}</div>
            <div className="la-pain-title">{p.title}</div>
            <div className="la-pain-body">{p.body}</div>
            <div className="la-pain-quote">
              <p style={{ margin: '0 0 10px' }}>{p.quote}</p>
              <div className="la-pain-author">
                <span className="la-pain-author-name">{p.author}</span>
                <span className="la-pain-author-role">{p.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
