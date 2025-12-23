import React from 'react'
import './KPICard.css'

const KPICard = ({ title, value, icon, trend, color = 'blue' }) => {
  return (
    <div className={`kpi-card kpi-card-${color}`}>
      <div className="kpi-header">
        <span className="kpi-icon">{icon}</span>
        <span className="kpi-title">{title}</span>
      </div>
      <div className="kpi-value">{value}</div>
      {trend && (
        <div className={`kpi-trend kpi-trend-${trend.type}`}>
          {trend.value}
        </div>
      )}
    </div>
  )
}

export default KPICard

