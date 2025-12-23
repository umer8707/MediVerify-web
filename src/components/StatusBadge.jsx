import React from 'react'
import './StatusBadge.css'

const StatusBadge = ({ status, size = 'medium' }) => {
  const getStatusConfig = (status) => {
    const configs = {
      verified: { label: 'Verified', color: 'green', icon: '✓' },
      pending: { label: 'Pending', color: 'orange', icon: '⏳' },
      suspicious: { label: 'Suspicious', color: 'red', icon: '⚠️' },
      duplicate: { label: 'Duplicate', color: 'red', icon: '🔄' },
      genuine: { label: 'Genuine', color: 'green', icon: '✓' },
      registered: { label: 'Registered', color: 'blue', icon: '✓' },
      generated: { label: 'Generated', color: 'green', icon: '✓' },
    }
    return configs[status.toLowerCase()] || { label: status, color: 'gray', icon: '' }
  }

  const config = getStatusConfig(status)

  return (
    <span className={`status-badge status-badge-${config.color} status-badge-${size}`}>
      {config.icon && <span className="status-icon">{config.icon}</span>}
      {config.label}
    </span>
  )
}

export default StatusBadge

