from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, HTMLResponse
import pandas as pd
import numpy as np
from ydata_profiling import ProfileReport
import io
import json
import os
from datetime import datetime
from typing import Dict, Any, List
import tempfile

app = FastAPI(title="Pandas Profiling API", version="1.0.0")

# Get allowed origins from environment variable or use defaults
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://localhost:5173"
).split(",")

# CORS middleware to allow frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store reports temporarily (in production, use a database)
reports_storage = {}


def analyze_data_quality(df: pd.DataFrame) -> Dict[str, Any]:
    """Analyze data quality and provide insights"""
    insights = {
        "row_count": len(df),
        "column_count": len(df.columns),
        "missing_data": {},
        "data_types": {},
        "duplicates": int(df.duplicated().sum()),
        "memory_usage": float(df.memory_usage(deep=True).sum() / 1024 / 1024),  # MB
    }
    
    # Missing data analysis
    for col in df.columns:
        missing_count = df[col].isnull().sum()
        if missing_count > 0:
            insights["missing_data"][col] = {
                "count": int(missing_count),
                "percentage": float(missing_count / len(df) * 100)
            }
    
    # Data types
    for col in df.columns:
        insights["data_types"][col] = str(df[col].dtype)
    
    return insights


def generate_recommendations(df: pd.DataFrame, insights: Dict[str, Any]) -> List[Dict[str, str]]:
    """Generate actionable recommendations based on data analysis"""
    recommendations = []
    
    # Check for missing data
    if insights["missing_data"]:
        high_missing = [col for col, info in insights["missing_data"].items() 
                       if info["percentage"] > 50]
        medium_missing = [col for col, info in insights["missing_data"].items() 
                         if 10 < info["percentage"] <= 50]
        low_missing = [col for col, info in insights["missing_data"].items() 
                      if info["percentage"] <= 10]
        
        if high_missing:
            recommendations.append({
                "type": "critical",
                "category": "Missing Data",
                "title": "High Missing Data Detected",
                "description": f"Columns {', '.join(high_missing)} have >50% missing values. Consider dropping these columns or investigating data collection issues.",
                "action": "Review data collection process or remove columns"
            })
        
        if medium_missing:
            recommendations.append({
                "type": "warning",
                "category": "Missing Data",
                "title": "Moderate Missing Data",
                "description": f"Columns {', '.join(medium_missing)} have 10-50% missing values. Consider imputation strategies (mean, median, mode, or advanced methods).",
                "action": "Apply appropriate imputation technique"
            })
        
        if low_missing:
            recommendations.append({
                "type": "info",
                "category": "Missing Data",
                "title": "Low Missing Data",
                "description": f"Columns {', '.join(low_missing)} have <10% missing values. Simple imputation or row removal may be appropriate.",
                "action": "Use simple imputation or drop rows"
            })
    
    # Check for duplicates
    if insights["duplicates"] > 0:
        dup_percentage = (insights["duplicates"] / insights["row_count"]) * 100
        if dup_percentage > 10:
            recommendations.append({
                "type": "warning",
                "category": "Data Quality",
                "title": "Significant Duplicate Rows",
                "description": f"Found {insights['duplicates']} duplicate rows ({dup_percentage:.1f}%). This may indicate data collection issues.",
                "action": "Investigate and remove duplicates using df.drop_duplicates()"
            })
        else:
            recommendations.append({
                "type": "info",
                "category": "Data Quality",
                "title": "Duplicate Rows Detected",
                "description": f"Found {insights['duplicates']} duplicate rows ({dup_percentage:.1f}%).",
                "action": "Consider removing duplicates if they're not intentional"
            })
    
    # Check data types
    object_cols = [col for col, dtype in insights["data_types"].items() if dtype == "object"]
    if object_cols:
        # Check if any object columns might be categorical
        categorical_candidates = []
        for col in object_cols:
            if len(df[col].unique()) < len(df) * 0.05:  # Less than 5% unique values
                categorical_candidates.append(col)
        
        if categorical_candidates:
            recommendations.append({
                "type": "info",
                "category": "Optimization",
                "title": "Categorical Encoding Opportunity",
                "description": f"Columns {', '.join(categorical_candidates)} have low cardinality. Convert to categorical dtype for memory efficiency.",
                "action": "Use df[col].astype('category') or apply encoding (Label/OneHot)"
            })
    
    # Check for potential date columns
    potential_dates = []
    for col in object_cols:
        sample = df[col].dropna().head(10)
        if len(sample) > 0:
            try:
                pd.to_datetime(sample, errors='raise')
                potential_dates.append(col)
            except:
                pass
    
    if potential_dates:
        recommendations.append({
            "type": "info",
            "category": "Data Type",
            "title": "Potential Date Columns",
            "description": f"Columns {', '.join(potential_dates)} appear to contain dates but are stored as text.",
            "action": "Convert to datetime using pd.to_datetime()"
        })
    
    # Memory usage recommendation
    if insights["memory_usage"] > 100:  # > 100 MB
        recommendations.append({
            "type": "info",
            "category": "Optimization",
            "title": "Large Memory Usage",
            "description": f"Dataset uses {insights['memory_usage']:.2f} MB of memory. Consider optimization techniques.",
            "action": "Use appropriate dtypes (int8, int16, category) and consider chunking for very large datasets"
        })
    
    # Check for high cardinality columns
    high_cardinality = []
    for col in df.columns:
        unique_ratio = len(df[col].unique()) / len(df)
        if unique_ratio > 0.95 and str(df[col].dtype) == "object":
            high_cardinality.append(col)
    
    if high_cardinality:
        recommendations.append({
            "type": "info",
            "category": "Feature Engineering",
            "title": "High Cardinality Columns",
            "description": f"Columns {', '.join(high_cardinality)} have very high cardinality (>95% unique values). These might be IDs or require special handling.",
            "action": "Consider feature hashing, target encoding, or removing if they're identifiers"
        })
    
    # Check for constant columns
    constant_cols = [col for col in df.columns if df[col].nunique() <= 1]
    if constant_cols:
        recommendations.append({
            "type": "warning",
            "category": "Feature Engineering",
            "title": "Constant Columns Detected",
            "description": f"Columns {', '.join(constant_cols)} have only one unique value. These provide no information for analysis.",
            "action": "Drop these columns as they don't contribute to analysis"
        })
    
    # Check for numeric columns that might need scaling
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    if len(numeric_cols) > 1:
        ranges = {}
        for col in numeric_cols:
            col_range = df[col].max() - df[col].min()
            if not np.isnan(col_range):
                ranges[col] = col_range
        
        if ranges and max(ranges.values()) / min(ranges.values()) > 100:
            recommendations.append({
                "type": "info",
                "category": "Preprocessing",
                "title": "Feature Scaling Recommended",
                "description": "Numeric columns have very different scales. This can affect some machine learning algorithms.",
                "action": "Apply StandardScaler or MinMaxScaler before modeling"
            })
    
    # Overall data quality assessment
    total_missing_pct = sum(info["percentage"] for info in insights["missing_data"].values()) / len(df.columns) if insights["missing_data"] else 0
    
    if total_missing_pct < 5 and insights["duplicates"] == 0 and not constant_cols:
        recommendations.insert(0, {
            "type": "success",
            "category": "Overall Quality",
            "title": "Good Data Quality",
            "description": "Your dataset has minimal issues. It's relatively clean and ready for analysis.",
            "action": "Proceed with exploratory data analysis and modeling"
        })
    
    return recommendations


