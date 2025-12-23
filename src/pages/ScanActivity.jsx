import React, { useState } from 'react'
import StatusBadge from '../components/StatusBadge'
import { mockScanLogs } from '../data/mockData'
import './ScanActivity.css'

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
    <div className="scan-activity">
      <div className="page-header">
        <h1>Scan Activity & Traceability</h1>
        <p>Monitor real-time QR code scan activity across the supply chain</p>
      </div>

      <div className="filters-card">
        <h3>Filters</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="filter-date">Date</label>
            <input
              type="date"
              id="filter-date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="filter-city">City</label>
            <select
              id="filter-city"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            >
              <option value="">All Cities</option>
              {uniqueCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filter-status">Status</label>
            <select
              id="filter-status"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Statuses</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <button
              onClick={() => setFilters({ date: '', city: '', status: '' })}
              className="clear-filters-btn"
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className="filter-results">
          Showing {filteredScans.length} of {scans.length} scans
        </div>
      </div>

      <div className="table-card">
        <table className="scans-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Batch ID</th>
              <th>Scan Role</th>
              <th>Location</th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredScans.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-state">
                  <div className="empty-message">
                    <span className="empty-icon">🔍</span>
                    <p>No scans found matching the filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredScans.map((scan, index) => (
                <tr key={index}>
                  <td>
                    <span className="product-id">{scan.productId}</span>
                  </td>
                  <td>
                    <span className="batch-id">{scan.batchId}</span>
                  </td>
                  <td>
                    <div className="role-cell">
                      <span className="role-icon">{getRoleIcon(scan.scanRole)}</span>
                      <span>{scan.scanRole}</span>
                    </div>
                  </td>
                  <td>
                    <div className="location-cell">
                      <span className="location-icon">📍</span>
                      <span>{scan.location}</span>
                    </div>
                  </td>
                  <td>{scan.dateTime}</td>
                  <td>
                    <StatusBadge status={scan.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📱</div>
          <div className="stat-content">
            <div className="stat-value">{scans.length}</div>
            <div className="stat-label">Total Scans</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <div className="stat-value">
              {scans.filter(s => s.status === 'genuine').length}
            </div>
            <div className="stat-label">Genuine Scans</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <div className="stat-value">
              {scans.filter(s => s.status === 'suspicious' || s.status === 'duplicate').length}
            </div>
            <div className="stat-label">Suspicious/Duplicate</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🌍</div>
          <div className="stat-content">
            <div className="stat-value">{uniqueCities.length}</div>
            <div className="stat-label">Cities</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScanActivity

