import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registro.css';

function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    aceptaTerminos: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.nombre.trim()) {
      setError('El nombre es requerido');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Ingresa un email válido');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!formData.aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    setLoading(true);

    try {
      // Aquí iría tu llamada a la API de registro
      // const response = await fetch('/api/registro', { ... })
      
      // Por ahora simulamos el registro
      setTimeout(() => {
        alert('¡Registro exitoso! Redirigiendo al login...');
        navigate('/login');
      }, 1000);
    } catch (err) {
      setError('Error al registrar. Intenta nuevamente.');
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
        <p>Únete a nuestra comunidad y disfruta de la mejor conexión de fibra óptica. Tu viaje digital comienza aquí.</p>
      </div>

      <div className="login-right">
        <div className="login-header">
          <h2>Crear Cuenta</h2>
          <p>Regístrate para acceder a nuestros servicios</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Juan Pérez"
              required
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
          </div>

          <label className="terms-checkbox">
            <input
              type="checkbox"
              name="aceptaTerminos"
              checked={formData.aceptaTerminos}
              onChange={handleChange}
            />
            <span>Acepto los <a href="#" className="terms-link">términos y condiciones</a></span>
          </label>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>

          <div className="divider">
            <span>O</span>
          </div>

          <div className="signup-link">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </div>

          <div className="back-home">
            <Link to="/">← Volver al inicio</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;