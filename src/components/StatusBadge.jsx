import React from 'react'

const StatusBadge = ({ status, size = 'medium' }) => {
  const getStatusConfig = (status) => {
    const configs = {
      verified: { label: 'Verified', color: 'green' },
      pending: { label: 'Pending', color: 'orange' },
      suspicious: { label: 'Suspicious', color: 'red' },
      duplicate: { label: 'Duplicate', color: 'red' },
      genuine: { label: 'Genuine', color: 'green' },
      registered: { label: 'Registered', color: 'blue' },
      generated: { label: 'Generated', color: 'green' },
    }
    return configs[status.toLowerCase()] || { label: status, color: 'gray' }
  }

  const config = getStatusConfig(status)
  
  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-xs px-3 py-1',
    large: 'text-sm px-4 py-1.5'
  }

  const colorClasses = {
    green: 'bg-green-50 text-green-700 border border-green-200',
    red: 'bg-red-50 text-red-700 border border-red-200',
    orange: 'bg-orange-50 text-orange-700 border border-orange-200',
    blue: 'bg-blue-50 text-blue-700 border border-blue-200',
    gray: 'bg-gray-50 text-gray-600 border border-gray-200'
  }

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]} ${colorClasses[config.color]}`}>
      {config.label}
    </span>
  )
}

export default StatusBadge
