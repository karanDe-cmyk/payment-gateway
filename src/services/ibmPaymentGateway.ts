import { PaymentRequest, PaymentResponse, RefundRequest, RefundResponse } from '../types';

interface IBMPaymentResponse {
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  message: string;
  transaction_id?: string;
  amount?: number;
  currency?: string;
  timestamp?: string;
  error_code?: string;
}

interface IBMRefundResponse {
  status: 'SUCCESS' | 'FAILED';
  message: string;
  refund_id?: string;
  original_transaction_id?: string;
}


class IBMPaymentService {
  private readonly apiBaseUrl = 'https://pay.imb.org.in/api';
  private readonly apiKey = 'dc0d21ce8211b2d79415c095254826be';

  getCardType = (cardNumber: string): string => {
    // Implement card type detection logic here
    if (/^4/.test(cardNumber)) return 'VISA';
    if (/^5[1-5]/.test(cardNumber)) return 'MASTERCARD';
    if (/^3[47]/.test(cardNumber)) return 'AMEX';
    return 'UNKNOWN';
  };
  

  private async makeApiRequest<T>(endpoint: string, data: Record<string, any>): Promise<T> {
    const url = `${this.apiBaseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: new URLSearchParams(data).toString()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('IBM Payment API Error:', error);
      throw error;
    }
  }

  async processPayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    try {
      const ibmRequest = {
        customer_mobile: paymentRequest.customerPhone || '8287568224',
        user_token: this.apiKey,
        amount: paymentRequest.amount.toString(),
        order_id: paymentRequest.transactionId || `txn_${Date.now()}`,
        redirect_url: paymentRequest.redirectUrl || 'https://pay.imb.org.in',
        remark1: paymentRequest.customerEmail || '',
        remark2: paymentRequest.description || ''
      };

      const response = await this.makeApiRequest<IBMPaymentResponse>('/create-order', ibmRequest);

      if (response.status === 'SUCCESS' && response.transaction_id) {
        return {
          success: true,
          transactionId: response.transaction_id,
          status: 'completed',
          message: response.message || 'Payment processed successfully',
          gatewayTransactionId: response.transaction_id,
          amount: response.amount || paymentRequest.amount,
          currency: response.currency || 'INR'
        };
      } else {
        return {
          success: false,
          transactionId: ibmRequest.order_id,
          status: 'failed',
          message: response.message || 'Payment processing failed',
          errorCode: response.error_code || 'PAYMENT_FAILED'
        };
      }
    } catch (error) {
      return {
        success: false,
        transactionId: paymentRequest.transactionId || `txn_${Date.now()}`,
        status: 'failed',
        message: error instanceof Error ? error.message : 'Payment processing failed',
        errorCode: 'API_ERROR'
      };
    }
  }

  async processRefund(refundRequest: RefundRequest): Promise<RefundResponse> {
    try {
      const response = await this.makeApiRequest<IBMRefundResponse>('/refund', {
        user_token: this.apiKey,
        order_id: refundRequest.originalTransactionId,
        amount: refundRequest.amount.toString(),
        reason: refundRequest.reason || 'Customer request'
      });

      if (response.status === 'SUCCESS' && response.refund_id) {
        return {
          success: true,
          refundId: response.refund_id,
          originalTransactionId: response.original_transaction_id || refundRequest.originalTransactionId,
          status: 'completed',
          message: response.message || 'Refund processed successfully'
        };
      } else {
        return {
          success: false,
          status: 'failed',
          message: response.message || 'Refund processing failed',
          errorCode: 'REFUND_FAILED'
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 'failed',
        message: error instanceof Error ? error.message : 'Refund processing failed',
        errorCode: 'API_ERROR'
      };
    }
  }

  async checkPaymentStatus(transactionId: string): Promise<PaymentResponse> {
    try {
      const response = await this.makeApiRequest<IBMPaymentResponse>('/check-order-status', {
        user_token: this.apiKey,
        order_id: transactionId
      });

      if (response.status === 'SUCCESS') {
        return {
          success: true,
          transactionId,
          status: 'completed',
          message: response.message || 'Payment completed',
          gatewayTransactionId: transactionId,
          amount: response.amount || 0,
          currency: response.currency || 'INR'
        };
      } else if (response.status === 'PENDING') {
        return {
          success: false,
          transactionId,
          status: 'pending',
          message: response.message || 'Payment pending'
        };
      } else {
        return {
          success: false,
          transactionId,
          status: 'failed',
          message: response.message || 'Payment failed',
          errorCode: response.error_code || 'PAYMENT_FAILED'
        };
      }
    } catch (error) {
      return {
        success: false,
        transactionId,
        status: 'failed',
        message: error instanceof Error ? error.message : 'Status check failed',
        errorCode: 'API_ERROR'
      };
    }
  }

  async handleWebhook(data: any): Promise<{ success: boolean }> {
    try {
      // Verify the webhook signature if available
      // Process the webhook data
      console.log('Received IMB webhook:', data);

      if (data.status === 'SUCCESS') {
        // Update your system with the successful payment
        console.log(`Payment successful for order ${data.order_id}`);
      } else {
        // Handle failed payment
        console.log(`Payment failed for order ${data.order_id}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Webhook processing error:', error);
      return { success: false };
    }
  }

  async validateCard(cardNumber: string): Promise<boolean> {
    return /^\d{16}$/.test(cardNumber.replace(/\s/g, ''));
  }
}

const ibmPaymentService = new IBMPaymentService();
export default ibmPaymentService;