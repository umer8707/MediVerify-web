import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Simple validation - in real app, this would call an API
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    // Mock authentication - accept any email/password
    onLogin(role)
    navigate('/dashboard')
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <span className="login-logo-icon">💊</span>
            <h1>PharmaAuth</h1>
          </div>
          <p className="login-subtitle">Blockchain & AI-Based Pharmaceutical Verification System</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@pharma.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="role-selector"
            >
              <option value="admin">Manufacturer Admin</option>
              <option value="analyst">Manufacturer Analyst</option>
            </select>
            <small className="role-hint">
              {role === 'admin' 
                ? 'Full access to all features' 
                : 'Read-only access to analytics'}
            </small>
          </div>

          <button type="submit" className="login-button">
            🔐 Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>Secure blockchain-based authentication</p>
        </div>
      </div>
    </div>
  )
}

export default Login

