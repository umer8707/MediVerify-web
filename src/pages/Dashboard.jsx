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
import './Dashboard.css'

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
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 13 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12
      }
    }
  }

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Real-time monitoring of pharmaceutical product authenticity</p>
      </div>

      <div className="kpi-grid">
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

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>QR Scans Over Time</h3>
            <p className="chart-subtitle">Monthly scan activity trend</p>
          </div>
          <div className="chart-container">
            <Line data={mockScanData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Genuine vs Suspicious Scans</h3>
            <p className="chart-subtitle">Overall authenticity distribution</p>
          </div>
          <div className="chart-container">
            <Pie data={mockGenuineVsSuspicious} options={pieOptions} />
          </div>
        </div>

        <div className="chart-card chart-card-full">
          <div className="chart-header">
            <h3>Top Cities with Scan Activity</h3>
            <p className="chart-subtitle">Geographic distribution of product scans</p>
          </div>
          <div className="chart-container">
            <Bar data={mockTopCities} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

