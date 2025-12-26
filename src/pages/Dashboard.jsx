import React from 'react'
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
import KPICard from '../components/KPICard'
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

const Dashboard = ({ userRole }) => {
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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">Real-time monitoring of pharmaceutical product authenticity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <KPICard
          title="Total Batches Registered"
          value={mockKPIs.totalBatches.toLocaleString()}
          icon="📦"
          color="blue"
          trend={{ type: 'up', value: '+12% from last month' }}
        />
        <KPICard
          title="Total Products Issued"
          value={mockKPIs.totalProducts.toLocaleString()}
          icon="💊"
          color="green"
          trend={{ type: 'up', value: '+8% from last month' }}
        />
        <KPICard
          title="Total QR Scans"
          value={mockKPIs.totalScans.toLocaleString()}
          icon="📱"
          color="blue"
          trend={{ type: 'up', value: '+15% from last month' }}
        />
        <KPICard
          title="Counterfeit Alerts"
          value={mockKPIs.counterfeitAlerts}
          icon="⚠️"
          color="red"
          trend={{ type: 'down', value: '-3 from last month' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">QR Scans Over Time</h3>
          <p className="text-sm text-gray-600 mb-4">Monthly scan activity trend</p>
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

export default Dashboard
