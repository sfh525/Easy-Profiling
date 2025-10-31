# Project Structure

```
PRPL/
│
├── 📄 README.md                    # Comprehensive documentation
├── 📄 QUICKSTART.md                # 5-minute setup guide
├── 📄 PROJECT_STRUCTURE.md         # This file
├── 🔧 SETUP.sh                     # Automated setup script
├── 🐍 create_sample_data.py        # Generate test datasets
├── 📄 .gitignore                   # Git ignore rules
│
├── 🔙 backend/                     # FastAPI Backend
│   ├── 📄 main.py                  # Main API application
│   ├── 📄 requirements.txt         # Python dependencies
│   └── 🔧 run.sh                   # Backend startup script
│
└── 🎨 frontend/                    # React Frontend
    ├── 📄 index.html               # HTML entry point
    ├── 📄 package.json             # Node.js dependencies
    ├── 📄 vite.config.js           # Vite configuration
    ├── 📄 tailwind.config.js       # Tailwind CSS config
    ├── 📄 postcss.config.js        # PostCSS config
    ├── 🔧 run.sh                   # Frontend startup script
    │
    └── 📁 src/
        ├── 📄 main.jsx             # React entry point
        ├── 📄 App.jsx              # Main App component
        ├── 📄 index.css            # Global styles (Tailwind)
        │
        └── 📁 components/
            ├── 📄 FileUpload.jsx       # File upload UI
            ├── 📄 DataInsights.jsx     # Data overview display
            ├── 📄 Recommendations.jsx  # Smart recommendations UI
            └── 📄 ReportViewer.jsx     # Full report viewer
```

## 📦 Key Files Explained

### Backend Files

- **`main.py`**: The heart of the backend
  - FastAPI application with all endpoints
  - Data analysis and profiling logic
  - Recommendation engine
  - CORS configuration for frontend communication

- **`requirements.txt`**: Python dependencies
  - fastapi: Web framework
  - uvicorn: ASGI server
  - pandas: Data manipulation
  - ydata-profiling: Automated profiling
  - openpyxl: Excel support

- **`run.sh`**: Convenience script
  - Activates virtual environment
  - Starts the server
  - Makes setup easier

### Frontend Files

- **`App.jsx`**: Main application component
  - Tab navigation
  - State management
  - API communication
  - Layout structure

- **`components/FileUpload.jsx`**: File upload interface
  - Drag and drop functionality
  - File validation
  - Upload progress
  - Beautiful UI

- **`components/DataInsights.jsx`**: Data overview
  - Key metrics display
  - Missing data visualization
  - Data types breakdown
  - Summary statistics

- **`components/Recommendations.jsx`**: Smart recommendations
  - Categorized suggestions
  - Expandable details
  - Color-coded priorities
  - Actionable advice

- **`components/ReportViewer.jsx`**: Full report display
  - Embedded pandas-profiling report
  - Interactive visualizations
  - Navigation tips

### Configuration Files

- **`vite.config.js`**: Build tool configuration
- **`tailwind.config.js`**: CSS framework settings
- **`postcss.config.js`**: CSS processing
- **`package.json`**: Node.js dependencies and scripts

## 🔄 Data Flow

```
User uploads file
       ↓
FileUpload.jsx
       ↓
POST /upload (backend)
       ↓
Pandas processes data
       ↓
ydata-profiling generates report
       ↓
Recommendation engine analyzes
       ↓
Returns: report_id, insights, recommendations
       ↓
App.jsx receives data
       ↓
User can view:
  - DataInsights.jsx (Overview)
  - Recommendations.jsx (Advice)
  - ReportViewer.jsx (Full Report)
```

## 🌐 API Endpoints

- `GET /` - API information
- `POST /upload` - Upload and process file
- `GET /report/{report_id}` - HTML report
- `GET /insights/{report_id}` - JSON insights
- `GET /reports` - List all reports
- `DELETE /report/{report_id}` - Delete report

## 🎨 UI Components Hierarchy

```
App
├── Header (with logo and reset button)
├── Error Display (conditional)
├── FileUpload (initial state)
│   ├── Upload Area
│   ├── Features List
│   └── Info Cards
└── Results Container (after upload)
    ├── Tab Navigation
    │   ├── Data Insights Tab
    │   ├── Recommendations Tab
    │   └── Full Report Tab
    └── Tab Content
        ├── DataInsights
        │   ├── Overview Cards
        │   ├── Missing Data Section
        │   ├── Data Types Grid
        │   └── Summary Stats
        ├── Recommendations
        │   ├── Summary Stats
        │   ├── Grouped by Type
        │   └── Expandable Cards
        └── ReportViewer
            ├── Action Buttons
            ├── Info Banner
            └── Embedded iframe
```

## 🚀 Technology Stack

### Backend
- **Framework**: FastAPI
- **Server**: Uvicorn (ASGI)
- **Data Processing**: pandas, numpy
- **Profiling**: ydata-profiling
- **File Handling**: python-multipart

### Frontend
- **UI Library**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📊 Features Implemented

✅ File upload (drag & drop + click)
✅ CSV and Excel support
✅ Comprehensive data profiling
✅ Missing data analysis
✅ Duplicate detection
✅ Data type analysis
✅ Memory usage tracking
✅ Smart recommendations (12+ types)
✅ Interactive visualizations
✅ Professional, responsive UI
✅ Real-time processing
✅ Error handling
✅ Loading states
✅ Expandable details
✅ Color-coded priorities

## 🎯 Design Principles

1. **User-Friendly**: No coding required, intuitive interface
2. **Professional**: Clean, modern design with Tailwind CSS
3. **Informative**: Clear insights and actionable recommendations
4. **Fast**: Optimized for quick processing
5. **Accessible**: Works for technical and non-technical users
6. **Comprehensive**: Full pandas-profiling integration
7. **Maintainable**: Well-structured, documented code

