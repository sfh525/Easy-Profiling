#!/bin/bash

echo "🎯 Data Profiler - Automated Setup Script"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Python version
echo "🔍 Checking Python version..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
    echo -e "${GREEN}✓${NC} Python $PYTHON_VERSION found"
else
    echo -e "${YELLOW}⚠${NC}  Python 3 not found. Please install Python 3.8 or higher."
    exit 1
fi

# Check Node.js version
echo "🔍 Checking Node.js version..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js $NODE_VERSION found"
else
    echo -e "${YELLOW}⚠${NC}  Node.js not found. Please install Node.js 16 or higher."
    exit 1
fi

echo ""
echo "📦 Setting up Backend..."
echo "------------------------"

# Backend setup
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

echo -e "${GREEN}✓${NC} Backend setup complete!"

cd ..

echo ""
echo "📦 Setting up Frontend..."
echo "------------------------"

# Frontend setup
cd frontend

echo "Installing Node.js dependencies..."
npm install --silent

echo -e "${GREEN}✓${NC} Frontend setup complete!"

cd ..

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "📊 Generate sample data (optional):"
echo "   python3 create_sample_data.py"
echo ""
echo "🚀 To start the application:"
echo ""
echo "   Terminal 1 (Backend):"
echo -e "   ${BLUE}cd backend && ./run.sh${NC}"
echo ""
echo "   Terminal 2 (Frontend):"
echo -e "   ${BLUE}cd frontend && ./run.sh${NC}"
echo ""
echo "   Then open: ${GREEN}http://localhost:3000${NC}"
echo ""
echo "📖 For more details, see README.md or QUICKSTART.md"
echo ""

