import React from 'react';
import { ApiEndpoint } from '../types';
import StatusBadge from './StatusBadge';
import { Globe, Clock, Activity } from 'lucide-react';

interface ApiEndpointsPanelProps {
  endpoints: ApiEndpoint[];
}

const ApiEndpointsPanel: React.FC<ApiEndpointsPanelProps> = ({ endpoints }) => {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'text-green-600 bg-green-100';
      case 'POST':
        return 'text-blue-600 bg-blue-100';
      case 'PUT':
        return 'text-amber-600 bg-amber-100';
      case 'DELETE':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">API Endpoints</h3>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {endpoints.map((endpoint) => (
          <div key={endpoint.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs font-medium rounded ${getMethodColor(endpoint.method)}`}>
                  {endpoint.method}
                </span>
                <code className="text-sm font-mono text-gray-900">{endpoint.path}</code>
              </div>
              <StatusBadge status={endpoint.status} variant="api" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Requests:</span>
                <span className="font-medium text-gray-900">{endpoint.requests.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Avg Response:</span>
                <span className="font-medium text-gray-900">{endpoint.avgResponseTime}ms</span>
              </div>
              
              <div className="text-gray-500">
                Last used: {formatDate(endpoint.lastUsed)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiEndpointsPanel;