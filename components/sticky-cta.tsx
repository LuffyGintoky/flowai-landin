'use client';

import { useState, useEffect } from 'react';
import { IconArrowRight } from './icons';

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`la-sticky-cta${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <span className="la-sticky-cta-text">¿Listo para empezar?</span>
      <a href="#waitlist" className="la-sticky-cta-btn">
        Reservar mi cupo <IconArrowRight style={{ width: 12, height: 12 }} />
      </a>
    </div>
  );
}
