import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Bell, User, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './DashboardCliente.css';

export default function DashboardCliente() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Verificar si el usuario es cliente
  useEffect(() => {
    if (!user || user.tipo !== 'cliente') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const contratos = [
    {
      id: 1,
      plan: 'Plan Estándar',
      velocidad: '50 Mbps',
      estado: 'vigente',
      inicio: '2024-01-15',
      proximo_pago: '2024-11-15',
      precio: '$49.99'
    }
  ];

  const facturas = [
    { id: 1, fecha: '2024-10-15', monto: '$49.99', estado: 'pagada' },
    { id: 2, fecha: '2024-09-15', monto: '$49.99', estado: 'pagada' },
    { id: 3, fecha: '2024-08-15', monto: '$49.99', estado: 'pagada' },
  ];

  const soporteTickets = [
    { id: 1, asunto: 'Problema de velocidad', estado: 'abierto', fecha: '2024-10-10' },
    { id: 2, asunto: 'Consulta sobre plan', estado: 'resuelto', fecha: '2024-10-05' },
  ];

  const stats = [
    { label: 'Mi Plan', valor: 'Estándar', icon: '📦' },
    { label: 'Velocidad', valor: '50 Mbps', icon: '⚡' },
    { label: 'Próximo Pago', valor: '15 Nov', icon: '💳' },
    { label: 'Tickets Abiertos', valor: '1', icon: '🎫' },
  ];

  if (!user) return null;

  return (
    <div className="dashboard-cliente-container">
      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          {sidebarOpen && <h1 className="sidebar-logo">🐦 BlüeBird</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sidebar-toggle"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {[
            { id: 'dashboard', label: 'Mi Dashboard', icon: '📊' },
            { id: 'contrato', label: 'Mi Contrato', icon: '📄' },
            { id: 'facturas', label: 'Facturas', icon: '📋' },
            { id: 'soporte', label: 'Soporte', icon: '🎫' },
            { id: 'perfil', label: 'Mi Perfil', icon: '👤' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user.nombre ? user.nombre.charAt(0).toUpperCase() : 'C'}</div>
            {sidebarOpen && (
              <div className="user-details">
                <p className="user-name">{user.nombre}</p>
                <p className="user-email">{user.email}</p>
              </div>
            )}
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={16} /> {sidebarOpen && 'Cerrar Sesión'}
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* TOPBAR */}
        <header className="topbar">
          <div>
            <h2 className="page-title">
              {activeSection === 'dashboard' && 'Mi Dashboard'}
              {activeSection === 'contrato' && 'Mi Contrato'}
              {activeSection === 'facturas' && 'Mis Facturas'}
              {activeSection === 'soporte' && 'Tickets de Soporte'}
              {activeSection === 'perfil' && 'Mi Perfil'}
            </h2>
          </div>
          <div className="topbar-actions">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-badge"></span>
            </button>
            <button className="icon-btn" title={user.email}>
              <User size={20} />
            </button>
          </div>
        </header>

        {/* CONTENIDO */}
        <div className="page-content">
          {/* DASHBOARD */}
          {activeSection === 'dashboard' && (
            <div className="dashboard-section">
              <div className="welcome-card">
                <h3>¡Bienvenido, {user.nombre}!</h3>
                <p>Aquí puedes ver el estado de tu servicio y gestionar tu cuenta</p>
              </div>

              <div className="stats-grid">
                {stats.map((stat, i) => (
                  <div key={i} className="stat-card">
                    <span className="stat-icon">{stat.icon}</span>
                    <p className="stat-label">{stat.label}</p>
                    <p className="stat-value">{stat.valor}</p>
                  </div>
                ))}
              </div>

              <div className="dashboard-grid">
                <div className="card">
                  <h3>Estado del Servicio</h3>
                  <div className="service-status">
                    <div className="status-item">
                      <CheckCircle size={24} className="status-active" />
                      <div>
                        <p className="status-title">Conexión Activa</p>
                        <p className="status-desc">Tu servicio está funcionando correctamente</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3>Información de Pago</h3>
                  <div className="payment-info">
                    <p><strong>Plan:</strong> {contratos[0]?.plan}</p>
                    <p><strong>Monto:</strong> {contratos[0]?.precio}/mes</p>
                    <p><strong>Próximo Pago:</strong> {contratos[0]?.proximo_pago}</p>
                    <button className="btn btn-primary btn-sm">Pagar Ahora</button>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3>Acciones Rápidas</h3>
                <div className="quick-actions">
                  <button className="action-btn">
                    <span>📞</span>
                    <span>Llamar a Soporte</span>
                  </button>
                  <button className="action-btn">
                    <span>📧</span>
                    <span>Contactar por Email</span>
                  </button>
                  <button className="action-btn">
                    <span>📱</span>
                    <span>Chat en Vivo</span>
                  </button>
                  <button className="action-btn">
                    <span>⚙️</span>
                    <span>Configuración</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MI CONTRATO */}
          {activeSection === 'contrato' && (
            <div className="section">
              {contratos.map(contrato => (
                <div key={contrato.id} className="card contract-card">
                  <div className="contract-header">
                    <h3>{contrato.plan}</h3>
                    <span className={`status-badge status-${contrato.estado}`}>
                      {contrato.estado}
                    </span>
                  </div>
                  <div className="contract-details">
                    <div className="detail-item">
                      <strong>Velocidad:</strong> {contrato.velocidad}
                    </div>
                    <div className="detail-item">
                      <strong>Precio:</strong> {contrato.precio}/mes
                    </div>
                    <div className="detail-item">
                      <strong>Fecha de Inicio:</strong> {contrato.inicio}
                    </div>
                    <div className="detail-item">
                      <strong>Próximo Pago:</strong> {contrato.proximo_pago}
                    </div>
                  </div>
                  <div className="contract-actions">
                    <button className="btn btn-primary">Ver Detalles</button>
                    <button className="btn btn-secondary">Cambiar Plan</button>
                    <button className="btn btn-outline">Descargar Contrato</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FACTURAS */}
          {activeSection === 'facturas' && (
            <div className="section">
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Monto</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facturas.map(factura => (
                      <tr key={factura.id}>
                        <td>{factura.fecha}</td>
                        <td>{factura.monto}</td>
                        <td>
                          <span className={`status-badge status-${factura.estado}`}>
                            {factura.estado}
                          </span>
                        </td>
                        <td>
                          <button className="action-btn-small">
                            <Download size={16} /> Descargar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SOPORTE */}
          {activeSection === 'soporte' && (
            <div className="section">
              <button className="btn btn-primary" style={{ marginBottom: '1.5rem' }}>
                + Crear Nuevo Ticket
              </button>

              <div className="tickets-list">
                {soporteTickets.map(ticket => (
                  <div key={ticket.id} className="ticket-card">
                    <div className="ticket-header">
                      <h4>{ticket.asunto}</h4>
                      <span className={`status-badge status-${ticket.estado}`}>
                        {ticket.estado}
                      </span>
                    </div>
                    <p className="ticket-date">Creado: {ticket.fecha}</p>
                    <button className="btn btn-secondary btn-sm">Ver Detalles</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PERFIL */}
          {activeSection === 'perfil' && (
            <div className="section">
              <div className="card">
                <h3>Mi Información</h3>
                <div className="profile-info">
                  <div className="info-group">
                    <label>Nombre</label>
                    <input type="text" value={user.nombre} disabled />
                  </div>
                  <div className="info-group">
                    <label>Email</label>
                    <input type="email" value={user.email} disabled />
                  </div>
                  <div className="info-group">
                    <label>Tipo de Cuenta</label>
                    <input type="text" value={user.tipo} disabled />
                  </div>
                  <button className="btn btn-primary">Editar Perfil</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}