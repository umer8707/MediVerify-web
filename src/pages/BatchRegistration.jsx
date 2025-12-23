import React, { useState } from 'react'
import StatusBadge from '../components/StatusBadge'
import './BatchRegistration.css'

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
    
    // Generate batch ID if not provided
    const batchId = formData.batchId || generateBatchId()
    
    // Mock blockchain registration
    const newBatch = {
      ...formData,
      batchId,
      timestamp: new Date().toISOString(),
      blockchainHash: `0x${Math.random().toString(16).substr(2, 64)}`
    }
    
    setRegisteredBatch(newBatch)
    setShowSuccess(true)
    
    // Reset form
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
      <div className="batch-registration">
        <div className="page-header">
          <h1>Batch Registration</h1>
        </div>
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>Batch Successfully Registered on Blockchain</h2>
          <div className="success-details">
            <div className="detail-row">
              <span className="detail-label">Batch ID:</span>
              <span className="detail-value">{registeredBatch.batchId}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Product:</span>
              <span className="detail-value">{registeredBatch.medicineName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Blockchain Hash:</span>
              <span className="detail-value blockchain-hash">{registeredBatch.blockchainHash}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <StatusBadge status="registered" />
            </div>
          </div>
          <p className="success-message">
            This batch has been permanently recorded on the Ethereum blockchain.
            The transaction is immutable and verifiable.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="batch-registration">
      <div className="page-header">
        <h1>Register New Batch</h1>
        <p>Register a new pharmaceutical batch on the blockchain</p>
      </div>

      <div className="registration-card">
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="medicineName">
                Medicine Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="medicineName"
                name="medicineName"
                value={formData.medicineName}
                onChange={handleChange}
                placeholder="e.g., Paracetamol 500mg"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="batchId">Batch ID</label>
              <input
                type="text"
                id="batchId"
                name="batchId"
                value={formData.batchId}
                onChange={handleChange}
                placeholder="Auto-generated if left empty"
              />
              <small>Leave empty to auto-generate</small>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="manufacturingDate">
                Manufacturing Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="manufacturingDate"
                name="manufacturingDate"
                value={formData.manufacturingDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expiryDate">
                Expiry Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">
                Quantity (Units) <span className="required">*</span>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., 10000"
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="digitalSignature">
                Manufacturer Digital Signature
              </label>
              <input
                type="text"
                id="digitalSignature"
                name="digitalSignature"
                value={formData.digitalSignature}
                onChange={handleChange}
                placeholder="Optional: Digital signature hash"
              />
              <small>Cryptographic signature for batch authentication</small>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              🔗 Register on Blockchain
            </button>
            <button type="button" className="reset-button" onClick={() => setFormData({
              medicineName: '',
              batchId: '',
              manufacturingDate: '',
              expiryDate: '',
              quantity: '',
              digitalSignature: ''
            })}>
              Reset Form
            </button>
          </div>
        </form>
      </div>

      <div className="info-card">
        <h3>ℹ️ Blockchain Registration Information</h3>
        <ul>
          <li>All batch data is permanently stored on Ethereum blockchain</li>
          <li>Each registration creates an immutable transaction record</li>
          <li>Blockchain hash is generated automatically upon registration</li>
          <li>Registered batches can be verified by anyone using the blockchain hash</li>
        </ul>
      </div>
    </div>
  )
}

export default BatchRegistration

