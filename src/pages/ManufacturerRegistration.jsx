import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoShieldCheckmark, IoTimeOutline } from 'react-icons/io5'

const ManufacturerRegistration = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    licenseNumber: '',
    contactEmail: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.companyName || !formData.licenseNumber || !formData.contactEmail) {
      setError('Please fill in all required fields')
      return
    }

    // Store registration in localStorage (mock)
    const registrations = JSON.parse(localStorage.getItem('manufacturerRegistrations') || '[]')
    const newRegistration = {
      id: `REG-${Date.now()}`,
      ...formData,
      status: 'pending',
      submittedAt: new Date().toISOString()
    }
    registrations.push(newRegistration)
    localStorage.setItem('manufacturerRegistrations', JSON.stringify(registrations))
    
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <IoTimeOutline className="text-5xl text-yellow-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Registration Submitted
          </h2>
          <p className="text-gray-600 mb-6">
            Your manufacturer registration has been submitted and is pending admin approval.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Status:</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                Pending Approval
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              An admin will review your registration and notify you via email once approved.
            </p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 bg-[#007AFF] text-white rounded-lg font-semibold hover:bg-[#0051D5] transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-10">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center justify-center mb-4">
            <IoShieldCheckmark className="text-[64px] text-[#007AFF] mb-3" />
            <h1 className="text-3xl font-bold text-[#007AFF] mb-2">MediVerify</h1>
            <p className="text-sm text-gray-500 font-medium mb-1">
              Verify Medicines. Protect Lives.
            </p>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Manufacturer Registration</h2>
          <p className="text-sm text-gray-600">
            Register your pharmaceutical company to start using the system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g., PharmaCorp Ltd."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
              License / Registration Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="e.g., DRAP-2024-12345"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
              required
            />
            <small className="text-xs text-gray-500 mt-1 block">
              Official pharmaceutical manufacturing license number
            </small>
          </div>

          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="contact@company.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
              required
            />
            <small className="text-xs text-gray-500 mt-1 block">
              This email will be used for notifications and account access
            </small>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#007AFF] text-white rounded-lg font-semibold hover:bg-[#0051D5] transition-colors"
          >
            Submit Registration
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManufacturerRegistration

