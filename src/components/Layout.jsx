import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

const Layout = ({ children, userRole, onLogout }) => {
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/batch-registration', label: 'Batch Registration', icon: '📦', adminOnly: true },
    { path: '/qr-management', label: 'QR Management', icon: '🔲', adminOnly: true },
    { path: '/scan-activity', label: 'Scan Activity', icon: '📱' },
    { path: '/counterfeit-alerts', label: 'Alerts', icon: '⚠️' },
    { path: '/reports', label: 'Reports', icon: '📈' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ]

  const filteredNavItems = navItems.filter(item => 
    !item.adminOnly || userRole === 'admin'
  )

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">💊</span>
            <div>
              <h2>PharmaAuth</h2>
              <p className="logo-subtitle">Blockchain Verification</p>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {filteredNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <span className="user-role-badge">{userRole === 'admin' ? 'Admin' : 'Analyst'}</span>
          </div>
          <button onClick={onLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout

