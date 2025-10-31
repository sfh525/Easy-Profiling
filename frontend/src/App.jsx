import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import DataInsights from './components/DataInsights';
import Recommendations from './components/Recommendations';
import ReportViewer from './components/ReportViewer';
import { BarChart3, FileText, Lightbulb, Upload } from 'lucide-react';

// Get API URL from environment variable or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [activeTab, setActiveTab] = useState('upload');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setReportData(response.data);
      setActiveTab('insights');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error uploading file. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setReportData(null);
    setActiveTab('upload');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Data Profiler</h1>
                <p className="text-sm text-gray-500 mt-1">Professional Data Analysis Tool</p>
              </div>
            </div>
            {reportData && (
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
              >
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800 font-medium">{error}</span>
            </div>
          </div>
        )}

        {!reportData ? (
          <FileUpload onUpload={handleFileUpload} loading={loading} />
        ) : (
          <div className="space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-4 px-6" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('insights')}
                    className={`py-4 px-3 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                      activeTab === 'insights'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Data Insights</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('recommendations')}
                    className={`py-4 px-3 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                      activeTab === 'recommendations'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Lightbulb className="h-5 w-5" />
                    <span>Recommendations</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('report')}
                    className={`py-4 px-3 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                      activeTab === 'report'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <FileText className="h-5 w-5" />
                    <span>Full Report</span>
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'insights' && (
                  <DataInsights insights={reportData.insights} filename={reportData.filename} />
                )}
                {activeTab === 'recommendations' && (
                  <Recommendations recommendations={reportData.recommendations} />
                )}
                {activeTab === 'report' && (
                  <ReportViewer reportId={reportData.report_id} />
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            Built with FastAPI, React, and pandas-profiling. Upload your data to get started.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

