import React, { useState } from 'react';
import { Lightbulb, AlertCircle, AlertTriangle, Info, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const Recommendations = ({ recommendations }) => {
  const [expandedId, setExpandedId] = useState(null);

  const getIcon = (type) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="h-6 w-6 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-orange-500" />;
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      default:
        return <Info className="h-6 w-6 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getBadgeColor = (category) => {
    switch (category) {
      case 'Missing Data':
        return 'bg-red-100 text-red-700';
      case 'Data Quality':
        return 'bg-orange-100 text-orange-700';
      case 'Optimization':
        return 'bg-purple-100 text-purple-700';
      case 'Data Type':
        return 'bg-blue-100 text-blue-700';
      case 'Feature Engineering':
        return 'bg-pink-100 text-pink-700';
      case 'Preprocessing':
        return 'bg-teal-100 text-teal-700';
      case 'Overall Quality':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Group recommendations by type
  const groupedRecommendations = recommendations.reduce((acc, rec, index) => {
    const type = rec.type || 'info';
    if (!acc[type]) acc[type] = [];
    acc[type].push({ ...rec, id: index });
    return acc;
  }, {});

  const typeOrder = ['critical', 'warning', 'info', 'success'];
  const sortedTypes = typeOrder.filter(type => groupedRecommendations[type]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100">
        <div className="flex items-center space-x-3 mb-2">
          <Lightbulb className="h-8 w-8 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Data Processing Recommendations</h2>
        </div>
        <p className="text-gray-600">
          Actionable insights to help you clean and prepare your data for analysis
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-gray-900">
                {groupedRecommendations.critical?.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-sm text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-gray-900">
                {groupedRecommendations.warning?.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Info</p>
              <p className="text-2xl font-bold text-gray-900">
                {groupedRecommendations.info?.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Success</p>
              <p className="text-2xl font-bold text-gray-900">
                {groupedRecommendations.success?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      {sortedTypes.map((type) => (
        <div key={type} className="space-y-3">
          {groupedRecommendations[type].map((rec) => {
            const isExpanded = expandedId === rec.id;
            return (
              <div
                key={rec.id}
                className={`border rounded-lg shadow-sm transition-all ${getBackgroundColor(type)}`}
              >
                <div
                  className="p-5 cursor-pointer hover:bg-white/50 transition-colors"
                  onClick={() => toggleExpand(rec.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${getBadgeColor(rec.category)}`}>
                          {rec.category}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {rec.title}
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-2">{rec.description}</p>
                      
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-gray-300">
                          <div className="bg-white rounded-lg p-4 space-y-3">
                            <div>
                              <p className="text-sm font-semibold text-gray-700 mb-2">
                                Recommended Action:
                              </p>
                              <p className="text-gray-900 bg-gray-50 p-3 rounded border border-gray-200">
                                {rec.action}
                              </p>
                            </div>
                            
                            {/* Additional helpful context based on category */}
                            {rec.category === 'Missing Data' && (
                              <div className="mt-3">
                                <p className="text-sm font-semibold text-gray-700 mb-2">
                                  Common Imputation Techniques:
                                </p>
                                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                  <li>Mean/Median imputation for numerical data</li>
                                  <li>Mode imputation for categorical data</li>
                                  <li>Forward/Backward fill for time series</li>
                                  <li>KNN or predictive model imputation</li>
                                </ul>
                              </div>
                            )}
                            
                            {rec.category === 'Feature Engineering' && (
                              <div className="mt-3">
                                <p className="text-sm font-semibold text-gray-700 mb-2">
                                  Why This Matters:
                                </p>
                                <p className="text-sm text-gray-700">
                                  Proper feature engineering can significantly improve model performance and reduce computational costs.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Help Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help Implementing These Recommendations?</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            These recommendations are based on common data science best practices. Here are some general tips:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Always backup your data</strong> before applying transformations
            </li>
            <li>
              <strong>Start with critical issues</strong> and work your way down to informational recommendations
            </li>
            <li>
              <strong>Document your data cleaning process</strong> for reproducibility
            </li>
            <li>
              <strong>Validate results</strong> after each transformation step
            </li>
            <li>
              <strong>Consider domain knowledge</strong> when deciding on imputation or transformation strategies
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;

