import React, { useState } from 'react';
import { ExternalLink, Download } from 'lucide-react';

// Get API URL from environment variable or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const ReportViewer = ({ reportId }) => {
  const [loading, setLoading] = useState(true);
  const reportUrl = `${API_URL}/report/${reportId}`;

  const handleOpenInNewTab = () => {
    window.open(reportUrl, '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Header with Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Full Profiling Report</h2>
            <p className="text-sm text-gray-600">
              Detailed analysis with interactive visualizations and statistics
            </p>
          </div>
          <button
            onClick={handleOpenInNewTab}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Open in New Tab</span>
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-1">
              About This Report
            </h3>
            <p className="text-sm text-blue-800">
              This comprehensive report includes distribution plots, correlation matrices, missing data visualization, 
              and detailed statistics for each variable. For the best experience, open it in a new tab.
            </p>
          </div>
        </div>
      </div>

      {/* Embedded Report */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading report...</p>
            </div>
          </div>
        )}
        <iframe
          src={reportUrl}
          className="w-full"
          style={{ height: '800px', border: 'none' }}
          title="Profiling Report"
          onLoad={() => setLoading(false)}
        />
      </div>

      {/* Tips Section */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Navigation Tips:</h3>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Click on column names to see detailed analysis</li>
          <li>Use the navigation menu to jump between sections</li>
          <li>Hover over charts for interactive tooltips</li>
          <li>Check the correlations section to identify relationships between variables</li>
        </ul>
      </div>
    </div>
  );
};

export default ReportViewer;

