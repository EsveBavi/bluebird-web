import { Link } from 'react-router-dom';
import { useState } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      {/* Header */}
      <header className="header">
        <nav className="nav-container">
          <div className="logo">
            <div className="logo-icon">🐦</div>
            <span>BlüeBird</span>
          </div>
          <ul className="nav-links">
            <li><a href="#home">Inicio</a></li>
            <li><a href="#packages">Paquetes</a></li>
            <li><a href="#benefits">Beneficios</a></li>
            <li><a href="#coverage">Cobertura</a></li>
            <li><Link to="/login">Iniciar Sesión</Link></li>
          </ul>
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Conéctate a la Velocidad del Futuro</h1>
          <p>Internet de fibra óptica de alta velocidad que impulsa tu mundo digital. Sin interrupciones, sin límites.</p>
          <button className="btn btn-primary">Ver Paquetes</button>
        </div>
      </section>

      {/* Packages Section */}
      <section className="packages" id="packages">
        <div className="section-title">
          <h2>Nuestros Paquetes de Internet</h2>
          <p>Elige el plan perfecto para tus necesidades</p>
        </div>
        <div className="packages-grid">
          {/* Paquete Básico */}
          <div className="package-card">
            <h3>Básico</h3>
            <div className="package-speed">100<span> Mbps</span></div>
            <div className="package-price">$299<span>/mes</span></div>
            <ul className="package-features">
              <li>Fibra Óptica</li>
              <li>Wi-Fi de Alta Velocidad</li>
              <li>Sin Contrato</li>
              <li>Soporte 24/7</li>
              <li>Instalación Gratis</li>
            </ul>
            <button className="btn-package">Contratar Ahora</button>
          </div>

          {/* Paquete Premium */}
          <div className="package-card popular">
            <span className="popular-badge">Más Popular</span>
            <h3>Premium</h3>
            <div className="package-speed">500<span> Mbps</span></div>
            <div className="package-price">$499<span>/mes</span></div>
            <ul className="package-features">
              <li>Fibra Óptica</li>
              <li>Wi-Fi 6 Incluido</li>
              <li>Sin Contrato</li>
              <li>Soporte Prioritario 24/7</li>
              <li>Instalación Gratis</li>
              <li>IP Pública Fija</li>
            </ul>
            <button className="btn-package">Contratar Ahora</button>
          </div>

          {/* Paquete Ultra */}
          <div className="package-card">
            <h3>Ultra</h3>
            <div className="package-speed">1<span> Gbps</span></div>
            <div className="package-price">$799<span>/mes</span></div>
            <ul className="package-features">
              <li>Fibra Óptica Simétrica</li>
              <li>Router Wi-Fi 6 Premium</li>
              <li>Sin Contrato</li>
              <li>Soporte VIP 24/7</li>
              <li>Instalación Express Gratis</li>
              <li>IP Pública Fija</li>
              <li>Seguridad Avanzada</li>
            </ul>
            <button className="btn-package">Contratar Ahora</button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits" id="benefits">
        <div className="section-title">
          <h2>¿Por Qué Elegir BlüeBird?</h2>
          <p>Más que internet, una experiencia completa</p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🚀</div>
            <h3>Alta Velocidad</h3>
            <p>Conexiones de fibra óptica que garantizan la máxima velocidad.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔒</div>
            <h3>Conexión Segura</h3>
            <p>Tecnología de encriptación avanzada para tu seguridad.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📞</div>
            <h3>Soporte 24/7</h3>
            <p>Nuestro equipo técnico disponible las 24 horas.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Sin Permanencia</h3>
            <p>Cancela cuando quieras sin penalizaciones.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BlüeBird</h3>
            <p>Internet de alta velocidad que conecta tu mundo.</p>
          </div>
          <div className="footer-section">
            <h3>Enlaces</h3>
            <ul>
              <li><a href="#packages">Paquetes</a></li>
              <li><Link to="/login">Iniciar Sesión</Link></li>
              <li><Link to="/registro">Registrarse</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contacto</h3>
            <ul>
              <li>📞 800-BLUEBIRD</li>
              <li>📧 info@bluebird.com</li>
              <li>📍 Mérida, Yucatán</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 BlüeBird Internet. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;