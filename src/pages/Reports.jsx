import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { mockCounterfeitTrends } from '../data/mockData'
import './Reports.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Reports = ({ userRole }) => {
  const [selectedReport, setSelectedReport] = useState(null)

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12
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

  const handleDownload = (format) => {
    alert(`Downloading report in ${format.toUpperCase()} format...\n\n(In a real application, this would generate and download the actual report file)`)
  }

  const reportTypes = [
    {
      id: 'counterfeit-trends',
      title: 'Counterfeit Trends Report',
      description: 'Monthly analysis of counterfeit detection trends',
      icon: '📊'
    },
    {
      id: 'supply-chain',
      title: 'Supply Chain Scan Flow',
      description: 'Complete traceability report across the supply chain',
      icon: '🔄'
    },
    {
      id: 'batch-risk',
      title: 'Batch-wise Risk Level',
      description: 'Risk assessment for each registered batch',
      icon: '⚠️'
    },
    {
      id: 'geographic',
      title: 'Geographic Distribution',
      description: 'Scan activity and alerts by geographic region',
      icon: '🌍'
    }
  ]

  return (
    <div className="reports">
      <div className="page-header">
        <h1>Reports & Analytics</h1>
        <p>Generate comprehensive reports and analytics for your pharmaceutical products</p>
      </div>

      <div className="reports-grid">
        {reportTypes.map((report) => (
          <div key={report.id} className="report-card">
            <div className="report-icon">{report.icon}</div>
            <h3>{report.title}</h3>
            <p>{report.description}</p>
            <div className="report-actions">
              <button
                onClick={() => handleDownload('pdf')}
                className="report-btn primary"
              >
                📄 Download PDF
              </button>
              <button
                onClick={() => handleDownload('csv')}
                className="report-btn secondary"
              >
                📊 Download CSV
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Counterfeit Trends Over Time</h3>
            <p className="chart-subtitle">Monthly counterfeit alert detection</p>
          </div>
          <div className="chart-container">
            <Line data={mockCounterfeitTrends} options={chartOptions} />
          </div>
        </div>

        <div className="analytics-grid">
          <div className="analytics-card">
            <div className="analytics-header">
              <span className="analytics-icon">📈</span>
              <h4>Supply Chain Scan Flow</h4>
            </div>
            <div className="analytics-content">
              <div className="flow-item">
                <span className="flow-step">1</span>
                <div className="flow-details">
                  <strong>Manufacturer</strong>
                  <span>100% registered</span>
                </div>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-item">
                <span className="flow-step">2</span>
                <div className="flow-details">
                  <strong>Distributor</strong>
                  <span>87% scanned</span>
                </div>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-item">
                <span className="flow-step">3</span>
                <div className="flow-details">
                  <strong>Pharmacy</strong>
                  <span>92% scanned</span>
                </div>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-item">
                <span className="flow-step">4</span>
                <div className="flow-details">
                  <strong>Consumer</strong>
                  <span>65% scanned</span>
                </div>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <div className="analytics-header">
              <span className="analytics-icon">⚠️</span>
              <h4>Batch Risk Levels</h4>
            </div>
            <div className="analytics-content">
              <div className="risk-item">
                <div className="risk-batch">BATCH-2024-001</div>
                <div className="risk-level high">High Risk</div>
                <div className="risk-reason">2 suspicious scans detected</div>
              </div>
              <div className="risk-item">
                <div className="risk-batch">BATCH-2024-002</div>
                <div className="risk-level medium">Medium Risk</div>
                <div className="risk-reason">1 duplicate scan detected</div>
              </div>
              <div className="risk-item">
                <div className="risk-batch">BATCH-2024-003</div>
                <div className="risk-level low">Low Risk</div>
                <div className="risk-reason">All scans verified</div>
              </div>
              <div className="risk-item">
                <div className="risk-batch">BATCH-2024-004</div>
                <div className="risk-level low">Low Risk</div>
                <div className="risk-reason">No issues detected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports

