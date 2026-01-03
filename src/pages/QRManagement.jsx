import React, { useState } from 'react'
import { IoQrCodeOutline, IoDownloadOutline, IoCheckmarkCircle, IoCubeOutline, IoInformationCircleOutline } from 'react-icons/io5'
import StatusBadge from '../components/StatusBadge'
import { mockBatches } from '../data/mockData'

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
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">QR Code Management</h1>
        <p className="text-gray-600">Generate and manage QR codes for registered batches</p>
      </div>

      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm font-medium text-gray-600">
            {selectedBatches.length > 0 
              ? `${selectedBatches.length} batch(es) selected`
              : 'No batches selected'}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button 
              onClick={handleGenerateQR}
              className="px-4 py-2 bg-[#007AFF] text-white rounded-lg font-medium hover:bg-[#0051D5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={batches.filter(b => b.qrStatus === 'pending').length === 0}
            >
              <span className="flex items-center gap-2">
                <IoQrCodeOutline />
                <span>Generate QR Codes</span>
              </span>
            </button>
            <button 
              onClick={handleDownloadQR}
              className="px-4 py-2 bg-white text-[#007AFF] border border-[#007AFF] rounded-lg font-medium hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={batches.filter(b => b.qrStatus === 'generated').length === 0}
            >
              <span className="flex items-center gap-2">
                <IoDownloadOutline />
                <span>Download QR Codes (ZIP)</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {showDownloadSuccess && (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6 text-sm font-medium">
          <span className="flex items-center gap-2">
            <IoCheckmarkCircle className="text-lg" />
            <span>QR codes downloaded successfully! ZIP file contains all QR code images.</span>
          </span>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedBatches.length === batches.length && batches.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Batch ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Manufacturing Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Expiry Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Blockchain Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">QR Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {batches.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <IoCubeOutline className="text-5xl text-gray-300" />
                      <p className="text-base font-medium text-gray-900">No batches registered yet</p>
                      <small className="text-sm text-gray-500">Register a new batch to get started</small>
                    </div>
                  </td>
                </tr>
              ) : (
                batches.map((batch) => (
                  <tr key={batch.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedBatches.includes(batch.id)}
                        onChange={() => handleSelectBatch(batch.id)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-mono font-semibold text-[#007AFF] text-sm">{batch.id}</span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">{batch.productName}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{batch.quantity.toLocaleString()}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{new Date(batch.manufacturingDate).toLocaleDateString()}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{new Date(batch.expiryDate).toLocaleDateString()}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={batch.blockchainStatus} />
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={batch.qrStatus} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <IoInformationCircleOutline className="text-[#007AFF]" />
          <span>QR Code Information</span>
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-[#007AFF] font-bold mt-1">•</span>
            <span className="text-sm text-gray-600">Each QR code contains a unique product identifier linked to the blockchain</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#007AFF] font-bold mt-1">•</span>
            <span className="text-sm text-gray-600">QR codes can only be generated for batches registered on blockchain</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#007AFF] font-bold mt-1">•</span>
            <span className="text-sm text-gray-600">Downloaded ZIP files contain high-resolution QR code images in PNG format</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#007AFF] font-bold mt-1">•</span>
            <span className="text-sm text-gray-600">Each QR code is scannable by consumers, pharmacies, and distributors</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default QRManagement
