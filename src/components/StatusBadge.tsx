import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'transaction' | 'api' | 'webhook' | 'security';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'transaction' }) => {
  const getStatusClasses = () => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    switch (variant) {
      case 'transaction':
        switch (status) {
          case 'completed':
            return `${baseClasses} bg-green-100 text-green-800`;
          case 'pending':
            return `${baseClasses} bg-amber-100 text-amber-800`;
          case 'failed':
            return `${baseClasses} bg-red-100 text-red-800`;
          case 'cancelled':
            return `${baseClasses} bg-gray-100 text-gray-800`;
        }
        break;
      case 'api':
        switch (status) {
          case 'active':
            return `${baseClasses} bg-green-100 text-green-800`;
          case 'inactive':
            return `${baseClasses} bg-gray-100 text-gray-800`;
          case 'deprecated':
            return `${baseClasses} bg-red-100 text-red-800`;
        }
        break;
      case 'webhook':
        switch (status) {
          case 'delivered':
            return `${baseClasses} bg-green-100 text-green-800`;
          case 'pending':
            return `${baseClasses} bg-amber-100 text-amber-800`;
          case 'failed':
            return `${baseClasses} bg-red-100 text-red-800`;
        }
        break;
      case 'security':
        switch (status) {
          case 'low':
            return `${baseClasses} bg-blue-100 text-blue-800`;
          case 'medium':
            return `${baseClasses} bg-amber-100 text-amber-800`;
          case 'high':
            return `${baseClasses} bg-red-100 text-red-800`;
          case 'critical':
            return `${baseClasses} bg-red-100 text-red-900 font-bold`;
        }
        break;
    }
    
    return `${baseClasses} bg-gray-100 text-gray-800`;
  };

  return (
    <span className={getStatusClasses()}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;