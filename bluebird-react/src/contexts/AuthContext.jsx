import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Usuarios de prueba
  const usuarios = {
    admin: {
      email: 'admin@bluebird.com',
      password: 'admin123',
      tipo: 'admin',
      nombre: 'Administrador'
    },
    cliente: {
      email: 'cliente@ejemplo.com',
      password: 'cliente123',
      tipo: 'cliente',
      nombre: 'Juan Pérez',
      contrato: 'BB-2025-001'
    }
  };

  useEffect(() => {
    // Verificar si hay sesión guardada
    const sesion = localStorage.getItem('bluebird_sesion') || sessionStorage.getItem('bluebird_sesion');
    if (sesion) {
      setUser(JSON.parse(sesion));
    }
    setLoading(false);
  }, []);

  const login = (email, password, remember) => {
    // Buscar usuario
    let usuarioValido = null;
    for (let key in usuarios) {
      if (usuarios[key].email === email && usuarios[key].password === password) {
        usuarioValido = usuarios[key];
        break;
      }
    }

    if (usuarioValido) {
      const sesion = {
        email: usuarioValido.email,
        tipo: usuarioValido.tipo,
        nombre: usuarioValido.nombre,
        contrato: usuarioValido.contrato || null,
        timestamp: new Date().getTime()
      };

      setUser(sesion);

      if (remember) {
        localStorage.setItem('bluebird_sesion', JSON.stringify(sesion));
      } else {
        sessionStorage.setItem('bluebird_sesion', JSON.stringify(sesion));
      }

      return { success: true, user: sesion };
    }

    return { success: false, error: 'Credenciales incorrectas' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bluebird_sesion');
    sessionStorage.removeItem('bluebird_sesion');
  };

  const register = (userData) => {
    // Simular registro
    const usuarios = JSON.parse(localStorage.getItem('bluebird_usuarios') || '[]');
    
    if (usuarios.some(u => u.email === userData.email)) {
      return { success: false, error: 'Este correo ya está registrado' };
    }

    usuarios.push({
      ...userData,
      fechaRegistro: new Date().toISOString()
    });

    localStorage.setItem('bluebird_usuarios', JSON.stringify(usuarios));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};