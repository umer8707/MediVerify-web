import React, { useState, useEffect } from 'react'
import { Line, Pie, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { IoBusinessOutline, IoTimeOutline, IoScanOutline, IoWarningOutline, IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5'
import KPICard from '../components/KPICard'
import StatusBadge from '../components/StatusBadge'
import { mockKPIs, mockScanData, mockGenuineVsSuspicious, mockTopCities } from '../data/mockData'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const AdminDashboard = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState([])
  const [allManufacturers, setAllManufacturers] = useState([])

  useEffect(() => {
    // Load manufacturer registrations from localStorage
    let registrations = JSON.parse(localStorage.getItem('manufacturerRegistrations') || '[]')
    
    // Initialize with sample data if empty (for demo purposes)
    if (registrations.length === 0) {
      registrations = [
        {
          id: 'REG-20241115001',
          companyName: 'MediPharm Solutions',
          licenseNumber: 'DRAP-2024-12345',
          contactEmail: 'contact@medipharm.com',
          status: 'pending',
          submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'REG-20241114001',
          companyName: 'HealthCare Manufacturing Ltd.',
          licenseNumber: 'DRAP-2024-12346',
          contactEmail: 'info@healthcaremfg.com',
          status: 'pending',
          submittedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'REG-20241112001',
          companyName: 'PharmaCorp Industries',
          licenseNumber: 'DRAP-2024-12340',
          contactEmail: 'admin@pharmacorp.com',
          status: 'approved',
          submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          approvedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
      localStorage.setItem('manufacturerRegistrations', JSON.stringify(registrations))
    }
    
    setPendingRegistrations(registrations.filter(r => r.status === 'pending'))
    setAllManufacturers(registrations.filter(r => r.status === 'approved'))
  }, [])

  const handleApprove = (registrationId) => {
    const registrations = JSON.parse(localStorage.getItem('manufacturerRegistrations') || '[]')
    const updated = registrations.map(r => 
      r.id === registrationId ? { ...r, status: 'approved', approvedAt: new Date().toISOString() } : r
    )
    localStorage.setItem('manufacturerRegistrations', JSON.stringify(updated))
    setPendingRegistrations(updated.filter(r => r.status === 'pending'))
    setAllManufacturers(updated.filter(r => r.status === 'approved'))
  }

  const handleReject = (registrationId) => {
    const registrations = JSON.parse(localStorage.getItem('manufacturerRegistrations') || '[]')
    const updated = registrations.map(r => 
      r.id === registrationId ? { ...r, status: 'rejected', rejectedAt: new Date().toISOString() } : r
    )
    localStorage.setItem('manufacturerRegistrations', JSON.stringify(updated))
    setPendingRegistrations(updated.filter(r => r.status === 'pending'))
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12
      }
    },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
      x: { grid: { display: false } }
    }
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: 12 }
    }
  }

  const adminKPIs = {
    totalManufacturers: allManufacturers.length,
    pendingApprovals: pendingRegistrations.length,
    totalScans: mockKPIs.totalScans,
    totalAlerts: mockKPIs.counterfeitAlerts
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">System-wide oversight and manufacturer approvals</p>
      </div>

      {/* Pending Approvals Section */}
      {pendingRegistrations.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <IoWarningOutline className="text-orange-500" />
              <span>Pending Manufacturer Approvals ({pendingRegistrations.length})</span>
            </h2>
          </div>
          <div className="space-y-4">
            {pendingRegistrations.map((reg) => (
              <div key={reg.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">{reg.companyName}</div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>License: <span className="font-mono">{reg.licenseNumber}</span></div>
                      <div>Email: {reg.contactEmail}</div>
                      <div className="text-xs text-gray-500">
                        Submitted: {new Date(reg.submittedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(reg.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
                    >
                      <IoCheckmarkCircle />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleReject(reg.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm flex items-center gap-2"
                    >
                      <IoCloseCircle />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <KPICard
          title="Total Manufacturers"
          value={adminKPIs.totalManufacturers.toLocaleString()}
          icon={IoBusinessOutline}
          color="blue"
          trend={{ type: 'up', value: `${pendingRegistrations.length} pending` }}
        />
        <KPICard
          title="Pending Approvals"
          value={adminKPIs.pendingApprovals.toLocaleString()}
          icon={IoTimeOutline}
          color="orange"
          trend={{ type: pendingRegistrations.length > 0 ? 'up' : 'neutral', value: 'Requires review' }}
        />
        <KPICard
          title="Total Scans"
          value={adminKPIs.totalScans.toLocaleString()}
          icon={IoScanOutline}
          color="blue"
          trend={{ type: 'up', value: '+15% from last month' }}
        />
        <KPICard
          title="Total Alerts"
          value={adminKPIs.totalAlerts}
          icon={IoWarningOutline}
          color="red"
          trend={{ type: 'down', value: '-3 from last month' }}
        />
      </div>

      {/* Approved Manufacturers List */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Approved Manufacturers</h3>
        </div>
        <div className="p-6">
          {allManufacturers.length === 0 ? (
            <div className="text-center py-8">
              <IoBusinessOutline className="text-5xl text-gray-300 mb-3" />
              <p className="text-gray-600">No approved manufacturers yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Company Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">License Number</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Contact Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allManufacturers.map((mfr) => (
                    <tr key={mfr.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{mfr.companyName}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 font-mono">{mfr.licenseNumber}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{mfr.contactEmail}</td>
                      <td className="px-4 py-4">
                        <StatusBadge status="approved" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">QR Scans Over Time</h3>
          <p className="text-sm text-gray-600 mb-4">System-wide scan activity trend</p>
          <div className="h-64">
            <Line data={mockScanData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Genuine vs Suspicious Scans</h3>
          <p className="text-sm text-gray-600 mb-4">Overall authenticity distribution</p>
          <div className="h-64">
            <Pie data={mockGenuineVsSuspicious} options={pieOptions} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Top Cities with Scan Activity</h3>
        <p className="text-sm text-gray-600 mb-4">Geographic distribution of product scans</p>
        <div className="h-64">
          <Bar data={mockTopCities} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

