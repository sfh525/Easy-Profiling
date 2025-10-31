# Data Profiler - Professional Data Analysis Tool

A full-stack web application that allows users to upload datasets (CSV/Excel) and get comprehensive data profiling, quality analysis, and actionable recommendations - all without writing a single line of code!

## 🌟 Features

- **Easy File Upload**: Simple drag-and-drop or click-to-upload interface for CSV and Excel files
- **Comprehensive Data Profiling**: Powered by ydata-profiling (pandas-profiling)
- **Data Quality Analysis**: Automatic detection of:
  - Missing values and their patterns
  - Duplicate rows
  - Data type issues
  - Memory usage optimization opportunities
- **Smart Recommendations**: AI-powered suggestions for:
  - Data cleaning strategies
  - Missing data imputation
  - Feature engineering opportunities
  - Data type conversions
  - Performance optimizations
- **Interactive Visualizations**: Beautiful charts and graphs for data distributions, correlations, and more
- **Professional UI**: Modern, responsive design built with React and Tailwind CSS

## 🏗️ Tech Stack

### Backend
- **FastAPI**: High-performance Python web framework
- **pandas**: Data manipulation and analysis
- **ydata-profiling**: Automated data profiling
- **uvicorn**: ASGI server

### Frontend
- **React 18**: Modern UI library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client
- **Lucide React**: Beautiful icons

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone or Navigate to the Project Directory

```bash
cd /Users/salmanfaizhidayat/Desktop/PRPL
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

## 🎯 Running the Application

You'll need two terminal windows/tabs - one for the backend and one for the frontend.

### Terminal 1: Start the Backend

```bash
cd backend
source venv/bin/activate  # Activate virtual environment
python main.py
```

The backend will start on `http://localhost:8000`

### Terminal 2: Start the Frontend

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

### Access the Application

Open your browser and navigate to: `http://localhost:3000`

## 📖 Usage Guide

### Step 1: Upload Your Data

1. Click the upload area or drag and drop your file
2. Supported formats: CSV, Excel (.xlsx, .xls)
3. Maximum file size: 100MB
4. Maximum rows: 1 million

### Step 2: Review Data Insights

After upload, you'll see:
- **Data Overview**: Row count, column count, duplicates, memory usage
- **Missing Data Analysis**: Visual representation of missing values
- **Data Types**: Overview of all column data types
- **Quick Summary**: Key statistics at a glance

### Step 3: Check Recommendations

Navigate to the Recommendations tab to see:
- **Critical Issues**: Urgent data quality problems (>50% missing data, etc.)
- **Warnings**: Important issues to address (10-50% missing data, duplicates, etc.)
- **Informational**: Optimization opportunities and suggestions
- **Success**: Confirmation of good data quality

Each recommendation includes:
- Category (Missing Data, Data Quality, Optimization, etc.)
- Description of the issue
- Actionable steps to resolve it

### Step 4: Explore the Full Report

The Full Report tab provides:
- Detailed statistics for each column
- Distribution plots and histograms
- Correlation matrices
- Interaction effects
- Missing data patterns
- And much more!

## 🎨 Screenshots

### Upload Interface
Professional drag-and-drop interface with file validation.

### Data Insights Dashboard
Comprehensive overview of your dataset's quality and characteristics.

### Smart Recommendations
Actionable advice for data cleaning and preprocessing.

### Full Profiling Report
Interactive ydata-profiling report embedded in the application.

## 🔧 API Endpoints

The backend exposes the following REST API endpoints:

- `GET /` - API information
- `POST /upload` - Upload file and generate profile
- `GET /report/{report_id}` - Get HTML profiling report
- `GET /insights/{report_id}` - Get insights and recommendations
- `GET /reports` - List all reports
- `DELETE /report/{report_id}` - Delete a report

## 📊 Example Use Cases

1. **Data Scientists**: Quickly profile new datasets before starting analysis
2. **Business Analysts**: Understand data quality without coding
3. **Data Engineers**: Identify data issues in pipelines
4. **Students**: Learn about data quality and preprocessing
5. **Researchers**: Get quick insights into research data

## 🛡️ Data Privacy

- All data processing happens locally on your machine
- Files are stored in memory temporarily during processing
- No data is sent to external servers
- Reports are cleared when you close the browser

## 🤝 Contributing

Contributions are welcome! Here are some ideas for improvements:

- Add support for more file formats (JSON, Parquet, etc.)
- Implement data export functionality
- Add custom profiling configurations
- Create data transformation pipeline builder
- Add authentication and user accounts
- Implement report persistence (database)

## 📝 Common Issues & Solutions

### Port Already in Use

If port 8000 or 3000 is already in use:

**Backend:**
```bash
# In backend/main.py, change the port:
uvicorn.run(app, host="0.0.0.0", port=8001)
```

**Frontend:**
```bash
# In frontend/vite.config.js, change the port:
server: {
  port: 3001,
}
```

### Module Not Found Errors

Make sure you've activated the virtual environment:
```bash
source venv/bin/activate
```

And installed all dependencies:
```bash
pip install -r requirements.txt
```

### CORS Errors

Ensure both backend and frontend are running. The backend is configured to accept requests from `http://localhost:3000`.

## 🔮 Future Enhancements

- [ ] Add data transformation capabilities
- [ ] Support for SQL databases
- [ ] Scheduled profiling jobs
- [ ] Comparison between multiple datasets
- [ ] Export recommendations as PDF
- [ ] Custom threshold settings
- [ ] Integration with cloud storage (S3, GCS)
- [ ] Multi-user support with authentication

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Built with ❤️ using FastAPI, React, and pandas-profiling.

## 🙏 Acknowledgments

- [ydata-profiling](https://github.com/ydataai/ydata-profiling) - The excellent profiling library
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

**Need Help?** If you encounter any issues or have questions, please open an issue on the project repository.

**Enjoy profiling your data! 📊✨**

# Easy-Profiling
