import React, { useState } from 'react'
import { IoCheckmarkCircle } from 'react-icons/io5'
import StatusBadge from '../components/StatusBadge'

const BatchRegistration = ({ userRole }) => {
  const [formData, setFormData] = useState({
    medicineName: '',
    batchId: '',
    manufacturingDate: '',
    expiryDate: '',
    quantity: '',
    digitalSignature: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [registeredBatch, setRegisteredBatch] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const generateBatchId = () => {
    const timestamp = Date.now()
    return `BATCH-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const batchId = formData.batchId || generateBatchId()
    
    const newBatch = {
      ...formData,
      batchId,
      timestamp: new Date().toISOString(),
      blockchainHash: `0x${Math.random().toString(16).substr(2, 64)}`
    }
    
    setRegisteredBatch(newBatch)
    setShowSuccess(true)
    
    setTimeout(() => {
      setFormData({
        medicineName: '',
        batchId: '',
        manufacturingDate: '',
        expiryDate: '',
        quantity: '',
        digitalSignature: ''
      })
      setShowSuccess(false)
      setRegisteredBatch(null)
    }, 5000)
  }

  if (showSuccess && registeredBatch) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Batch Registration</h1>
        </div>
        <div className="bg-white rounded-xl p-8 sm:p-12 shadow-sm text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <IoCheckmarkCircle className="text-5xl text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Batch Successfully Registered on Blockchain</h2>
          <p className="text-gray-600 mb-6">Your batch has been registered. You can now generate QR codes for this batch.</p>
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-600">Batch ID:</span>
              <span className="text-sm font-semibold text-gray-900">{registeredBatch.batchId}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-600">Product:</span>
              <span className="text-sm font-semibold text-gray-900">{registeredBatch.medicineName}</span>
            </div>
            <div className="flex justify-between items-start py-3 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-600">Blockchain Hash:</span>
              <span className="text-xs font-mono text-[#007AFF] break-all text-right">{registeredBatch.blockchainHash}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-sm font-medium text-gray-600">Status:</span>
              <StatusBadge status="registered" />
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            This batch has been permanently recorded on the Ethereum blockchain.
            The transaction is immutable and verifiable.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Register New Batch</h1>
        <p className="text-gray-600">Register a new pharmaceutical batch on the blockchain</p>
      </div>

      <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm mb-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="medicineName" className="block text-sm font-medium text-gray-700 mb-2">
                Medicine Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="medicineName"
                name="medicineName"
                value={formData.medicineName}
                onChange={handleChange}
                placeholder="e.g., Paracetamol 500mg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label htmlFor="batchId" className="block text-sm font-medium text-gray-700 mb-2">
                Batch ID
              </label>
              <input
                type="text"
                id="batchId"
                name="batchId"
                value={formData.batchId}
                onChange={handleChange}
                placeholder="Auto-generated if left empty"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
              />
              <small className="text-xs text-gray-500 mt-1 block">Leave empty to auto-generate</small>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="manufacturingDate" className="block text-sm font-medium text-gray-700 mb-2">
                Manufacturing Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="manufacturingDate"
                name="manufacturingDate"
                value={formData.manufacturingDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (Units) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., 10000"
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label htmlFor="digitalSignature" className="block text-sm font-medium text-gray-700 mb-2">
                Manufacturer Digital Signature
              </label>
              <input
                type="text"
                id="digitalSignature"
                name="digitalSignature"
                value={formData.digitalSignature}
                onChange={handleChange}
                placeholder="Optional: Digital signature hash"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
              />
              <small className="text-xs text-gray-500 mt-1 block">Cryptographic signature for batch authentication</small>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#007AFF] text-white rounded-lg font-semibold hover:bg-[#0051D5] transition-colors"
            >
              Register Batch on Blockchain
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              onClick={() => setFormData({
                medicineName: '',
                batchId: '',
                manufacturingDate: '',
                expiryDate: '',
                quantity: '',
                digitalSignature: ''
              })}
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Blockchain Registration Information</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-[#007AFF] font-bold mt-1">•</span>
            <span className="text-sm text-gray-600">All batch data is permanently stored on Ethereum blockchain</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#007AFF] font-bold mt-1">•</span>
            <span className="text-sm text-gray-600">Each registration creates an immutable transaction record</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#007AFF] font-bold mt-1">•</span>
            <span className="text-sm text-gray-600">Blockchain hash is generated automatically upon registration</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#007AFF] font-bold mt-1">•</span>
            <span className="text-sm text-gray-600">Registered batches can be verified by anyone using the blockchain hash</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default BatchRegistration
