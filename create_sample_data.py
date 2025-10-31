"""
Sample Data Generator for Testing Data Profiler

This script creates sample datasets with various data quality issues
to demonstrate the capabilities of the Data Profiler application.
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def create_basic_sample():
    """Create a basic sample dataset with some quality issues"""
    np.random.seed(42)
    n_rows = 100
    
    # Generate data with intentional issues
    data = {
        'ID': range(1, n_rows + 1),
        'Name': ['John', 'Jane', 'Bob', None, 'Alice', 'Charlie', 'David', 'Eve'] * 12 + ['Frank', 'Grace', 'Henry', 'Iris'],
        'Age': [25, 30, 35, None, 28, 45, None, 32] * 12 + [27, 38, None, 29],
        'Salary': [50000, 60000, None, 80000, 55000, None, 70000, 65000] * 12 + [52000, None, 68000, 58000],
        'Department': ['IT', 'HR', 'IT', 'Finance', 'HR', 'IT', 'Finance', 'Marketing'] * 12 + ['IT', 'HR', 'Finance', 'Marketing'],
        'Join_Date': [datetime(2020, 1, 1) + timedelta(days=30*i) for i in range(n_rows)],
        'Performance_Score': np.random.uniform(60, 100, n_rows),
        'Active': [True, False, True, True, True, False, True, True] * 12 + [True, True, False, True],
    }
    
    df = pd.DataFrame(data)
    
    # Add some duplicates
    df = pd.concat([df, df.iloc[[0, 5, 10]]], ignore_index=True)
    
    return df

def create_customer_sample():
    """Create a customer dataset with various data types"""
    np.random.seed(42)
    n_rows = 200
    
    data = {
        'Customer_ID': [f'CUST{i:05d}' for i in range(1, n_rows + 1)],
        'First_Name': np.random.choice(['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'David', None], n_rows),
        'Last_Name': np.random.choice(['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', None], n_rows),
        'Email': [f'customer{i}@example.com' if i % 10 != 0 else None for i in range(n_rows)],
        'Age': np.random.randint(18, 80, n_rows),
        'Annual_Income': np.random.normal(60000, 20000, n_rows),
        'Credit_Score': np.random.randint(300, 850, n_rows),
        'Account_Balance': np.random.uniform(-1000, 50000, n_rows),
        'Num_Purchases': np.random.poisson(5, n_rows),
        'Member_Since': pd.date_range('2018-01-01', periods=n_rows, freq='D'),
        'Country': np.random.choice(['USA', 'Canada', 'UK', 'Australia', None], n_rows, p=[0.5, 0.2, 0.15, 0.1, 0.05]),
        'Premium_Member': np.random.choice([True, False], n_rows, p=[0.3, 0.7]),
    }
    
    df = pd.DataFrame(data)
    
    # Add some high-cardinality column
    df['Transaction_ID'] = [f'TXN{i:010d}' for i in range(n_rows)]
    
    # Add some constant column
    df['Company'] = 'ACME Corp'
    
    return df

def create_sales_sample():
    """Create a sales dataset with time series data"""
    np.random.seed(42)
    n_rows = 365
    
    dates = pd.date_range('2023-01-01', periods=n_rows, freq='D')
    
    data = {
        'Date': dates,
        'Product': np.random.choice(['Product_A', 'Product_B', 'Product_C', 'Product_D'], n_rows),
        'Region': np.random.choice(['North', 'South', 'East', 'West'], n_rows),
        'Sales_Amount': np.random.uniform(100, 10000, n_rows),
        'Quantity': np.random.randint(1, 100, n_rows),
        'Discount': np.random.uniform(0, 0.3, n_rows),
        'Customer_Satisfaction': np.random.uniform(1, 5, n_rows),
        'Shipping_Cost': np.random.uniform(5, 50, n_rows),
        'Profit_Margin': np.random.uniform(0.1, 0.4, n_rows),
    }
    
    df = pd.DataFrame(data)
    
    # Add missing data pattern (e.g., weekends)
    df.loc[df['Date'].dt.dayofweek >= 5, 'Customer_Satisfaction'] = None
    
    return df

def main():
    """Generate all sample datasets"""
    print("🎯 Generating sample datasets...")
    print()
    
    # Create basic sample
    print("1️⃣ Creating basic_sample.csv...")
    df_basic = create_basic_sample()
    df_basic.to_csv('basic_sample.csv', index=False)
    print(f"   ✅ Created with {len(df_basic)} rows and {len(df_basic.columns)} columns")
    
    # Create customer sample
    print("2️⃣ Creating customer_sample.csv...")
    df_customer = create_customer_sample()
    df_customer.to_csv('customer_sample.csv', index=False)
    print(f"   ✅ Created with {len(df_customer)} rows and {len(df_customer.columns)} columns")
    
    # Create sales sample
    print("3️⃣ Creating sales_sample.csv...")
    df_sales = create_sales_sample()
    df_sales.to_csv('sales_sample.csv', index=False)
    print(f"   ✅ Created with {len(df_sales)} rows and {len(df_sales.columns)} columns")
    
    print()
    print("🎉 All sample datasets created successfully!")
    print()
    print("You can now upload these files to the Data Profiler:")
    print("  • basic_sample.csv - Simple dataset with common issues")
    print("  • customer_sample.csv - Customer data with various types")
    print("  • sales_sample.csv - Time series sales data")
    print()
    print("Start the app and drag any of these files to see it in action! 🚀")

if __name__ == '__main__':
    main()

