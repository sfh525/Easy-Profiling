# Quick Start Guide

Get up and running with Data Profiler in 5 minutes!

## 🚀 Quick Installation

### Step 1: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
python main.py
```

✅ Backend should now be running on `http://localhost:8000`

### Step 2: Frontend Setup (2 minutes)

Open a new terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

✅ Frontend should now be running on `http://localhost:3000`

### Step 3: Use the App (1 minute)

1. Open your browser to `http://localhost:3000`
2. Drag and drop a CSV or Excel file
3. Click "Generate Profile Report"
4. Explore your data insights and recommendations!

## 📊 Test with Sample Data

Don't have data ready? You can quickly create a test CSV:

```python
# Create test_data.csv
import pandas as pd
import numpy as np

# Generate sample data
data = {
    'Name': ['John', 'Jane', 'Bob', None, 'Alice'] * 20,
    'Age': [25, 30, 35, 40, 28] * 20,
    'Salary': [50000, 60000, None, 80000, 55000] * 20,
    'Department': ['IT', 'HR', 'IT', 'Finance', 'HR'] * 20,
    'Join_Date': pd.date_range('2020-01-01', periods=100)
}

df = pd.DataFrame(data)
df.to_csv('test_data.csv', index=False)
print("✅ Test data created: test_data.csv")
```

## 🎯 What You'll See

1. **Data Insights Tab**: Overview of your data quality
   - Total rows and columns
   - Missing data visualization
   - Data types breakdown

2. **Recommendations Tab**: Smart suggestions for data cleaning
   - Critical issues (red)
   - Warnings (orange)
   - Optimization tips (blue)
   - Success indicators (green)

3. **Full Report Tab**: Comprehensive analysis
   - Interactive visualizations
   - Correlation matrices
   - Detailed statistics

## 🔧 Troubleshooting

**Backend won't start?**
- Make sure Python 3.8+ is installed: `python --version`
- Check if virtual environment is activated (you should see `(venv)` in your terminal)

**Frontend won't start?**
- Make sure Node.js 16+ is installed: `node --version`
- Try deleting `node_modules` and run `npm install` again

**Can't upload file?**
- Ensure file is CSV or Excel format
- Check file size is under 100MB
- Verify backend is running on port 8000

## 🎉 That's It!

You're now ready to profile your data. Happy analyzing! 📊

For more details, check out the full [README.md](README.md).

