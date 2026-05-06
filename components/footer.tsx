import Image from 'next/image';
import { TwitterX, Linkedin, Youtube } from './icons';

export function Footer() {
  return (
    <footer className="la-footer">
      <div className="la-wrap">
        <div className="la-footer-grid">
          <div className="la-footer-brand">
            <div className="la-brand">
              <Image src="/logos-flowai/2.png" alt="FlowAI" width={40} height={40} style={{ objectFit: 'contain' }} />
              <div className="la-brand-name">Flow<i>AI</i></div>
            </div>
            <p>El agente que cuida tus contratos mineros. Construido en Antofagasta, para proveedores del norte de Chile.</p>
            <div className="la-footer-social">
              <a href="#" title="Twitter / X"><TwitterX style={{ width: 14, height: 14 }} /></a>
              <a href="#" title="LinkedIn"><Linkedin style={{ width: 14, height: 14 }} /></a>
              <a href="#" title="YouTube"><Youtube style={{ width: 14, height: 14 }} /></a>
            </div>
          </div>
          <div className="la-footer-col">
            <h5>Producto</h5>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#precios">Precios</a></li>
              <li><a href="#">Changelog</a></li>
              <li><a href="#">Roadmap</a></li>
              <li><a href="#">Estado</a></li>
            </ul>
          </div>
          <div className="la-footer-col">
            <h5>Empresa</h5>
            <ul>
              <li><a href="#">Sobre nosotros</a></li>
              <li><a href="#">Manifiesto</a></li>
              <li><a href="#">Trabaja con nosotros</a></li>
              <li><a href="#">Prensa</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>
          <div className="la-footer-col">
            <h5>Legal</h5>
            <ul>
              <li><a href="#">Privacidad</a></li>
              <li><a href="#">Términos</a></li>
              <li><a href="#">DPA</a></li>
              <li><a href="#">Centro de ayuda</a></li>
              <li><a href="#">API docs</a></li>
            </ul>
          </div>
        </div>
        <div className="la-footer-bottom">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div>© 2026 FlowAI Technologies</div>
            <div style={{ fontSize: 10.5, color: 'var(--ink-faint)', letterSpacing: '.04em' }}>
              Desarrollado por{' '}
              <a
                href="https://www.shinsekai.cl/"
                target="_blank"
                rel="noopener noreferrer"
                className="la-shinsekai-link"
              >
                Shinsekai
              </a>
            </div>
          </div>
          <div className="la-footer-bottom-r">
            <span className="badge"><span className="dot" />Operando · 99.98%</span>
            <span>🇨🇱 Antofagasta, Chile</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
