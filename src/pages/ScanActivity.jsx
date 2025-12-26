import React, { useState } from 'react'
import StatusBadge from '../components/StatusBadge'
import { mockScanLogs } from '../data/mockData'

const ScanActivity = ({ userRole }) => {
  const [scans] = useState(mockScanLogs)
  const [filters, setFilters] = useState({
    date: '',
    city: '',
    status: ''
  })

  const getRoleIcon = (role) => {
    const icons = {
      'Consumer': '👤',
      'Pharmacy': '🏥',
      'Distributor': '🚚'
    }
    return icons[role] || '📱'
  }

  const filteredScans = scans.filter(scan => {
    if (filters.date && !scan.dateTime.startsWith(filters.date)) return false
    if (filters.city && !scan.location.toLowerCase().includes(filters.city.toLowerCase())) return false
    if (filters.status && scan.status !== filters.status) return false
    return true
  })

  const uniqueCities = [...new Set(scans.map(s => s.location.split(',')[0]))]
  const uniqueStatuses = ['genuine', 'suspicious', 'duplicate']

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Scan Activity & Traceability</h1>
        <p className="text-gray-600">Monitor real-time QR code scan activity across the supply chain</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label htmlFor="filter-date" className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              id="filter-date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label htmlFor="filter-city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <select
              id="filter-city"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none"
            >
              <option value="">All Cities</option>
              {uniqueCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              id="filter-status"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none"
            >
              <option value="">All Statuses</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({ date: '', city: '', status: '' })}
              className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-600 pt-4 border-t border-gray-200">
          Showing {filteredScans.length} of {scans.length} scans
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Batch ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scan Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date & Time</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredScans.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-5xl opacity-50">🔍</span>
                      <p className="text-base font-medium text-gray-900">No scans found matching the filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredScans.map((scan, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <span className="font-mono font-semibold text-primary-blue text-sm">{scan.productId}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-mono font-semibold text-primary-blue text-sm">{scan.batchId}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getRoleIcon(scan.scanRole)}</span>
                        <span className="text-sm text-gray-700">{scan.scanRole}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span className="text-sm text-gray-700">{scan.location}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">{scan.dateTime}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={scan.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="text-3xl w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">📱</div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{scans.length}</div>
            <div className="text-sm text-gray-600 font-medium">Total Scans</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="text-3xl w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">✓</div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {scans.filter(s => s.status === 'genuine').length}
            </div>
            <div className="text-sm text-gray-600 font-medium">Genuine Scans</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="text-3xl w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">⚠️</div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {scans.filter(s => s.status === 'suspicious' || s.status === 'duplicate').length}
            </div>
            <div className="text-sm text-gray-600 font-medium">Suspicious/Duplicate</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="text-3xl w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">🌍</div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{uniqueCities.length}</div>
            <div className="text-sm text-gray-600 font-medium">Cities</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScanActivity
