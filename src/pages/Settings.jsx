import React, { useState } from 'react'
import { IoSaveOutline, IoWarningOutline, IoAddOutline, IoTrashOutline } from 'react-icons/io5'
import StatusBadge from '../components/StatusBadge'

const Settings = ({ userRole }) => {
  const [manufacturerProfile, setManufacturerProfile] = useState({
    companyName: 'PharmaCorp Industries',
    registrationNumber: 'REG-2024-001',
    address: '123 Healthcare Avenue, Karachi, Pakistan',
    contactEmail: 'admin@pharmacorp.com',
    contactPhone: '+92-300-1234567',
    blockchainAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5'
  })

  const [users, setUsers] = useState([
    { id: 1, name: 'John Admin', email: 'john@pharmacorp.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Sarah Analyst', email: 'sarah@pharmacorp.com', role: 'analyst', status: 'active' },
    { id: 3, name: 'Mike Analyst', email: 'mike@pharmacorp.com', role: 'analyst', status: 'active' }
  ])

  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'analyst'
  })

  const handleProfileChange = (e) => {
    setManufacturerProfile({
      ...manufacturerProfile,
      [e.target.name]: e.target.value
    })
  }

  const handleSaveProfile = () => {
    alert('Manufacturer profile updated successfully!')
  }

  const handleAddUser = (e) => {
    e.preventDefault()
    const user = {
      id: users.length + 1,
      ...newUser,
      status: 'active'
    }
    setUsers([...users, user])
    setNewUser({ name: '', email: '', role: 'analyst' })
    setShowAddUser(false)
    alert('User added successfully!')
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId))
      alert('User deleted successfully!')
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage manufacturer profile, blockchain settings, and user accounts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Manufacturer Profile</h2>
            <p className="text-sm text-gray-600">Update your company information</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="space-y-5">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={manufacturerProfile.companyName}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={manufacturerProfile.registrationNumber}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={manufacturerProfile.address}
                  onChange={handleProfileChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition resize-y"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={manufacturerProfile.contactEmail}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={manufacturerProfile.contactPhone}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={handleSaveProfile}
                  className="w-full px-6 py-3 bg-[#007AFF] text-white rounded-lg font-semibold hover:bg-[#0051D5] transition-colors"
                >
                  <span className="flex items-center justify-center gap-2">
                    <IoSaveOutline />
                    <span>Save Changes</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Blockchain Settings</h2>
            <p className="text-sm text-gray-600">Ethereum blockchain configuration</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">Network:</span>
                <span className="text-sm font-semibold text-gray-900">Ethereum Mainnet</span>
              </div>
              <div className="flex justify-between items-start py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">Smart Contract:</span>
                <span className="text-xs font-mono text-[#007AFF] break-all text-right">0x8ba1f109551bD432803012645Hac136c22C37e09</span>
              </div>
              <div className="flex justify-between items-start py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">Wallet Address:</span>
                <span className="text-xs font-mono text-[#007AFF] break-all text-right">
                  {manufacturerProfile.blockchainAddress}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <StatusBadge status="verified" />
              </div>
            </div>
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-xs text-yellow-800 flex items-start gap-2">
                <IoWarningOutline className="text-base flex-shrink-0 mt-0.5" />
                <span>Blockchain settings are read-only. Contact system administrator for changes.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {userRole === 'admin' && (
        <div>
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">User Management</h2>
              <p className="text-sm text-gray-600">Manage user accounts and permissions</p>
            </div>
            <button
              onClick={() => setShowAddUser(!showAddUser)}
              className="px-4 py-2 bg-[#007AFF] text-white rounded-lg font-medium hover:bg-[#0051D5] transition-colors text-sm"
            >
              <span className="flex items-center gap-2">
                <IoAddOutline />
                <span>Add New User</span>
              </span>
            </button>
          </div>

          {showAddUser && (
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <form onSubmit={handleAddUser} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="newUserName" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      id="newUserName"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="newUserEmail" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="newUserEmail"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="newUserRole" className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                      id="newUserRole"
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none transition"
                    >
                      <option value="analyst">Analyst</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#007AFF] text-white rounded-lg font-semibold hover:bg-[#0051D5] transition-colors"
                  >
                    Add User
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddUser(false)
                      setNewUser({ name: '', email: '', role: 'analyst' })
                    }}
                    className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-700">{user.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{user.email}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {user.role === 'admin' ? 'Admin' : 'Analyst'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="px-3 py-1 text-xs text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={user.role === 'admin' && users.filter(u => u.role === 'admin').length === 1}
                        >
                          <span className="flex items-center gap-1">
                            <IoTrashOutline />
                            <span>Delete</span>
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
