import React from 'react';
import { Database, Columns, Layers, HardDrive, AlertTriangle, Copy } from 'lucide-react';

const DataInsights = ({ insights, filename }) => {
  const { row_count, column_count, missing_data, data_types, duplicates, memory_usage } = insights;

  const missingDataEntries = Object.entries(missing_data || {});
  const totalMissingCells = missingDataEntries.reduce((sum, [_, info]) => sum + info.count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Overview</h2>
        <p className="text-gray-600">File: <span className="font-semibold">{filename}</span></p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Rows</p>
          <p className="text-3xl font-bold text-gray-900">{row_count.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Columns className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Columns</p>
          <p className="text-3xl font-bold text-gray-900">{column_count}</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg ${duplicates > 0 ? 'bg-yellow-100' : 'bg-gray-100'}`}>
              <Copy className={`h-6 w-6 ${duplicates > 0 ? 'text-yellow-600' : 'text-gray-600'}`} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Duplicate Rows</p>
          <p className="text-3xl font-bold text-gray-900">{duplicates.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <HardDrive className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Memory Usage</p>
          <p className="text-3xl font-bold text-gray-900">{memory_usage.toFixed(1)}</p>
          <p className="text-xs text-gray-500">MB</p>
        </div>
      </div>

      {/* Missing Data Section */}
      {missingDataEntries.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-900">Missing Data Analysis</h3>
            </div>
            <p className="text-sm text-gray-600">
              Total missing cells: <span className="font-semibold">{totalMissingCells.toLocaleString()}</span>
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {missingDataEntries
                .sort((a, b) => b[1].percentage - a[1].percentage)
                .map(([column, info]) => (
                  <div key={column} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{column}</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">
                          {info.count.toLocaleString()} missing
                        </span>
                        <span className={`text-sm font-semibold ${
                          info.percentage > 50 ? 'text-red-600' :
                          info.percentage > 10 ? 'text-orange-600' :
                          'text-yellow-600'
                        }`}>
                          {info.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          info.percentage > 50 ? 'bg-red-500' :
                          info.percentage > 10 ? 'bg-orange-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${info.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Data Types Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Layers className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900">Data Types</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(data_types).map(([column, dtype]) => (
              <div key={column} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="font-medium text-gray-900 truncate mr-2" title={column}>{column}</span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  dtype.includes('int') ? 'bg-blue-100 text-blue-700' :
                  dtype.includes('float') ? 'bg-green-100 text-green-700' :
                  dtype === 'object' ? 'bg-purple-100 text-purple-700' :
                  dtype.includes('datetime') ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {dtype}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Total Cells:</span>
              <span className="font-semibold text-gray-900">
                {(row_count * column_count).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Missing Cells:</span>
              <span className="font-semibold text-gray-900">
                {totalMissingCells.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Completeness:</span>
              <span className="font-semibold text-green-600">
                {((1 - totalMissingCells / (row_count * column_count)) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Duplicate Rate:</span>
              <span className="font-semibold text-gray-900">
                {((duplicates / row_count) * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Avg. Memory/Row:</span>
              <span className="font-semibold text-gray-900">
                {((memory_usage * 1024) / row_count).toFixed(2)} KB
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataInsights;

