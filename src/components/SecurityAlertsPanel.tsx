import React from 'react';
import { SecurityAlert } from '../types';
import StatusBadge from './StatusBadge';
import { Shield, AlertTriangle, Ban, Eye } from 'lucide-react';

interface SecurityAlertsPanelProps {
  alerts: SecurityAlert[];
}

const SecurityAlertsPanel: React.FC<SecurityAlertsPanelProps> = ({ alerts }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'fraud':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'breach':
        return <Shield className="h-5 w-5 text-red-600" />;
      case 'suspicious':
        return <Eye className="h-5 w-5 text-amber-500" />;
      case 'blocked':
        return <Ban className="h-5 w-5 text-gray-500" />;
      default:
        return <Shield className="h-5 w-5 text-blue-500" />;
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Security Alerts</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm text-red-600 font-medium">
              {alerts.filter(alert => !alert.resolved).length} Active
            </span>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-6 hover:bg-gray-50 transition-colors duration-150 ${
              !alert.resolved ? 'bg-red-50 border-l-4 border-red-500' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-gray-900 capitalize">
                      {alert.type} Alert
                    </h4>
                    <StatusBadge status={alert.severity} variant="security" />
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(alert.timestamp)}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">ID: {alert.id}</span>
                  {alert.resolved ? (
                    <span className="text-xs text-green-600 font-medium">Resolved</span>
                  ) : (
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      Mark as Resolved
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityAlertsPanel;