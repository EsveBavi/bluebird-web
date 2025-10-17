import { useState } from 'react';
import { Menu, X, LogOut, Plus, Search, Edit2, Trash2, Eye, MoreVertical, Bell, User } from 'lucide-react';
import './DashboardAdmin.css';

export default function DashboardAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', estado: 'activo' });

  // Datos simulados
  const [clients, setClients] = useState([
    { id: 1, nombre: 'Juan Pérez', email: 'juan@mail.com', telefono: '555-0001', fechaRegistro: '2024-01-15', estado: 'activo' },
    { id: 2, nombre: 'María García', email: 'maria@mail.com', telefono: '555-0002', fechaRegistro: '2024-01-20', estado: 'activo' },
    { id: 3, nombre: 'Carlos López', email: 'carlos@mail.com', telefono: '555-0003', fechaRegistro: '2024-02-01', estado: 'suspendido' },
  ]);

  const [packages, setPackages] = useState([
    { id: 1, nombre: 'Plan Básico', velocidad: '20 Mbps', precio: '$29.99', descripcion: 'Ideal para uso básico' },
    { id: 2, nombre: 'Plan Estándar', velocidad: '50 Mbps', precio: '$49.99', descripcion: 'Perfecta para el hogar' },
    { id: 3, nombre: 'Plan Premium', velocidad: '100 Mbps', precio: '$79.99', descripcion: 'Alta velocidad' },
  ]);

  const [contracts, setContracts] = useState([
    { id: 1, cliente: 'Juan Pérez', paquete: 'Plan Estándar', inicio: '2024-01-15', mensualidad: '$49.99', estado: 'vigente' },
    { id: 2, cliente: 'María García', paquete: 'Plan Premium', inicio: '2024-02-01', mensualidad: '$79.99', estado: 'vigente' },
    { id: 3, cliente: 'Carlos López', paquete: 'Plan Básico', inicio: '2024-01-20', mensualidad: '$29.99', estado: 'vencido' },
  ]);

  const stats = [
    { label: 'Clientes Activos', valor: '2', icono: '👥', color: 'blue' },
    { label: 'Contratos Vigentes', valor: '2', icono: '📄', color: 'green' },
    { label: 'Pagos Pendientes', valor: '1', icono: '💰', color: 'yellow' },
    { label: 'Tickets Abiertos', valor: '3', icono: '🎫', color: 'red' },
  ];

  const alerts = [
    { tipo: 'danger', titulo: 'Contrato Vencido', mensaje: 'Carlos López - Plan Básico vencido desde hace 5 días' },
    { tipo: 'warning', titulo: 'Pago Vencido', mensaje: 'María García - Pago vencido hace 3 días' },
    { tipo: 'info', titulo: 'Nuevo Registro', mensaje: 'Se registró un nuevo cliente: Ana Martínez' },
  ];

  const handleAddClient = () => {
    if (formData.nombre && formData.email) {
      setClients([...clients, { 
        id: clients.length + 1, 
        ...formData, 
        fechaRegistro: new Date().toISOString().split('T')[0] 
      }]);
      setFormData({ nombre: '', email: '', telefono: '', estado: 'activo' });
      setShowModal(false);
    }
  };

  const handleDeleteClient = (id) => {
    setClients(clients.filter(c => c.id !== id));
  };

  const filteredClients = clients.filter(c => 
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'activo': return 'status-activo';
      case 'pendiente': return 'status-pendiente';
      case 'vigente': return 'status-vigente';
      case 'vencido': return 'status-vencido';
      case 'suspendido': return 'status-suspendido';
      default: return 'status-default';
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'clientes', label: 'Clientes', icon: '👥' },
    { id: 'paquetes', label: 'Paquetes', icon: '📦' },
    { id: 'contratos', label: 'Contratos', icon: '📄' },
    { id: 'pagos', label: 'Pagos', icon: '💳' },
    { id: 'tickets', label: 'Tickets', icon: '🎫' },
    { id: 'reportes', label: 'Reportes', icon: '📈' },
  ];

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        {/* Logo */}
        <div className="sidebar-header">
          {sidebarOpen && <h1 className="sidebar-logo">🐦 BlüeBird</h1>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="sidebar-toggle"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navegación */}
        <nav className="sidebar-nav">
          {navItems.map(item => (
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

        {/* Usuario */}
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">A</div>
            {sidebarOpen && (
              <div className="user-details">
                <p className="user-name">Admin</p>
                <p className="user-email">admin@bluebird.com</p>
              </div>
            )}
          </div>
          <button className="logout-btn">
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
              {activeSection === 'dashboard' && 'Dashboard Principal'}
              {activeSection === 'clientes' && 'Gestión de Clientes'}
              {activeSection === 'paquetes' && 'Planes y Paquetes'}
              {activeSection === 'contratos' && 'Gestión de Contratos'}
              {activeSection === 'pagos' && 'Gestión de Pagos'}
              {activeSection === 'tickets' && 'Tickets de Soporte'}
              {activeSection === 'reportes' && 'Reportes'}
            </h2>
          </div>
          <div className="topbar-actions">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-badge"></span>
            </button>
            <button className="icon-btn">
              <User size={20} />
            </button>
          </div>
        </header>

        {/* CONTENIDO */}
        <div className="page-content">
          {/* DASHBOARD */}
          {activeSection === 'dashboard' && (
            <div className="dashboard-section">
              {/* Stats Cards */}
              <div className="stats-grid">
                {stats.map((stat, i) => (
                  <div key={i} className="stat-card">
                    <div className="stat-content">
                      <div>
                        <p className="stat-label">{stat.label}</p>
                        <p className="stat-value">{stat.valor}</p>
                      </div>
                      <span className="stat-icon">{stat.icono}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gráfico y Alertas */}
              <div className="dashboard-grid">
                {/* Gráfico */}
                <div className="chart-container">
                  <h3 className="section-title">Tendencias de Crecimiento</h3>
                  <div className="chart">
                    {[60, 75, 45, 90, 80, 70, 85].map((height, i) => (
                      <div
                        key={i}
                        className="chart-bar"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="chart-labels">
                    <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span>
                    <span>Vie</span><span>Sab</span><span>Dom</span>
                  </div>
                </div>

                {/* Alertas */}
                <div className="alerts-container">
                  <h3 className="section-title">Alertas Importantes</h3>
                  <div className="alerts-list">
                    {alerts.map((alert, i) => (
                      <div key={i} className={`alert alert-${alert.tipo}`}>
                        <p className="alert-title">{alert.titulo}</p>
                        <p className="alert-message">{alert.mensaje}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Accesos Rápidos */}
              <div className="quick-actions">
                <h3 className="section-title">Acciones Rápidas</h3>
                <div className="actions-grid">
                  {[
                    { texto: 'Nuevo Contrato', icono: '📄' },
                    { texto: 'Registrar Pago', icono: '💳' },
                    { texto: 'Crear Ticket', icono: '🎫' },
                    { texto: 'Generar Reporte', icono: '📊' },
                  ].map((accion, i) => (
                    <button key={i} className="action-btn">
                      <span className="action-icon">{accion.icono}</span>
                      <span className="action-text">{accion.texto}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CLIENTES */}
          {activeSection === 'clientes' && (
            <div className="section">
              <div className="section-header">
                <div className="search-container">
                  <Search className="search-icon" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-primary"
                >
                  <Plus size={20} /> Nuevo Cliente
                </button>
              </div>

              {/* Tabla de Clientes */}
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Registro</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map(client => (
                      <tr key={client.id}>
                        <td>{client.nombre}</td>
                        <td>{client.email}</td>
                        <td>{client.telefono}</td>
                        <td>{client.fechaRegistro}</td>
                        <td>
                          <span className={`status-badge ${getStatusColor(client.estado)}`}>
                            {client.estado}
                          </span>
                        </td>
                        <td className="action-cell">
                          <button className="action-icon-btn view"><Eye size={16} /></button>
                          <button className="action-icon-btn edit"><Edit2 size={16} /></button>
                          <button onClick={() => handleDeleteClient(client.id)} className="action-icon-btn delete"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PAQUETES */}
          {activeSection === 'paquetes' && (
            <div className="packages-grid">
              {packages.map(pkg => (
                <div key={pkg.id} className="package-card">
                  <h3 className="package-name">{pkg.nombre}</h3>
                  <p className="package-price">{pkg.precio}</p>
                  <p className="package-info"><strong>Velocidad:</strong> {pkg.velocidad}</p>
                  <p className="package-description">{pkg.descripcion}</p>
                  <div className="package-actions">
                    <button className="btn btn-primary btn-sm">
                      <Edit2 size={16} /> Editar
                    </button>
                    <button className="btn btn-danger btn-sm">
                      <Trash2 size={16} /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CONTRATOS */}
          {activeSection === 'contratos' && (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Paquete</th>
                    <th>Inicio</th>
                    <th>Mensualidad</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map(contract => (
                    <tr key={contract.id}>
                      <td>{contract.cliente}</td>
                      <td>{contract.paquete}</td>
                      <td>{contract.inicio}</td>
                      <td>{contract.mensualidad}</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(contract.estado)}`}>
                          {contract.estado}
                        </span>
                      </td>
                      <td className="action-cell">
                        <button className="action-icon-btn view"><Eye size={16} /></button>
                        <button className="action-icon-btn edit"><Edit2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* PAGOS, TICKETS Y REPORTES */}
          {['pagos', 'tickets', 'reportes'].includes(activeSection) && (
            <div className="empty-state">
              <p>Sección en desarrollo...</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-title">Nuevo Cliente</h3>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="form-input"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="form-input"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                className="form-input"
              />
              <select
                value={formData.estado}
                onChange={(e) => setFormData({...formData, estado: e.target.value})}
                className="form-input"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="suspendido">Suspendido</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleAddClient}
                className="btn btn-primary"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}