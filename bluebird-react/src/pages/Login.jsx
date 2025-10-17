import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Pequeña pausa para simular procesamiento
    setTimeout(() => {
      const result = login(email, password, remember);

      if (result.success) {
        // Redirigir según tipo de usuario
        if (result.user.tipo === 'admin') {
          navigate('/admin');
        } else {
          navigate('/cliente');
        }
      } else {
        setError(result.error);
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-logo">
          <div className="logo-circle">🐦</div>
        </div>
        <h1>BlüeBird</h1>
        <p>Conectamos tu mundo digital con la mejor tecnología de fibra óptica. Bienvenido de vuelta.</p>
      </div>

      <div className="login-right">
        <div className="login-header">
          <h2>Iniciar Sesión</h2>
          <p>Ingresa tus credenciales para acceder</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                disabled={loading}
              />
              <span>Recordarme</span>
            </label>
            <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-mini"></span>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>

          <div className="divider">
            <span>O</span>
          </div>

          <div className="signup-link">
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </div>

          <div className="back-home">
            <Link to="/">← Volver al inicio</Link>
          </div>
        </form>

        <div className="credentials-info">
          <p><strong>📋 Credenciales de prueba:</strong></p>
          <div className="credentials-box">
            <div className="credential-item">
              <span className="credential-label">👨‍💼 Admin:</span>
              <span className="credential-value">admin@bluebird.com / admin123</span>
            </div>
            <div className="credential-item">
              <span className="credential-label">👤 Cliente:</span>
              <span className="credential-value">cliente@ejemplo.com / cliente123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;