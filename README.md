# Pharmaceutical Authenticity System

A high-fidelity interactive web prototype for a **Blockchain & AI-Based Pharmaceutical Product Authenticity & Smart Verification System**.

This is a Final Year Project prototype designed for pharmaceutical manufacturers to manage product authenticity through blockchain technology.

## Features

### 🔐 Authentication
- Secure login with role-based access (Admin/Analyst)
- Session management with localStorage

### 📊 Dashboard
- Real-time KPI cards (Batches, Products, Scans, Alerts)
- Interactive charts (Line, Pie, Bar charts)
- Monthly trends and geographic distribution

### 📦 Batch Registration
- Register new pharmaceutical batches on blockchain
- Auto-generate batch IDs
- Digital signature support
- Blockchain hash generation

### 🔲 QR Code Management
- Generate QR codes for registered batches
- Download QR codes in ZIP format
- Track QR generation status

### 📱 Scan Activity & Traceability
- Monitor real-time QR code scans
- Filter by date, city, and status
- Track scans across supply chain (Manufacturer → Distributor → Pharmacy → Consumer)
- Geographic distribution statistics

### ⚠️ Counterfeit Alerts
- Real-time alerts for suspicious scans
- Severity-based alert classification
- Geographic hotspot visualization
- Detailed alert investigation

### 📈 Reports & Analytics
- Downloadable reports (PDF/CSV)
- Counterfeit trends analysis
- Supply chain scan flow
- Batch-wise risk assessment

### ⚙️ Settings
- Manufacturer profile management
- Blockchain wallet configuration
- User management (Admin only)

## Tech Stack

- **Frontend**: React.js 18
- **Routing**: React Router DOM v6
- **Charts**: Chart.js with react-chartjs-2
- **Build Tool**: Vite
- **Styling**: CSS3 with CSS Variables

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

### Login
- Use any email and password to login (mock authentication)
- Select role: **Admin** (full access) or **Analyst** (read-only)

### Admin Features
- Register new batches
- Generate QR codes
- Manage users
- Full access to all pages

### Analyst Features
- View dashboards and reports
- Monitor scan activity
- View alerts (read-only)

## Project Structure

```
authenticator/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Layout.jsx
│   │   ├── KPICard.jsx
│   │   └── StatusBadge.jsx
│   ├── pages/           # Page components
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── BatchRegistration.jsx
│   │   ├── QRManagement.jsx
│   │   ├── ScanActivity.jsx
│   │   ├── CounterfeitAlerts.jsx
│   │   ├── Reports.jsx
│   │   └── Settings.jsx
│   ├── data/            # Mock data
│   │   └── mockData.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Design System

### Colors
- **Primary Blue**: `#1e3a8a` - Main brand color
- **Success Green**: `#10b981` - Success states
- **Alert Red**: `#ef4444` - Alerts and errors
- **Warning Orange**: `#f59e0b` - Warnings
- **Light Gray**: `#f3f4f6` - Backgrounds
- **White**: `#ffffff` - Cards and surfaces

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: 700 weight
- **Body**: 400-500 weight

## Mock Data

All data is mock/placeholder data for demonstration purposes. The system includes:
- Sample batches and products
- Scan activity logs
- Counterfeit alerts
- Geographic data

## Notes

- This is a **prototype** - no real blockchain integration
- All data is stored in localStorage (session-based)
- Charts use Chart.js with mock data
- QR code generation/download is simulated
- Reports download shows alerts (not actual files)

## Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## License

This project is created for academic purposes (Final Year Project).

## Author

Computer Science Final Year Project

