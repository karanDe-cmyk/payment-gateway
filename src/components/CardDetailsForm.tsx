import React, { useState } from "react";
import { CardDetails } from "../types";
import { CreditCard, Lock, Eye, EyeOff } from "lucide-react";
import ibmPaymentGateway from "../services/ibmPaymentGateway";

interface CardDetailsFormProps {
  cardDetails: CardDetails;
  onChange: (details: CardDetails) => void;
}

const CardDetailsForm: React.FC<CardDetailsFormProps> = ({
  cardDetails,
  onChange,
}) => {
  const [showCvv, setShowCvv] = useState(false);
  const [cardType, setCardType] = useState("");

  const handleChange = (field: keyof CardDetails, value: string) => {
    let formattedValue = value;

    if (field === "cardNumber") {
      // Format card number with spaces
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ");
      // Detect card type
      const type = ibmPaymentGateway.getCardType(value);
      setCardType(type);
    } else if (field === "expiryMonth" || field === "expiryYear") {
      // Only allow numbers
      formattedValue = value.replace(/\D/g, "");
    } else if (field === "cvv") {
      // Only allow numbers, max 4 digits
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    onChange({ ...cardDetails, [field]: formattedValue });
  };

  const getCardIcon = () => {
    switch (cardType) {
      case "Visa":
        return "💳";
      case "Mastercard":
        return "💳";
      case "American Express":
        return "💳";
      case "Discover":
        return "💳";
      default:
        return "💳";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <CreditCard className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Card Details</h3>
        <Lock className="h-4 w-4 text-green-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number
        </label>
        <div className="relative">
          <input
            type="text"
            value={cardDetails.cardNumber}
            onChange={(e) => handleChange("cardNumber", e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            required
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <span className="text-lg">{getCardIcon()}</span>
          </div>
        </div>
        {cardType && (
          <p className="text-xs text-gray-500 mt-1">{cardType} detected</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cardholder Name
        </label>
        <input
          type="text"
          value={cardDetails.cardholderName}
          onChange={(e) => handleChange("cardholderName", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="John Doe"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Month
          </label>
          <select
            value={cardDetails.expiryMonth}
            onChange={(e) => handleChange("expiryMonth", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="">MM</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month.toString().padStart(2, "0")}>
                {month.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <select
            value={cardDetails.expiryYear}
            onChange={(e) => handleChange("expiryYear", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="">YYYY</option>
            {Array.from(
              { length: 10 },
              (_, i) => new Date().getFullYear() + i
            ).map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVV
          </label>
          <div className="relative">
            <input
              type={showCvv ? "text" : "password"}
              value={cardDetails.cvv}
              onChange={(e) => handleChange("cvv", e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="123"
              maxLength={4}
              required
            />
            <button
              type="button"
              onClick={() => setShowCvv(!showCvv)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCvv ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Lock className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-gray-700">
            Secure Payment
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          Your card information is encrypted using industry-standard SSL
          technology
        </p>
      </div>
    </div>
  );
};

export default CardDetailsForm;
