'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const LINKS = [
  { label: 'Problema', href: '#problema' },
  { label: 'Solución', href: '#solucion' },
  { label: 'Producto', href: '#features' },
  { label: 'Precios', href: '#precios' },
];

export function Nav() {
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('[id]');
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className="la-nav">
        <div className="la-nav-inner">
          <div className="la-brand">
            <Image src="/logos-flowai/2.png" alt="FlowAI" width={42} height={42} style={{ objectFit: 'contain' }} />
            <div className="la-brand-name">Flow<i>AI</i></div>
          </div>
          <div className="la-nav-links">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className={active === l.href ? 'is-active' : ''}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="la-nav-actions">
            <a href="#waitlist" className="la-btn-ghost">Solicitar demo</a>
            <a href="#waitlist" className="la-btn-gold">Unirme a la beta</a>
          </div>
          <button
            className="la-nav-burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
          </button>
        </div>
      </nav>

      <div className={`la-mobile-menu${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="la-mobile-menu-inner">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="la-mobile-menu-divider" />
          <a href="#waitlist" className="la-btn-gold" onClick={() => setMenuOpen(false)}>
            Reservar mi cupo →
          </a>
        </div>
      </div>
    </>
  );
}
