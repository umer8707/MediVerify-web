import React from 'react'
import { mockAlerts } from '../data/mockData'

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

  const getSeverityBorderColor = (severity) => {
    const colors = {
      high: 'border-l-red-500',
      medium: 'border-l-orange-500',
      low: 'border-l-yellow-500'
    }
    return colors[severity] || 'border-l-gray-500'
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Counterfeit Alerts</h1>
        <p className="text-gray-600">Real-time alerts for suspicious product scans and potential counterfeits</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500 flex items-center gap-4">
          <div className="text-3xl w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">🔴</div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {mockAlerts.filter(a => a.severity === 'high').length}
            </div>
            <div className="text-sm text-gray-600 font-medium">High Priority Alerts</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-orange-500 flex items-center gap-4">
          <div className="text-3xl w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">🟠</div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {mockAlerts.filter(a => a.severity === 'medium').length}
            </div>
            <div className="text-sm text-gray-600 font-medium">Medium Priority Alerts</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-primary-blue flex items-center gap-4">
          <div className="text-3xl w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">⚠️</div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{mockAlerts.length}</div>
            <div className="text-sm text-gray-600 font-medium">Total Active Alerts</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${getSeverityBorderColor(alert.severity)} hover:shadow-md transition-shadow`}>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2 font-mono text-sm font-semibold text-gray-900">
                <span>{getSeverityIcon(alert.severity)}</span>
                {alert.id}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                alert.severity === 'medium' ? 'bg-orange-100 text-orange-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {alert.severity}
              </span>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium text-gray-600">📍 Location:</span>
                <span className="text-sm font-semibold text-gray-900 text-right">{alert.location}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium text-gray-600">📦 Batch ID:</span>
                <span className="text-sm font-semibold text-gray-900 font-mono">{alert.batchId}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium text-gray-600">💊 Product ID:</span>
                <span className="text-sm font-semibold text-gray-900 font-mono">{alert.productId}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium text-gray-600">⚠️ Reason:</span>
                <span className="text-sm font-semibold text-red-600 text-right">{alert.reason}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium text-gray-600">🕐 Detected:</span>
                <span className="text-sm font-semibold text-gray-900">{alert.timestamp}</span>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button className="flex-1 px-4 py-2 bg-primary-blue text-white rounded-lg font-medium hover:bg-deep-blue transition-colors text-sm">
                Investigate
              </button>
              <button className="flex-1 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Geographic Hotspot Visualization</h3>
          <p className="text-sm text-gray-600">Areas with high counterfeit activity</p>
        </div>
        <div className="relative">
          <div className="w-full h-64 sm:h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border-2 border-gray-300 relative overflow-hidden">
            <div className="absolute top-[30%] left-[25%] transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-red-500 rounded-full border-3 border-white shadow-lg animate-pulse"></div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                Faisalabad
              </div>
            </div>
            <div className="absolute top-[45%] left-[40%] transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-red-500 rounded-full border-3 border-white shadow-lg animate-pulse"></div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                Karachi
              </div>
            </div>
            <div className="absolute top-[35%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-orange-500 rounded-full border-3 border-white shadow-lg animate-pulse"></div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                Lahore
              </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                  <span className="text-xs text-gray-600">High Activity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white"></div>
                  <span className="text-xs text-gray-600">Medium Activity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CounterfeitAlerts
