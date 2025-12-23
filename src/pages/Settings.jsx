import React, { useState } from 'react'
import StatusBadge from '../components/StatusBadge'
import './Settings.css'

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
    <div className="settings">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage manufacturer profile, blockchain settings, and user accounts</p>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <div className="section-header">
            <h2>Manufacturer Profile</h2>
            <p>Update your company information</p>
          </div>
          <div className="settings-card">
            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={manufacturerProfile.companyName}
                onChange={handleProfileChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="registrationNumber">Registration Number</label>
              <input
                type="text"
                id="registrationNumber"
                name="registrationNumber"
                value={manufacturerProfile.registrationNumber}
                onChange={handleProfileChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={manufacturerProfile.address}
                onChange={handleProfileChange}
                rows="3"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactEmail">Contact Email</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={manufacturerProfile.contactEmail}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactPhone">Contact Phone</label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={manufacturerProfile.contactPhone}
                  onChange={handleProfileChange}
                />
              </div>
            </div>
            <div className="form-actions">
              <button onClick={handleSaveProfile} className="save-btn">
                💾 Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <h2>Blockchain Settings</h2>
            <p>Ethereum blockchain configuration</p>
          </div>
          <div className="settings-card">
            <div className="blockchain-info">
              <div className="info-item">
                <span className="info-label">Network:</span>
                <span className="info-value">Ethereum Mainnet</span>
              </div>
              <div className="info-item">
                <span className="info-label">Smart Contract:</span>
                <span className="info-value">0x8ba1f109551bD432803012645Hac136c22C37e09</span>
              </div>
              <div className="info-item">
                <span className="info-label">Wallet Address:</span>
                <span className="info-value blockchain-address">
                  {manufacturerProfile.blockchainAddress}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Status:</span>
                <StatusBadge status="verified" />
              </div>
            </div>
            <div className="blockchain-note">
              <p>⚠️ Blockchain settings are read-only. Contact system administrator for changes.</p>
            </div>
          </div>
        </div>
      </div>

      {userRole === 'admin' && (
        <div className="settings-section">
          <div className="section-header">
            <h2>User Management</h2>
            <p>Manage user accounts and permissions</p>
            <button
              onClick={() => setShowAddUser(!showAddUser)}
              className="add-user-btn"
            >
              ➕ Add New User
            </button>
          </div>

          {showAddUser && (
            <div className="settings-card">
              <form onSubmit={handleAddUser} className="add-user-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="newUserName">Name</label>
                    <input
                      type="text"
                      id="newUserName"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newUserEmail">Email</label>
                    <input
                      type="email"
                      id="newUserEmail"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newUserRole">Role</label>
                    <select
                      id="newUserRole"
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                      <option value="analyst">Analyst</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-btn">Add User</button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddUser(false)
                      setNewUser({ name: '', email: '', role: 'analyst' })
                    }}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="settings-card">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge role-${user.role}`}>
                        {user.role === 'admin' ? 'Admin' : 'Analyst'}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={user.status} />
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="delete-btn"
                        disabled={user.role === 'admin' && users.filter(u => u.role === 'admin').length === 1}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings

