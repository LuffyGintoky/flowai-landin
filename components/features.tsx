import { IconWhatsApp, IconSparkle, IconPipeline, IconCheck, IconChart, IconBolt } from './icons';

const FEATS = [
  {
    icon: <IconWhatsApp style={{ width: 18, height: 18 }} />,
    title: 'Inbox nativo de WhatsApp',
    body: 'Multiagente, plantillas oficiales y multimedia. Encuentra cualquier conversación aunque no recuerdes las palabras exactas.',
    chips: ['WhatsApp Business API', 'Multiagente', 'Plantillas oficiales'],
    gold: false,
  },
  {
    icon: <IconSparkle style={{ width: 18, height: 18 }} />,
    title: 'IA con razonamiento auditable',
    body: 'Cada respuesta cita su fuente, muestra confianza y permite ver el razonamiento. Nada de cajas negras.',
    chips: ['Confianza por respuesta', 'Citas y fuentes', 'Modelos best-in-class'],
    gold: true,
  },
  {
    icon: <IconPipeline style={{ width: 18, height: 18 }} />,
    title: 'Pipeline en tiempo real',
    body: 'Cada chat se clasifica por intención y etapa de funnel automáticamente. Lo caliente sube.',
    chips: ['Detección de intención', 'Funnel auto', 'Próxima acción IA'],
    gold: false,
  },
  {
    icon: <IconCheck style={{ width: 18, height: 18 }} />,
    title: 'Approval workflow',
    body: 'Aprobar, editar o rechazar con teclado. Atajos como Linear. Cierra el doble en la mitad de tiempo.',
    chips: ['⌘↵ Aprobar', 'Edición rápida', 'Auditoría'],
    gold: false,
  },
  {
    icon: <IconChart style={{ width: 18, height: 18 }} />,
    title: 'Analytics que importan',
    body: 'SLA, tasa de aprobación IA, conversión por intención y agente. Sin dashboards de relleno.',
    chips: ['SLA en vivo', 'Conversión por agente', 'Cohortes'],
    gold: false,
  },
  {
    icon: <IconBolt style={{ width: 18, height: 18 }} />,
    title: 'Integraciones que ya tienes',
    body: 'Shopify, HubSpot, Zapier, Stripe, Calendly. Conéctalo a cualquier herramienta con un clic.',
    chips: ['Shopify', 'HubSpot', 'Stripe', '+ más'],
    gold: false,
  },
];

export function Features() {
  return (
    <section id="features" className="la-section la-wrap">
      <div className="la-section-head center" style={{ textAlign: 'center' }}>
        <div className="la-section-eyebrow" style={{ justifyContent: 'center' }}>Producto</div>
        <h2 className="la-display-md">
          Todo lo que tu equipo necesita para <span className="k">vender en WhatsApp</span>.
        </h2>
        <hr className="la-rule center" />
        <p className="la-sub" style={{ margin: '0 auto', maxWidth: 600 }}>
          Cero fricción. Cada pantalla resuelve una decisión real del día a día.
        </p>
        <p className="la-aside" style={{ marginTop: 14 }}>
          (Diseñado con equipos comerciales, no con consultores.)
        </p>
      </div>
      <div className="la-feat-grid">
        {FEATS.map((f, i) => (
          <div key={i} className="la-feat">
            <div className="la-feat-icon">{f.icon}</div>
            <div className="la-feat-title">{f.title}</div>
            <div className="la-feat-body">{f.body}</div>
            <div className="la-feat-foot">
              {f.chips.map((c, j) => (
                <span key={j} className={`la-feat-chip${f.gold && j === 0 ? ' gold' : ''}`}>{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
