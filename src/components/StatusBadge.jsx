import React from 'react'

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
  
  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-xs px-3 py-1',
    large: 'text-sm px-4 py-1.5'
  }

  const colorClasses = {
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    orange: 'bg-orange-100 text-orange-800',
    blue: 'bg-blue-100 text-blue-800',
    gray: 'bg-gray-100 text-gray-600'
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses[size]} ${colorClasses[config.color]}`}>
      {config.icon && <span>{config.icon}</span>}
      {config.label}
    </span>
  )
}

export default StatusBadge
