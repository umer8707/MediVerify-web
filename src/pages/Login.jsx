import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { IoShieldCheckmark } from 'react-icons/io5'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('manufacturer')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    onLogin(role)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-10">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center justify-center mb-4">
            <IoShieldCheckmark className="text-[64px] text-[#007AFF] mb-3" />
            <h1 className="text-3xl font-bold text-[#007AFF] mb-2">MediVerify</h1>
            <p className="text-sm text-gray-500 font-medium">
              Verify Medicines. Protect Lives.
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Blockchain & AI-Based Pharmaceutical Verification System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@pharma.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
            >
              <option value="manufacturer">Manufacturer</option>
              <option value="admin">Admin / Regulator</option>
            </select>
            <small className="text-xs text-gray-500 mt-1 block">
              {role === 'admin' 
                ? 'Admin access: Approve manufacturers, view all data' 
                : 'Manufacturer access: Register batches, view analytics'}
            </small>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#007AFF] text-white rounded-lg font-semibold hover:bg-[#0051D5] transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-gray-500">New manufacturer?</p>
          <Link 
            to="/register" 
            className="text-sm text-[#007AFF] hover:text-[#0051D5] font-medium"
          >
            Register Your Company →
          </Link>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">Secure blockchain-based authentication</p>
        </div>
      </div>
    </div>
  )
}

export default Login
