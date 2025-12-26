import React from 'react'

const KPICard = ({ title, value, icon, trend, color = 'blue' }) => {
  const colorClasses = {
    blue: 'text-primary-blue',
    green: 'text-success-green',
    red: 'text-alert-red',
    orange: 'text-warning-orange'
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm font-medium text-gray-600">{title}</span>
      </div>
      <div className={`text-3xl font-bold mb-2 ${colorClasses[color]}`}>
        {value}
      </div>
      {trend && (
        <div className={`text-xs font-medium ${
          trend.type === 'up' ? 'text-success-green' : 'text-alert-red'
        }`}>
          {trend.value}
        </div>
      )}
    </div>
  )
}

export default KPICard
