import React from 'react';
import { Order } from '../types';
import { ShoppingCart, Package, Truck, Receipt } from 'lucide-react';

interface OrderSummaryProps {
  order: Order;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: order.currency,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex items-center space-x-3">
          <ShoppingCart className="h-6 w-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Order Summary</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4 mb-6">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900">{formatCurrency(order.tax)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex items-center space-x-1">
              <Truck className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Shipping</span>
            </div>
            <span className="text-green-600 font-medium">
              {order.shipping === 0 ? 'FREE' : formatCurrency(order.shipping)}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <Receipt className="h-5 w-5 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">Total</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-blue-700 font-medium">Secure Payment</span>
          </div>
          <p className="text-xs text-blue-600 mt-1">
            Your payment information is encrypted and secure with IBM Payment Gateway
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;