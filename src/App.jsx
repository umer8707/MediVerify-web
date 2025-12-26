import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import BatchRegistration from './pages/BatchRegistration'
import QRManagement from './pages/QRManagement'
import ScanActivity from './pages/ScanActivity'
import CounterfeitAlerts from './pages/CounterfeitAlerts'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Layout from './components/Layout'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const auth = localStorage.getItem('isAuthenticated')
    const role = localStorage.getItem('userRole')
    if (auth === 'true' && role) {
      setIsAuthenticated(true)
      setUserRole(role)
    }
  }, [])

  const handleLogin = (role) => {
    setIsAuthenticated(true)
    setUserRole(role)
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userRole', role)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userRole')
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Login onLogin={handleLogin} />
          } 
        />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Layout userRole={userRole} onLogout={handleLogout}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
                  <Route path="/batch-registration" element={<BatchRegistration userRole={userRole} />} />
                  <Route path="/qr-management" element={<QRManagement userRole={userRole} />} />
                  <Route path="/scan-activity" element={<ScanActivity userRole={userRole} />} />
                  <Route path="/counterfeit-alerts" element={<CounterfeitAlerts userRole={userRole} />} />
                  <Route path="/reports" element={<Reports userRole={userRole} />} />
                  <Route path="/settings" element={<Settings userRole={userRole} />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default App

