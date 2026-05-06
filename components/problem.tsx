const PAINS = [
  {
    num: 'Problema 01',
    title: 'La minera no espera',
    body: 'Una solicitud de cotización llega por WhatsApp. Si no respondes en 30 minutos, el encargado de abastecimiento llama a otro proveedor. El contrato se va sin que te enteres.',
    quote: 'Me llegó un WhatsApp a las 7 de la mañana un sábado. Cuando lo vi el lunes ya habían adjudicado a la competencia.',
    author: 'Proveedor de servicios',
    role: 'Catering industrial · Norte de Chile',
  },
  {
    num: 'Problema 02',
    title: 'Una cotización mal respondida no tiene segunda vuelta',
    body: 'Si mandas precios equivocados, condiciones que no aplican o un tono que no transmite seriedad técnica, la minera no vuelve a cotizar contigo. La relación se daña en segundos.',
    quote: 'Le enviamos una cotización con los precios de la temporada anterior. Nos quedamos fuera de la licitación y no nos volvieron a llamar.',
    author: 'Gerente comercial',
    role: 'Empresa de limpieza industrial · Calama',
  },
  {
    num: 'Problema 03',
    title: 'No sabes cuál urgencia atender primero',
    body: 'Con varias solicitudes abiertas al mismo tiempo, es imposible saber cuál faena necesita respuesta ahora y cuál puede esperar. Priorizas mal y pierdes el contrato que importaba.',
    quote: 'Estaba apagando tres incendios a la vez. Le respondí primero al cliente más insistente, no al más valioso. Así perdimos el contrato que más nos convenía.',
    author: 'Dueño de empresa',
    role: 'Transporte de personal · Antofagasta',
  },
];

export function Problem() {
  return (
    <section id="problema" className="la-section la-wrap">
      <div className="la-section-head">
        <div className="la-section-eyebrow">El dolor que ya conoces</div>
        <h2 className="la-display-md">
          Tu próxima <span className="k">cotización</span><br />
          puede irse sin<br />
          que te <span className="k">enteres</span>.
        </h2>
        <hr className="la-rule" />
        <p className="la-sub" style={{ maxWidth: 620 }}>
          Si no respondes en 30 minutos, la minera llama a otro.
        </p>
        <p className="la-aside" style={{ marginTop: 14, maxWidth: 600 }}>
          (En el norte, la adjudicación va para quien responde primero y bien.)
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
