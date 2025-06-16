import React from 'react';
import { SystemMetrics } from '../types';
import ProgressBar from './ProgressBar';
import { Cpu, HardDrive, Activity, Wifi } from 'lucide-react';

interface SystemHealthPanelProps {
  metrics: SystemMetrics;
}

const SystemHealthPanel: React.FC<SystemHealthPanelProps> = ({ metrics }) => {
  const getProgressColor = (value: number) => {
    if (value >= 90) return 'red';
    if (value >= 75) return 'amber';
    return 'green';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Cpu className="h-5 w-5 text-gray-600" />
            <div className="flex-1">
              <ProgressBar
                value={metrics.cpu}
                color={getProgressColor(metrics.cpu)}
                showLabel
                label="CPU Usage"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Activity className="h-5 w-5 text-gray-600" />
            <div className="flex-1">
              <ProgressBar
                value={metrics.memory}
                color={getProgressColor(metrics.memory)}
                showLabel
                label="Memory Usage"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <HardDrive className="h-5 w-5 text-gray-600" />
            <div className="flex-1">
              <ProgressBar
                value={metrics.disk}
                color={getProgressColor(metrics.disk)}
                showLabel
                label="Disk Usage"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Wifi className="h-5 w-5 text-gray-600" />
            <div className="flex-1">
              <ProgressBar
                value={metrics.network}
                color={getProgressColor(metrics.network)}
                showLabel
                label="Network Usage"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">System Statistics</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="text-sm font-medium text-gray-900">{metrics.uptime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Transactions</span>
                <span className="text-sm font-medium text-gray-900">
                  {metrics.totalTransactions.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="text-sm font-medium text-green-600">{metrics.successRate}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthPanel;