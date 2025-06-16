import React from 'react';
import { PaymentMethod } from '../types';
import { CreditCard, Banknote, Wallet, Bitcoin, Check } from 'lucide-react';

interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  selectedMethod: string;
  onMethodSelect: (methodId: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  methods,
  selectedMethod,
  onMethodSelect
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard':
        return CreditCard;
      case 'Banknote':
        return Banknote;
      case 'Wallet':
        return Wallet;
      case 'Bitcoin':
        return Bitcoin;
      default:
        return CreditCard;
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
      {methods.map((method) => {
        const Icon = getIcon(method.icon);
        const isSelected = selectedMethod === method.id;
        
        return (
          <div
            key={method.id}
            className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
              isSelected
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => onMethodSelect(method.id)}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${
                isSelected ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <Icon className={`h-6 w-6 ${
                  isSelected ? 'text-blue-600' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{method.name}</h4>
                  {isSelected && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">{method.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Processing fee: {method.processingFee}%
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentMethodSelector;