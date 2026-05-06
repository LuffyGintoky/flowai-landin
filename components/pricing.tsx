import { IconCheck, IconArrowRight } from './icons';

const TIERS = [
  {
    name: 'Starter',
    price: 'Gratis',
    sub: 'durante la beta',
    desc: 'Para proveedores validando WhatsApp como canal principal de cotizaciones.',
    feats: ['1 número WhatsApp', 'Hasta 500 solicitudes/mes', '2 usuarios', 'Co-pilot con aprobación', 'Soporte por email'],
    cta: 'Empezar gratis',
    featured: false,
    badge: null,
  },
  {
    name: 'Growth',
    price: '$249',
    sub: '/ mes por empresa',
    desc: 'Para proveedores que quieren responder cada solicitud minera sin depender de estar siempre disponibles.',
    feats: ['Hasta 5 números WhatsApp', 'Solicitudes ilimitadas', 'Usuarios ilimitados', 'Co-pilot + Autopilot', 'Cotizaciones activas con prioridad', 'Integraciones premium', 'Soporte prioritario'],
    cta: 'Probar 30 días gratis',
    featured: true,
    badge: '★ Más elegido',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    sub: 'según volumen',
    desc: 'Para empresas con múltiples faenas, contratos marco o necesidades de integración con ERP.',
    feats: ['Números y usuarios ilimitados', 'Modelo IA dedicado', 'Datos en Chile', 'SOC 2 + DPA + custom MSA', 'White-label disponible', 'Onboarding dedicado', 'CSM asignado'],
    cta: 'Hablar con ventas',
    featured: false,
    badge: null,
  },
];

export function Pricing() {
  return (
    <section id="precios" className="la-section la-wrap">
      <div className="la-section-head center" style={{ textAlign: 'center' }}>
        <div className="la-section-eyebrow" style={{ justifyContent: 'center' }}>Precios honestos</div>
        <h2 className="la-display-md">
          Crecer no debería<br />
          <span className="k">costarte el doble</span>.
        </h2>
        <hr className="la-rule center" />
        <p className="la-sub" style={{ margin: '0 auto', maxWidth: 540 }}>
          Acceso anticipado gratuito durante la beta.
        </p>
        <p className="la-aside" style={{ marginTop: 14 }}>
          (Pricing congelado por 12 meses para quienes entran ahora — sin penalizar el crecimiento.)
        </p>
      </div>
      <div className="la-price-grid">
        {TIERS.map((t) => (
          <div key={t.name} className={`la-price${t.featured ? ' is-featured' : ''}`}>
            {t.badge && <div className="la-price-badge">{t.badge}</div>}
            <div className="la-price-name">{t.name}</div>
            <div className="la-price-num">
              <b>{t.price}</b>
              <span>{t.sub}</span>
            </div>
            <div className="la-price-desc">{t.desc}</div>
            <div className="la-price-feats">
              {t.feats.map((f) => (
                <div key={f} className="la-price-feat">
                  <IconCheck />
                  {f}
                </div>
              ))}
            </div>
            <a
              href={t.name === 'Enterprise' ? 'mailto:contacto@flowai.cl' : '#waitlist'}
              className="la-price-cta"
            >
              {t.cta} <IconArrowRight style={{ width: 13, height: 13 }} />
            </a>
          </div>
        ))}
      </div>
      <div className="la-price-foot">
        <span>¿Necesitas algo distinto? <a href="mailto:contacto@flowai.cl">Hablemos</a>.</span>
        <span>·</span>
        <span>Todos los planes incluyen migración asistida desde tu herramienta actual.</span>
      </div>
    </section>
  );
}
