import { Order, PaymentMethod } from '../types';

export const mockOrder: Order = {
  id: 'ORD-2024-001',
  items: [
    {
      id: 'ITEM-001',
      name: 'Premium Business Software License',
      description: 'Annual subscription for enterprise software suite',
      price: 299.99,
      quantity: 1,
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'ITEM-002',
      name: 'Cloud Storage Plan',
      description: '1TB cloud storage with advanced security features',
      price: 99.99,
      quantity: 2,
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'ITEM-003',
      name: 'Technical Support Package',
      description: '24/7 premium technical support for 12 months',
      price: 149.99,
      quantity: 1,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ],
  subtotal: 649.96,
  tax: 52.00,
  shipping: 0.00,
  total: 701.96,
  currency: 'USD'
};

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    type: 'card',
    name: 'Credit/Debit Card',
    icon: 'CreditCard',
    description: 'Visa, Mastercard, American Express',
    processingFee: 2.9
  },
  {
    id: 'bank',
    type: 'bank',
    name: 'Bank Transfer',
    icon: 'Banknote',
    description: 'Direct bank account transfer',
    processingFee: 1.5
  },
  {
    id: 'wallet',
    type: 'wallet',
    name: 'Digital Wallet',
    icon: 'Wallet',
    description: 'PayPal, Apple Pay, Google Pay',
    processingFee: 3.2
  },
  {
    id: 'crypto',
    type: 'crypto',
    name: 'Cryptocurrency',
    icon: 'Bitcoin',
    description: 'Bitcoin, Ethereum, Litecoin',
    processingFee: 1.0
  }
];