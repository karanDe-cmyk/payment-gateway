import React from "react";
import { Lock } from "lucide-react";

interface UpiDetails {
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  upiId: string;
}

interface UpiDetailsFormProps {
  upiDetails: UpiDetails;
  onChange: (details: UpiDetails) => void;
}

const UpiDetailsForm: React.FC<UpiDetailsFormProps> = ({
  upiDetails,
  onChange,
}) => {
  const handleChange = (field: keyof UpiDetails, value: string) => {
    onChange({ ...upiDetails, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">UPI Payment</h3>
        <Lock className="h-4 w-4 text-green-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          UPI ID
        </label>
        <input
          type="text"
          value={upiDetails.upiId}
          onChange={(e) => handleChange("upiId", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="example@upi"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          value={upiDetails.customerName}
          onChange={(e) => handleChange("customerName", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Your full name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mobile Number
        </label>
        <input
          type="tel"
          value={upiDetails.customerMobile}
          onChange={(e) => handleChange("customerMobile", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="10-digit number"
          maxLength={10}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          value={upiDetails.customerEmail}
          onChange={(e) => handleChange("customerEmail", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Lock className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-gray-700">
            Secure Payment
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          Your UPI ID is securely handled through encrypted connections.
        </p>
      </div>
    </div>
  );
};

export default UpiDetailsForm;
