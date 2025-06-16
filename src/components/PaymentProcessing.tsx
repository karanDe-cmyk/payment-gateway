import React from 'react';
import { Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';

interface PaymentProcessingProps {
  status: 'processing' | 'completed' | 'failed' | 'pending' | null;
  message: string;
  transactionId?: string;
}

const PaymentProcessing: React.FC<PaymentProcessingProps> = ({ 
  status, 
  message, 
  transactionId 
}) => {
  if (!status) return null;

  const getIcon = () => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case 'failed':
        return <XCircle className="h-12 w-12 text-red-500" />;
      default:
        return <Clock className="h-12 w-12 text-gray-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (status) {
      case 'processing':
        return 'bg-blue-50 border-blue-200';
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'failed':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'processing':
        return 'text-blue-700';
      case 'completed':
        return 'text-green-700';
      case 'failed':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {getIcon()}
          </div>
          
          <h3 className={`text-xl font-semibold mb-2 ${getTextColor()}`}>
            {status === 'processing' && 'Processing Payment...'}
            {status === 'completed' && 'Payment Successful!'}
            {status === 'failed' && 'Payment Failed'}
          </h3>
          
          <p className="text-gray-600 mb-4">{message}</p>
          
          {transactionId && (
            <div className={`p-4 rounded-lg border-2 ${getBackgroundColor()} mb-4`}>
              <p className="text-sm font-medium text-gray-700">Transaction ID</p>
              <p className="text-xs font-mono text-gray-600 break-all">{transactionId}</p>
            </div>
          )}
          
          {status === 'completed' && (
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
            >
              Continue
            </button>
          )}
          
          {status === 'failed' && (
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;