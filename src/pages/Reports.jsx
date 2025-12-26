import React from 'react'
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
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: 12 }
    },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
      x: { grid: { display: false } }
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
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Generate comprehensive reports and analytics for your pharmaceutical products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {reportTypes.map((report) => (
          <div key={report.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-5xl mb-4">{report.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">{report.description}</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleDownload('pdf')}
                className="w-full px-4 py-2 bg-primary-blue text-white rounded-lg font-medium hover:bg-deep-blue transition-colors text-sm"
              >
                📄 Download PDF
              </button>
              <button
                onClick={() => handleDownload('csv')}
                className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                📊 Download CSV
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Counterfeit Trends Over Time</h3>
          <p className="text-sm text-gray-600 mb-4">Monthly counterfeit alert detection</p>
          <div className="h-64">
            <Line data={mockCounterfeitTrends} options={chartOptions} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <span className="text-2xl">📈</span>
              <h4 className="text-lg font-semibold text-gray-900">Supply Chain Scan Flow</h4>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center font-semibold text-sm">1</span>
                <div className="flex-1">
                  <strong className="text-sm text-gray-900 block">Manufacturer</strong>
                  <span className="text-xs text-gray-600">100% registered</span>
                </div>
              </div>
              <div className="text-center text-primary-blue text-xl">↓</div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center font-semibold text-sm">2</span>
                <div className="flex-1">
                  <strong className="text-sm text-gray-900 block">Distributor</strong>
                  <span className="text-xs text-gray-600">87% scanned</span>
                </div>
              </div>
              <div className="text-center text-primary-blue text-xl">↓</div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center font-semibold text-sm">3</span>
                <div className="flex-1">
                  <strong className="text-sm text-gray-900 block">Pharmacy</strong>
                  <span className="text-xs text-gray-600">92% scanned</span>
                </div>
              </div>
              <div className="text-center text-primary-blue text-xl">↓</div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center font-semibold text-sm">4</span>
                <div className="flex-1">
                  <strong className="text-sm text-gray-900 block">Consumer</strong>
                  <span className="text-xs text-gray-600">65% scanned</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <span className="text-2xl">⚠️</span>
              <h4 className="text-lg font-semibold text-gray-900">Batch Risk Levels</h4>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-red-500">
                <div className="font-mono text-sm font-semibold text-primary-blue mb-2">BATCH-2024-001</div>
                <div className="text-sm font-semibold text-red-600 mb-1">High Risk</div>
                <div className="text-xs text-gray-600">2 suspicious scans detected</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-orange-500">
                <div className="font-mono text-sm font-semibold text-primary-blue mb-2">BATCH-2024-002</div>
                <div className="text-sm font-semibold text-orange-600 mb-1">Medium Risk</div>
                <div className="text-xs text-gray-600">1 duplicate scan detected</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-green-500">
                <div className="font-mono text-sm font-semibold text-primary-blue mb-2">BATCH-2024-003</div>
                <div className="text-sm font-semibold text-green-600 mb-1">Low Risk</div>
                <div className="text-xs text-gray-600">All scans verified</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-green-500">
                <div className="font-mono text-sm font-semibold text-primary-blue mb-2">BATCH-2024-004</div>
                <div className="text-sm font-semibold text-green-600 mb-1">Low Risk</div>
                <div className="text-xs text-gray-600">No issues detected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
