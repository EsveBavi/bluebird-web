import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const [menuActive, setMenuActive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const scrollToPackages = () => {
    document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
  };

  const selectPackage = (packageName) => {
    alert(`¡Excelente elección! Has seleccionado el paquete ${packageName}.\n\nEn breve te redirigiremos al formulario de contratación.`);
  };

  const checkCoverage = (event) => {
    event.preventDefault();
    const address = document.getElementById('addressInput').value;
    const resultDiv = document.getElementById('coverageResult');
    
    resultDiv.innerHTML = '<p style="margin-top: 1rem; padding: 1rem; background: #dcfce7; border-radius: 10px; color: #166534;">✓ ¡Buenas noticias! Tenemos cobertura en tu área. <strong>Un asesor se contactará contigo pronto.</strong></p>';
    
    setTimeout(() => {
      resultDiv.innerHTML = '';
    }, 5000);
  };

  return (
    <div className={`landing-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="logo">
            <div className="logo-icon">🐦</div>
            <span>BlüeBird</span>
          </div>
          <ul className={`nav-links ${menuActive ? 'active' : ''}`} id="navLinks">
            <li><a href="#home">Inicio</a></li>
            <li><a href="#packages">Paquetes</a></li>
            <li><a href="#benefits">Beneficios</a></li>
            <li><a href="#coverage">Cobertura</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>

          <div className="nav-right">
            <button 
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title="Cambiar tema"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <div className="nav-auth">
              <Link to="/login" className="nav-login">Iniciar Sesión</Link>
              <Link to="/registro" className="nav-register">Registrarse</Link>
            </div>
          </div>

          <button 
            className="menu-toggle" 
            id="menuToggle"
            onClick={() => setMenuActive(!menuActive)}
          >
            ☰
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Conéctate a la Velocidad del Futuro</h1>
          <p>Internet de fibra óptica de alta velocidad que impulsa tu mundo digital. Sin interrupciones, sin límites.</p>
          <button className="btn-primary" onClick={scrollToPackages}>Ver Paquetes</button>
        </div>
        <div className="wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
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
            <button className="btn-package" onClick={() => selectPackage('Básico')}>Contratar Ahora</button>
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
            <button className="btn-package" onClick={() => selectPackage('Premium')}>Contratar Ahora</button>
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
            <button className="btn-package" onClick={() => selectPackage('Ultra')}>Contratar Ahora</button>
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
            <p>Conexiones de fibra óptica que garantizan la máxima velocidad para streaming, gaming y trabajo remoto.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔒</div>
            <h3>Conexión Segura</h3>
            <p>Tecnología de encriptación avanzada para proteger tu información y navegar con total tranquilidad.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📞</div>
            <h3>Soporte 24/7</h3>
            <p>Nuestro equipo técnico está disponible las 24 horas para resolver cualquier duda o problema.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Sin Permanencia</h3>
            <p>Cancela cuando quieras sin penalizaciones. Tu libertad es nuestra prioridad.</p>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="coverage" id="coverage">
        <div className="coverage-content">
          <div className="section-title">
            <h2>Verifica tu Cobertura</h2>
            <p>Ingresa tu dirección para confirmar disponibilidad</p>
          </div>
          <form className="coverage-form" onSubmit={checkCoverage}>
            <input type="text" id="addressInput" placeholder="Ingresa tu dirección completa" required />
            <button type="submit" className="btn-check">Verificar</button>
          </form>
          <div id="coverageResult"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BlüeBird</h3>
            <p>Internet de alta velocidad que conecta tu mundo. Tecnología de fibra óptica para un futuro digital sin límites.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Paquetes</h3>
            <ul>
              <li><a href="#packages">Básico 100 Mbps</a></li>
              <li><a href="#packages">Premium 500 Mbps</a></li>
              <li><a href="#packages">Ultra 1 Gbps</a></li>
              <li><a href="#packages">Comparar Paquetes</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Soporte</h3>
            <ul>
              <li><a href="#">Centro de Ayuda</a></li>
              <li><a href="#">Preguntas Frecuentes</a></li>
              <li><a href="#">Estado del Servicio</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contacto</h3>
            <ul>
              <li>📞 800-BLUEBIRD</li>
              <li>📧 info@bluebird.com</li>
              <li>📍 Mérida, Yucatán</li>
              <li>🕒 Lun-Dom 24/7</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 BlüeBird Internet. Todos los derechos reservados. | <a href="#">Términos y Condiciones</a> | <a href="#">Política de Privacidad</a></p>
        </div>
      </footer>
    </div>
  );
}