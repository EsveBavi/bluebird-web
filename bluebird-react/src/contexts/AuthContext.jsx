import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Usuarios de prueba
  const USERS_DB = [
    {
      id: 1,
      nombre: 'Admin',
      email: 'admin@bluebird.com',
      password: 'admin123',
      tipo: 'admin'
    },
    {
      id: 2,
      nombre: 'Cliente',
      email: 'cliente@ejemplo.com',
      password: 'cliente123',
      tipo: 'cliente'
    }
  ];

  // Cargar usuario del localStorage al montar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error al cargar usuario:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password, remember = false) => {
    // Buscar usuario en la base de datos
    const foundUser = USERS_DB.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      return {
        success: false,
        error: 'Email o contraseña incorrectos'
      };
    }

    // Crear objeto de usuario sin la contraseña
    const userData = {
      id: foundUser.id,
      nombre: foundUser.nombre,
      email: foundUser.email,
      tipo: foundUser.tipo
    };

    // Guardar en estado
    setUser(userData);

    // Guardar en localStorage si "recordarme" está marcado
    if (remember) {
      localStorage.setItem('user', JSON.stringify(userData));
    }

    return {
      success: true,
      user: userData
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = (nombre, email, password, tipo = 'cliente') => {
    // Verificar si el email ya existe
    const existingUser = USERS_DB.find(u => u.email === email);
    if (existingUser) {
      return {
        success: false,
        error: 'Este email ya está registrado'
      };
    }

    // Crear nuevo usuario (en una app real, esto iría a una API)
    const newUser = {
      id: USERS_DB.length + 1,
      nombre,
      email,
      password,
      tipo
    };

    USERS_DB.push(newUser);

    const userData = {
      id: newUser.id,
      nombre: newUser.nombre,
      email: newUser.email,
      tipo: newUser.tipo
    };

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));

    return {
      success: true,
      user: userData
    };
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const isAdmin = () => {
    return user?.tipo === 'admin';
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
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