import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  IoShieldCheckmark, 
  IoStatsChart, 
  IoCubeOutline, 
  IoQrCodeOutline, 
  IoScanOutline, 
  IoWarningOutline, 
  IoDocumentTextOutline, 
  IoSettingsOutline,
  IoLogOutOutline,
  IoMenuOutline
} from 'react-icons/io5'

const Layout = ({ children, userRole, onLogout }) => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: IoStatsChart },
    { path: '/batch-registration', label: 'Batch Registration', icon: IoCubeOutline, manufacturerOnly: true },
    { path: '/qr-management', label: 'QR Management', icon: IoQrCodeOutline, manufacturerOnly: true },
    { path: '/scan-activity', label: 'Scan Activity', icon: IoScanOutline },
    { path: '/counterfeit-alerts', label: 'Alerts', icon: IoWarningOutline },
    { path: '/reports', label: 'Reports', icon: IoDocumentTextOutline },
    { path: '/settings', label: 'Settings', icon: IoSettingsOutline },
  ]

  const filteredNavItems = navItems.filter(item => {
    if (item.manufacturerOnly && userRole === 'admin') return false
    if (item.adminOnly && userRole !== 'admin') return false
    return true
  })

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        aria-label="Toggle menu"
      >
        <IoMenuOutline className="text-xl text-gray-700" />
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white border-r border-gray-200
        flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <IoShieldCheckmark className="text-3xl text-[#007AFF]" />
            <div>
              <h2 className="text-xl font-bold text-[#007AFF]">MediVerify</h2>
              <p className="text-xs text-gray-500">Verify Medicines. Protect Lives.</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {filteredNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 mb-2 rounded-lg
                transition-colors duration-200
                ${location.pathname === item.path
                  ? 'bg-blue-50 text-[#007AFF] font-medium border-l-4 border-[#007AFF]'
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              <item.icon className={`text-lg ${location.pathname === item.path ? 'text-[#007AFF]' : 'text-gray-500'}`} />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200 space-y-3">
          <div className="px-4">
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              {userRole === 'admin' ? 'Admin / Regulator' : 'Manufacturer'}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <IoLogOutOutline className="text-base" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}

export default Layout