@app.get("/")
async def root():
    return {
        "message": "Pandas Profiling API",
        "version": "1.0.0",
        "endpoints": {
            "/upload": "POST - Upload a CSV or Excel file for profiling",
            "/report/{report_id}": "GET - Retrieve HTML report",
            "/insights/{report_id}": "GET - Get insights and recommendations"
        }
    }


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload a file and generate profiling report"""
    
    # Validate file type
    if not file.filename.endswith(('.csv', '.xlsx', '.xls')):
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Please upload a CSV or Excel file."
        )
    
    try:
        # Read file content
        content = await file.read()
        
        # Parse based on file type
        if file.filename.endswith('.csv'):
            df = pd.read_csv(io.BytesIO(content))
        else:
            df = pd.read_excel(io.BytesIO(content))
        
        # Validate dataframe
        if df.empty:
            raise HTTPException(status_code=400, detail="File is empty")
        
        if len(df) > 1000000:
            raise HTTPException(
                status_code=400,
                detail="File too large. Maximum 1 million rows supported."
            )
        
        # Generate report ID
        report_id = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename.replace('.', '_')}"
        
        # Generate insights
        insights = analyze_data_quality(df)
        recommendations = generate_recommendations(df, insights)
        
        # Generate profiling report
        profile = ProfileReport(
            df,
            title=f"Profiling Report - {file.filename}",
            minimal=False,
            explorative=True
        )
        
        # Generate HTML report
        html_report = profile.to_html()
        
        # Store report
        reports_storage[report_id] = {
            "html": html_report,
            "insights": insights,
            "recommendations": recommendations,
            "filename": file.filename,
            "created_at": datetime.now().isoformat()
        }
        
        return JSONResponse({
            "report_id": report_id,
            "filename": file.filename,
            "insights": insights,
            "recommendations": recommendations,
            "message": "File processed successfully"
        })
        
    except pd.errors.EmptyDataError:
        raise HTTPException(status_code=400, detail="File is empty or corrupted")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")


@app.get("/report/{report_id}")
async def get_report(report_id: str):
    """Get HTML profiling report"""
    if report_id not in reports_storage:
        raise HTTPException(status_code=404, detail="Report not found")
    
    html_content = reports_storage[report_id]["html"]
    return HTMLResponse(content=html_content)


@app.get("/insights/{report_id}")
async def get_insights(report_id: str):
    """Get insights and recommendations"""
    if report_id not in reports_storage:
        raise HTTPException(status_code=404, detail="Report not found")
    
    report = reports_storage[report_id]
    return JSONResponse({
        "insights": report["insights"],
        "recommendations": report["recommendations"],
        "filename": report["filename"],
        "created_at": report["created_at"]
    })


@app.delete("/report/{report_id}")
async def delete_report(report_id: str):
    """Delete a report"""
    if report_id not in reports_storage:
        raise HTTPException(status_code=404, detail="Report not found")
    
    del reports_storage[report_id]
    return {"message": "Report deleted successfully"}


@app.get("/reports")
async def list_reports():
    """List all available reports"""
    reports_list = [
        {
            "report_id": rid,
            "filename": report["filename"],
            "created_at": report["created_at"]
        }
        for rid, report in reports_storage.items()
    ]
    return {"reports": reports_list}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

