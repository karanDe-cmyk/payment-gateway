export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'wallet' | 'crypto';
  name: string;
  icon: string;
  description: string;
  processingFee: number;
}

export interface BillingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CardDetails {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
}

export interface OrderItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
}

export interface PaymentRequest {
  amount: number;
  transactionId?: string;
  customerEmail?: string;
  customerPhone?: string;
  description?: string;
  redirectUrl?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  status: 'completed' | 'pending' | 'failed' | 'processing';
  message: string;
  gatewayTransactionId?: string;
  amount?: number;
  currency?: string;
  errorCode?: string;
}

export interface ApiEndpoint {
  success: boolean;
  id: string;
  method: string;
  path: string;
  status: 'processing' | 'completed' | 'failed' | 'processing';
  requests: string;
  avgResponseTime: string;
  lastUsed: string; 
}

export interface SecurityAlert {
  resolved: string;
  id: string;
  type: string;
  severity: string;
  timestamp: string;
  description: string
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  uptime: string;
  totalTransactions: number;
  successRate: number
}

export interface Transaction {
  id: number;
  amount: number;
  currency: string;
  merchant: string;
  paymentMethod: string;
  status: 'processing' | 'completed' | 'failed';
  timestamp: string
}

export interface WebhookEvent {
  event: string;
  status: 'processing' | 'completed' | 'failed';
  url: string;
  attempts: string;
  timestamp: string;
  id: number;
}

export interface RefundRequest {
  originalTransactionId: string;
  amount: number;
  reason?: string;
}

export interface RefundResponse {
  success: boolean;
  refundId?: string;
  originalTransactionId?: string;
  status: 'completed' | 'failed';
  message: string;
  errorCode?: string;
}