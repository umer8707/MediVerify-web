// Mock data for the pharmaceutical authenticity system

export const mockKPIs = {
  totalBatches: 1247,
  totalProducts: 45892,
  totalScans: 89234,
  counterfeitAlerts: 23
}

export const mockScanData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'QR Scans',
      data: [3200, 4100, 3800, 5200, 6100, 7200, 8900, 10200, 9800, 11200, 12400, 13500],
      borderColor: '#007AFF',
      backgroundColor: 'rgba(0, 122, 255, 0.1)',
      tension: 0.4
    }
  ]
}

export const mockGenuineVsSuspicious = {
  labels: ['Genuine', 'Suspicious'],
  datasets: [
    {
      data: [89211, 23],
      backgroundColor: ['#34C759', '#FF3B30'],
      borderWidth: 0
    }
  ]
}

export const mockTopCities = {
  labels: ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi'],
  datasets: [
    {
      label: 'Scans',
      data: [15200, 12800, 9800, 7200, 6100],
      backgroundColor: '#007AFF'
    }
  ]
}

export const mockBatches = [
  {
    id: 'BATCH-2024-001',
    productName: 'Paracetamol 500mg',
    quantity: 10000,
    manufacturingDate: '2024-01-15',
    expiryDate: '2026-01-15',
    blockchainStatus: 'registered',
    qrStatus: 'generated'
  },
  {
    id: 'BATCH-2024-002',
    productName: 'Amoxicillin 250mg',
    quantity: 8500,
    manufacturingDate: '2024-02-10',
    expiryDate: '2026-02-10',
    blockchainStatus: 'registered',
    qrStatus: 'generated'
  },
  {
    id: 'BATCH-2024-003',
    productName: 'Ibuprofen 400mg',
    quantity: 12000,
    manufacturingDate: '2024-03-05',
    expiryDate: '2026-03-05',
    blockchainStatus: 'registered',
    qrStatus: 'pending'
  },
  {
    id: 'BATCH-2024-004',
    productName: 'Aspirin 100mg',
    quantity: 15000,
    manufacturingDate: '2024-03-20',
    expiryDate: '2026-03-20',
    blockchainStatus: 'pending',
    qrStatus: 'pending'
  },
  {
    id: 'BATCH-2024-005',
    productName: 'Ciprofloxacin 500mg',
    quantity: 7500,
    manufacturingDate: '2024-04-01',
    expiryDate: '2026-04-01',
    blockchainStatus: 'registered',
    qrStatus: 'generated'
  }
]

export const mockScanLogs = [
  {
    productId: 'PROD-001-2024-001',
    batchId: 'BATCH-2024-001',
    scanRole: 'Consumer',
    location: 'Karachi, Pakistan',
    dateTime: '2024-11-15 14:32:15',
    status: 'genuine'
  },
  {
    productId: 'PROD-002-2024-001',
    batchId: 'BATCH-2024-001',
    scanRole: 'Pharmacy',
    location: 'Lahore, Pakistan',
    dateTime: '2024-11-15 13:45:22',
    status: 'genuine'
  },
  {
    productId: 'PROD-003-2024-002',
    batchId: 'BATCH-2024-002',
    scanRole: 'Distributor',
    location: 'Islamabad, Pakistan',
    dateTime: '2024-11-15 12:18:45',
    status: 'genuine'
  },
  {
    productId: 'PROD-004-2024-001',
    batchId: 'BATCH-2024-001',
    scanRole: 'Consumer',
    location: 'Faisalabad, Pakistan',
    dateTime: '2024-11-15 11:30:10',
    status: 'suspicious'
  },
  {
    productId: 'PROD-005-2024-003',
    batchId: 'BATCH-2024-003',
    scanRole: 'Pharmacy',
    location: 'Rawalpindi, Pakistan',
    dateTime: '2024-11-15 10:15:33',
    status: 'genuine'
  },
  {
    productId: 'PROD-006-2024-002',
    batchId: 'BATCH-2024-002',
    scanRole: 'Consumer',
    location: 'Karachi, Pakistan',
    dateTime: '2024-11-14 18:45:20',
    status: 'duplicate'
  },
  {
    productId: 'PROD-007-2024-001',
    batchId: 'BATCH-2024-001',
    scanRole: 'Distributor',
    location: 'Lahore, Pakistan',
    dateTime: '2024-11-14 16:22:11',
    status: 'genuine'
  },
  {
    productId: 'PROD-008-2024-004',
    batchId: 'BATCH-2024-004',
    scanRole: 'Pharmacy',
    location: 'Islamabad, Pakistan',
    dateTime: '2024-11-14 15:10:05',
    status: 'genuine'
  }
]

export const mockAlerts = [
  {
    id: 'ALERT-001',
    location: 'Faisalabad, Pakistan',
    batchId: 'BATCH-2024-001',
    productId: 'PROD-004-2024-001',
    reason: 'Duplicate QR Code',
    severity: 'high',
    timestamp: '2024-11-15 11:30:10'
  },
  {
    id: 'ALERT-002',
    location: 'Karachi, Pakistan',
    batchId: 'BATCH-2024-002',
    productId: 'PROD-006-2024-002',
    reason: 'Invalid Record',
    severity: 'high',
    timestamp: '2024-11-14 18:45:20'
  },
  {
    id: 'ALERT-003',
    location: 'Lahore, Pakistan',
    batchId: 'BATCH-2024-003',
    productId: 'PROD-009-2024-003',
    reason: 'Suspicious Scan Pattern',
    severity: 'medium',
    timestamp: '2024-11-13 14:20:15'
  }
]

export const mockCounterfeitTrends = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
  datasets: [
    {
      label: 'Counterfeit Alerts',
      data: [2, 1, 3, 2, 4, 3, 2, 1, 3, 2, 1],
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.4
    }
  ]
}

// Sample manufacturer registrations (for admin approval flow)
export const mockManufacturerRegistrations = [
  {
    id: 'REG-20241115001',
    companyName: 'MediPharm Solutions',
    licenseNumber: 'DRAP-2024-12345',
    contactEmail: 'contact@medipharm.com',
    status: 'pending',
    submittedAt: '2024-11-10T10:30:00Z'
  },
  {
    id: 'REG-20241114001',
    companyName: 'HealthCare Manufacturing Ltd.',
    licenseNumber: 'DRAP-2024-12346',
    contactEmail: 'info@healthcaremfg.com',
    status: 'pending',
    submittedAt: '2024-11-09T14:20:00Z'
  },
  {
    id: 'REG-20241112001',
    companyName: 'PharmaCorp Industries',
    licenseNumber: 'DRAP-2024-12340',
    contactEmail: 'admin@pharmacorp.com',
    status: 'approved',
    submittedAt: '2024-11-05T09:15:00Z',
    approvedAt: '2024-11-08T11:00:00Z'
  }
]

