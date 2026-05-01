'use client';

import { useState } from 'react';
import { IconCheck, IconUser, IconMail, IconArrowRight } from './icons';

const COUNTRIES = [
  { flag: '🇨🇱', code: '+56', label: 'Chile' },
  { flag: '🇲🇽', code: '+52', label: 'México' },
  { flag: '🇨🇴', code: '+57', label: 'Colombia' },
  { flag: '🇦🇷', code: '+54', label: 'Argentina' },
  { flag: '🇵🇪', code: '+51', label: 'Perú' },
  { flag: '🇺🇾', code: '+598', label: 'Uruguay' },
  { flag: '🇪🇸', code: '+34', label: 'España' },
];

export function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="la-section la-wrap" style={{ paddingTop: 0 }}>
      <div className="la-cta">
        <div className="la-cta-l">
          <div className="la-cta-eyebrow">
            <span className="dot" />
            Beta privada · cupos limitados
          </div>
          <h2>
            Únete antes de que <span className="k" style={{ color: 'var(--gold)' }}>se cierre</span>.
          </h2>
          <hr className="la-rule" />
          <p className="la-sub" style={{ fontSize: 19, maxWidth: 460, color: 'var(--ink)' }}>
            Equipos de LATAM ya están en lista.
          </p>
          <p className="la-aside" style={{ marginTop: 14, maxWidth: 480 }}>
            (Onboarding white-glove gratuito durante la beta. Pricing congelado por 12 meses para quienes entran ahora.)
          </p>
          <div className="la-cta-counters">
            <div className="la-cta-counter"><b>Gratis</b><span>Durante la beta</span></div>
            <div className="la-cta-counter"><b>&lt; 24h</b><span>Te contactamos</span></div>
            <div className="la-cta-counter"><b>Limitado</b><span>Cupos disponibles</span></div>
          </div>
        </div>

        <form className="la-form" onSubmit={onSubmit}>
          {submitted ? (
            <div style={{ padding: '32px 0', textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, margin: '0 auto 20px', borderRadius: 14, background: 'var(--gold-glow)', border: '1px solid color-mix(in oklab, var(--gold) 30%, transparent)', display: 'grid', placeItems: 'center', color: 'var(--gold)' }}>
                <IconCheck style={{ width: 24, height: 24 }} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '.04em' }}>
                Estás en la lista
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.55, maxWidth: 320, margin: '0 auto' }}>
                Te escribimos por WhatsApp en menos de 24h con tu acceso y los próximos pasos.
              </div>
            </div>
          ) : (
            <>
              <div className="la-field">
                <label>Nombre</label>
                <div className="la-input-wrap">
                  <span className="la-input-icon"><IconUser style={{ width: 14, height: 14 }} /></span>
                  <input type="text" placeholder="Lucía Marín" required />
                </div>
              </div>

              <div className="la-field">
                <label>Email</label>
                <div className="la-input-wrap">
                  <span className="la-input-icon"><IconMail style={{ width: 14, height: 14 }} /></span>
                  <input type="email" placeholder="lucia@empresa.com" required />
                </div>
              </div>

              <div className="la-field">
                <label>WhatsApp</label>
                <div className="la-input-wrap" style={{ position: 'relative' }}>
                  <button
                    type="button"
                    className="la-form-prefix"
                    style={{ cursor: 'pointer', background: 'transparent', border: 'none', borderRight: '1px solid var(--line-2)' }}
                    onClick={() => setCountryOpen((o) => !o)}
                  >
                    {country.flag} {country.code}
                  </button>
                  {countryOpen && (
                    <div style={{
                      position: 'absolute', top: '100%', left: 0, zIndex: 10, marginTop: 4,
                      background: 'var(--navy-mid)', border: '1px solid var(--line-2)', borderRadius: 6,
                      minWidth: 180, overflow: 'hidden',
                      boxShadow: '0 16px 40px rgba(0,0,0,.5)',
                    }}>
                      {COUNTRIES.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => { setCountry(c); setCountryOpen(false); }}
                          style={{
                            width: '100%', textAlign: 'left', padding: '9px 14px',
                            background: c.code === country.code ? 'rgba(200,169,126,.1)' : 'transparent',
                            border: 'none', cursor: 'pointer',
                            color: 'var(--ink-soft)', fontSize: 13, fontFamily: 'inherit',
                            display: 'flex', gap: 10, alignItems: 'center',
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.04)'; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = c.code === country.code ? 'rgba(200,169,126,.1)' : 'transparent'; }}
                        >
                          <span>{c.flag}</span>
                          <span style={{ flex: 1 }}>{c.label}</span>
                          <span style={{ color: 'var(--ink-mute)', fontSize: 12 }}>{c.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  <input type="tel" placeholder="55 4128 9034" required style={{ paddingLeft: 8 }} />
                </div>
              </div>

              <button type="submit" className="la-form-submit">
                Reservar mi cupo
                <IconArrowRight className="la-form-submit-arrow" style={{ width: 16, height: 16 }} />
              </button>
              <div className="la-form-note">
                <IconCheck className="check" />
                <em>Sin spam. Solo te contactamos por WhatsApp para coordinar el acceso.</em>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
