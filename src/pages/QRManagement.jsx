import React, { useState } from 'react'
import StatusBadge from '../components/StatusBadge'
import { mockBatches } from '../data/mockData'
import './QRManagement.css'

const QRManagement = ({ userRole }) => {
  const [batches, setBatches] = useState(mockBatches)
  const [selectedBatches, setSelectedBatches] = useState([])
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false)

  const handleSelectBatch = (batchId) => {
    setSelectedBatches(prev => 
      prev.includes(batchId)
        ? prev.filter(id => id !== batchId)
        : [...prev, batchId]
    )
  }

  const handleSelectAll = () => {
    if (selectedBatches.length === batches.length) {
      setSelectedBatches([])
    } else {
      setSelectedBatches(batches.map(b => b.id))
    }
  }

  const handleGenerateQR = () => {
    const batchesToUpdate = selectedBatches.length > 0 
      ? selectedBatches 
      : batches.filter(b => b.qrStatus === 'pending').map(b => b.id)
    
    setBatches(prev => prev.map(batch => 
      batchesToUpdate.includes(batch.id)
        ? { ...batch, qrStatus: 'generated' }
        : batch
    ))
    
    alert(`QR codes generated for ${batchesToUpdate.length} batch(es)`)
  }

  const handleDownloadQR = () => {
    const batchesToDownload = selectedBatches.length > 0 
      ? selectedBatches 
      : batches.filter(b => b.qrStatus === 'generated').map(b => b.id)
    
    if (batchesToDownload.length === 0) {
      alert('No batches with generated QR codes selected')
      return
    }
    
    setShowDownloadSuccess(true)
    setTimeout(() => setShowDownloadSuccess(false), 3000)
  }

  return (
    <div className="qr-management">
      <div className="page-header">
        <h1>QR Code Management</h1>
        <p>Generate and manage QR codes for registered batches</p>
      </div>

      <div className="action-bar">
        <div className="action-info">
          <span className="selected-count">
            {selectedBatches.length > 0 
              ? `${selectedBatches.length} batch(es) selected`
              : 'No batches selected'}
          </span>
        </div>
        <div className="action-buttons">
          <button 
            onClick={handleGenerateQR}
            className="action-btn primary-btn"
            disabled={batches.filter(b => b.qrStatus === 'pending').length === 0}
          >
            🔲 Generate QR Codes
          </button>
          <button 
            onClick={handleDownloadQR}
            className="action-btn secondary-btn"
            disabled={batches.filter(b => b.qrStatus === 'generated').length === 0}
          >
            📥 Download QR Codes (ZIP)
          </button>
        </div>
      </div>

      {showDownloadSuccess && (
        <div className="success-banner">
          ✓ QR codes downloaded successfully! ZIP file contains all QR code images.
        </div>
      )}

      <div className="table-card">
        <table className="batches-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedBatches.length === batches.length && batches.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Batch ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Manufacturing Date</th>
              <th>Expiry Date</th>
              <th>Blockchain Status</th>
              <th>QR Status</th>
            </tr>
          </thead>
          <tbody>
            {batches.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-state">
                  <div className="empty-message">
                    <span className="empty-icon">📦</span>
                    <p>No batches registered yet</p>
                    <small>Register a new batch to get started</small>
                  </div>
                </td>
              </tr>
            ) : (
              batches.map((batch) => (
                <tr key={batch.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedBatches.includes(batch.id)}
                      onChange={() => handleSelectBatch(batch.id)}
                    />
                  </td>
                  <td>
                    <span className="batch-id">{batch.id}</span>
                  </td>
                  <td>{batch.productName}</td>
                  <td>{batch.quantity.toLocaleString()}</td>
                  <td>{new Date(batch.manufacturingDate).toLocaleDateString()}</td>
                  <td>{new Date(batch.expiryDate).toLocaleDateString()}</td>
                  <td>
                    <StatusBadge status={batch.blockchainStatus} />
                  </td>
                  <td>
                    <StatusBadge status={batch.qrStatus} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="info-card">
        <h3>ℹ️ QR Code Information</h3>
        <ul>
          <li>Each QR code contains a unique product identifier linked to the blockchain</li>
          <li>QR codes can only be generated for batches registered on blockchain</li>
          <li>Downloaded ZIP files contain high-resolution QR code images in PNG format</li>
          <li>Each QR code is scannable by consumers, pharmacies, and distributors</li>
        </ul>
      </div>
    </div>
  )
}

export default QRManagement

