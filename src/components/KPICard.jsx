import React from 'react'

const KPICard = ({ title, value, icon: Icon, trend, color = 'blue' }) => {
  const colorClasses = {
    blue: 'text-[#007AFF]',
    green: 'text-[#34C759]',
    red: 'text-[#FF3B30]',
    orange: 'text-[#FF9500]'
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className={`text-2xl ${colorClasses[color]}`} />}
        <span className="text-sm font-medium text-gray-600">{title}</span>
      </div>
      <div className={`text-3xl font-bold mb-2 ${colorClasses[color]}`}>
        {value}
      </div>
      {trend && (
        <div className={`text-xs font-medium ${
          trend.type === 'up' ? 'text-[#34C759]' : trend.type === 'down' ? 'text-[#FF3B30]' : 'text-gray-600'
        }`}>
          {trend.value}
        </div>
      )}
    </div>
  )
}

export default KPICard
