import React from 'react'
import { mockAlerts } from '../data/mockData'
import './CounterfeitAlerts.css'

const CounterfeitAlerts = ({ userRole }) => {
  const getSeverityColor = (severity) => {
    const colors = {
      high: 'red',
      medium: 'orange',
      low: 'yellow'
    }
    return colors[severity] || 'gray'
  }

  const getSeverityIcon = (severity) => {
    const icons = {
      high: '🔴',
      medium: '🟠',
      low: '🟡'
    }
    return icons[severity] || '⚪'
  }

  return (
    <div className="counterfeit-alerts">
      <div className="page-header">
        <h1>Counterfeit Alerts</h1>
        <p>Real-time alerts for suspicious product scans and potential counterfeits</p>
      </div>

      <div className="alerts-summary">
        <div className="summary-card high-priority">
          <div className="summary-icon">🔴</div>
          <div className="summary-content">
            <div className="summary-value">
              {mockAlerts.filter(a => a.severity === 'high').length}
            </div>
            <div className="summary-label">High Priority Alerts</div>
          </div>
        </div>
        <div className="summary-card medium-priority">
          <div className="summary-icon">🟠</div>
          <div className="summary-content">
            <div className="summary-value">
              {mockAlerts.filter(a => a.severity === 'medium').length}
            </div>
            <div className="summary-label">Medium Priority Alerts</div>
          </div>
        </div>
        <div className="summary-card total-alerts">
          <div className="summary-icon">⚠️</div>
          <div className="summary-content">
            <div className="summary-value">{mockAlerts.length}</div>
            <div className="summary-label">Total Active Alerts</div>
          </div>
        </div>
      </div>

      <div className="alerts-grid">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className={`alert-card alert-${getSeverityColor(alert.severity)}`}>
            <div className="alert-header">
              <div className="alert-id">
                <span className="alert-severity-icon">{getSeverityIcon(alert.severity)}</span>
                {alert.id}
              </div>
              <span className={`alert-severity-badge severity-${alert.severity}`}>
                {alert.severity.toUpperCase()}
              </span>
            </div>
            <div className="alert-body">
              <div className="alert-field">
                <span className="alert-field-label">📍 Location:</span>
                <span className="alert-field-value">{alert.location}</span>
              </div>
              <div className="alert-field">
                <span className="alert-field-label">📦 Batch ID:</span>
                <span className="alert-field-value">{alert.batchId}</span>
              </div>
              <div className="alert-field">
                <span className="alert-field-label">💊 Product ID:</span>
                <span className="alert-field-value">{alert.productId}</span>
              </div>
              <div className="alert-field">
                <span className="alert-field-label">⚠️ Reason:</span>
                <span className="alert-field-value alert-reason">{alert.reason}</span>
              </div>
              <div className="alert-field">
                <span className="alert-field-label">🕐 Detected:</span>
                <span className="alert-field-value">{alert.timestamp}</span>
              </div>
            </div>
            <div className="alert-actions">
              <button className="alert-action-btn primary">Investigate</button>
              <button className="alert-action-btn secondary">View Details</button>
            </div>
          </div>
        ))}
      </div>

      <div className="heatmap-card">
        <div className="heatmap-header">
          <h3>Geographic Hotspot Visualization</h3>
          <p>Areas with high counterfeit activity</p>
        </div>
        <div className="heatmap-placeholder">
          <div className="heatmap-map">
            <div className="hotspot" style={{ top: '30%', left: '25%' }}>
              <div className="hotspot-marker high"></div>
              <div className="hotspot-label">Faisalabad</div>
            </div>
            <div className="hotspot" style={{ top: '45%', left: '40%' }}>
              <div className="hotspot-marker high"></div>
              <div className="hotspot-label">Karachi</div>
            </div>
            <div className="hotspot" style={{ top: '35%', left: '50%' }}>
              <div className="hotspot-marker medium"></div>
              <div className="hotspot-label">Lahore</div>
            </div>
            <div className="heatmap-legend">
              <div className="legend-item">
                <div className="legend-marker high"></div>
                <span>High Activity</span>
              </div>
              <div className="legend-item">
                <div className="legend-marker medium"></div>
                <span>Medium Activity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CounterfeitAlerts

