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

    const result = login(email, password, remember);

    if (result.success) {
      // Redirigir según tipo de usuario
      setTimeout(() => {
        if (result.user.tipo === 'admin') {
          navigate('/admin');
        } else {
          navigate('/cliente');
        }
      }, 500);
    } else {
      setError(result.error);
      setLoading(false);
    }
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
            {error}
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
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Recordarme</span>
            </label>
            <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
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
          <p><strong>Credenciales de prueba:</strong></p>
          <div className="credentials-box">
            <p><strong>Admin:</strong> admin@bluebird.com / admin123</p>
            <p><strong>Cliente:</strong> cliente@ejemplo.com / cliente123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;