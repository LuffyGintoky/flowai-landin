import { IconWhatsApp, IconSparkle, IconPipeline, IconCheck, IconChart, IconBolt } from './icons';

const FEATS = [
  {
    icon: <IconWhatsApp style={{ width: 18, height: 18 }} />,
    title: 'Inbox de solicitudes mineras',
    body: 'Todas las solicitudes de faena en un solo lugar. Responde aunque estés fuera de la oficina, sin perder el hilo de ninguna cotización activa.',
    chips: ['WhatsApp Business API', 'Multiagente', 'Historial completo'],
    gold: false,
  },
  {
    icon: <IconSparkle style={{ width: 18, height: 18 }} />,
    title: 'IA con razonamiento auditable',
    body: 'Cada cotización generada cita la tarifa usada, el plazo aplicado y las condiciones incluidas. Nada sale sin que puedas verificar.',
    chips: ['Fuente por respuesta', 'Trazabilidad completa', 'Modelos best-in-class'],
    gold: true,
  },
  {
    icon: <IconPipeline style={{ width: 18, height: 18 }} />,
    title: 'Cotizaciones activas en tiempo real',
    body: 'Cada solicitud se clasifica por urgencia y estado automáticamente. Sabes qué necesita respuesta ahora y qué puede esperar.',
    chips: ['Urgencia detectada', 'Estado de cotización', 'Próxima acción IA'],
    gold: false,
  },
  {
    icon: <IconCheck style={{ width: 18, height: 18 }} />,
    title: 'Aprobación de cotizaciones técnicas',
    body: 'Revisas, ajustas y apruebas cada cotización antes de que salga. Con atajos de teclado para no perder tiempo en lo que ya está bien.',
    chips: ['⌘↵ Aprobar', 'Edición rápida', 'Trazabilidad'],
    gold: false,
  },
  {
    icon: <IconChart style={{ width: 18, height: 18 }} />,
    title: 'Analytics que importan',
    body: 'Tiempo de respuesta por cliente, cotizaciones enviadas y tasa de adjudicación por tipo de servicio. Sin métricas de relleno.',
    chips: ['Tiempo de respuesta', 'Tasa de adjudicación', 'Por cliente'],
    gold: false,
  },
  {
    icon: <IconBolt style={{ width: 18, height: 18 }} />,
    title: 'Integraciones que ya usas',
    body: 'Conecta con tu sistema de facturación o ERP, Zapier, Stripe y Calendly. Si ya tienes una herramienta, la integramos.',
    chips: ['ERP / Facturación', 'Zapier', 'Stripe', '+ más'],
    gold: false,
  },
];

export function Features() {
  return (
    <section id="features" className="la-section la-wrap">
      <div className="la-section-head center" style={{ textAlign: 'center' }}>
        <div className="la-section-eyebrow" style={{ justifyContent: 'center' }}>Producto</div>
        <h2 className="la-display-md">
          Todo lo que necesitas para<br />
          <span className="k">cotizar en WhatsApp</span> como un profesional.
        </h2>
        <hr className="la-rule center" />
        <p className="la-sub" style={{ margin: '0 auto', maxWidth: 600 }}>
          Cero fricción. Cada pantalla resuelve<br />
          una decisión real del día a día.
        </p>
        <p className="la-aside" style={{ marginTop: 14 }}>
          (Diseñado con proveedores mineros reales, no con consultores.)
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
