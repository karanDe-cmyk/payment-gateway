import React from 'react';
import { WebhookEvent } from '../types';
import StatusBadge from './StatusBadge';
import { Webhook, RefreshCw, ExternalLink } from 'lucide-react';

interface WebhookPanelProps {
  events: WebhookEvent[];
}

const WebhookPanel: React.FC<WebhookPanelProps> = ({ events }) => {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Webhook className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Webhook Events</h3>
          </div>
          <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {events.map((event) => (
          <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-sm font-medium text-gray-900">{event.event}</h4>
                  <StatusBadge status={event.status} variant="webhook" />
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 truncate">{event.url}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Attempts: {event.attempts}</span>
                  <span>{formatDate(event.timestamp)}</span>
                </div>
              </div>
            </div>
            {event.status === 'failed' && (
              <div className="mt-3 p-3 bg-red-50 rounded-md">
                <p className="text-xs text-red-600">
                  Failed to deliver webhook after {event.attempts} attempts. 
                  Next retry in 30 minutes.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebhookPanel;