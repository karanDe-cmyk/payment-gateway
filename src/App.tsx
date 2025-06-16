import { useState } from 'react';
import { BillingAddress, CardDetails, PaymentResponse } from './types';
import { mockOrder, paymentMethods } from './data/mockData';
import ibmPaymentGateway from './services/ibmPaymentGateway';
import OrderSummary from './components/OrderSummary';
import PaymentMethodSelector from './components/PaymentMethodSelector';
import BillingAddressForm from './components/BillingAddressForm';
import CardDetailsForm from './components/CardDetailsForm';
import PaymentProcessing from './components/PaymentProcessing';
import { Shield, CreditCard, ArrowRight } from 'lucide-react';

function App() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [paymentStatus, setPaymentStatus] = useState<PaymentResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: ''
  });

  const validateForm = () => {
    // Validate billing address
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'country'];
    for (const field of requiredFields) {
      if (!billingAddress[field as keyof BillingAddress]) {
        alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    // Validate card details if card payment is selected
    if (selectedPaymentMethod === 'card') {
      if (!cardDetails.cardNumber || !cardDetails.expiryMonth || !cardDetails.expiryYear || !cardDetails.cvv || !cardDetails.cardholderName) {
        alert('Please fill in all card details');
        return false;
      }

      // Validate card number
      if (!ibmPaymentGateway.validateCard(cardDetails.cardNumber)) {
        alert('Please enter a valid card number');
        return false;
      }
    }

    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setPaymentStatus({ success: false, status: 'processing', message: 'Processing your payment...', transactionId: 'pending' });

    try {
      const paymentRequest = {
        orderId: mockOrder.id,
        amount: mockOrder.total,
        currency: mockOrder.currency,
        paymentMethod: selectedPaymentMethod,
        billingAddress,
        ...(selectedPaymentMethod === 'card' && { cardDetails })
      };

      const response = await ibmPaymentGateway.processPayment(paymentRequest);
      setPaymentStatus(response);
    } catch (error) {
      console.log(error)
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">IBM Payment Gateway</h1>
                <p className="text-sm text-gray-600">Secure Checkout</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm text-green-600 font-medium">SSL Secured</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Payment Method Selection */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <PaymentMethodSelector
                methods={paymentMethods}
                selectedMethod={selectedPaymentMethod}
                onMethodSelect={setSelectedPaymentMethod}
              />
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <BillingAddressForm
                address={billingAddress}
                onChange={setBillingAddress}
              />
            </div>

            {/* Card Details (only show if card payment is selected) */}
            {selectedPaymentMethod === 'card' && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <CardDetailsForm
                  cardDetails={cardDetails}
                  onChange={setCardDetails}
                />
              </div>
            )}

            {/* Payment Button */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Payment</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-500">
                <span>🔒 256-bit SSL encryption</span>
                <span>•</span>
                <span>PCI DSS compliant</span>
                <span>•</span>
                <span>IBM secured</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary order={mockOrder} />
            </div>
          </div>
        </div>
      </main>

      {/* Payment Processing Modal */}
      {paymentStatus && (
        <PaymentProcessing
          status={paymentStatus.status}
          message={paymentStatus.message}
          transactionId={paymentStatus.transactionId}
        />
      )}
    </div>
  );
}

export default App;