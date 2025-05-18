"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, CreditCard, ArrowLeft } from "lucide-react"

interface PaymentMethod {
  type: "credit_card" | "paypal" | "bank_transfer"
  cardNumber?: string
  nameOnCard?: string
  expiryDate?: string
  cvv?: string
}

interface PaymentMethodFormProps {
  onSubmit: (paymentMethod: PaymentMethod) => void
  onBack: () => void
  initialValues: PaymentMethod | null
}

const defaultPayment: PaymentMethod = {
  type: "credit_card",
  cardNumber: "",
  nameOnCard: "",
  expiryDate: "",
  cvv: "",
}

export default function PaymentMethodForm({ onSubmit, onBack, initialValues }: PaymentMethodFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(initialValues || defaultPayment)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Special handling for credit card number (add spaces)
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s+/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .substring(0, 19)

      setPaymentMethod((prev) => ({ ...prev, [name]: formattedValue }))
    }
    // Special handling for expiry date (add slash)
    else if (name === "expiryDate") {
      const cleanValue = value.replace(/[^\d]/g, "")
      const formattedValue =
        cleanValue.length > 2 ? `${cleanValue.substring(0, 2)}/${cleanValue.substring(2, 4)}` : cleanValue

      setPaymentMethod((prev) => ({ ...prev, [name]: formattedValue }))
    }
    // Special handling for CVV (limit to 3-4 digits)
    else if (name === "cvv") {
      const formattedValue = value.replace(/[^\d]/g, "").substring(0, 4)
      setPaymentMethod((prev) => ({ ...prev, [name]: formattedValue }))
    } else {
      setPaymentMethod((prev) => ({ ...prev, [name]: value }))
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleTypeChange = (type: "credit_card" | "paypal" | "bank_transfer") => {
    setPaymentMethod((prev) => ({ ...prev, type }))
    // Clear card-specific errors when changing payment type
    setErrors({})
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (paymentMethod.type === "credit_card") {
      // Card number validation (16 digits + spaces)
      if (!paymentMethod.cardNumber?.trim()) {
        newErrors.cardNumber = "Card number is required"
      } else if (paymentMethod.cardNumber.replace(/\s+/g, "").length !== 16) {
        newErrors.cardNumber = "Card number must be 16 digits"
      }

      // Name validation
      if (!paymentMethod.nameOnCard?.trim()) {
        newErrors.nameOnCard = "Name is required"
      }

      // Expiry date validation (MM/YY format)
      if (!paymentMethod.expiryDate?.trim()) {
        newErrors.expiryDate = "Expiry date is required"
      } else if (!/^\d{2}\/\d{2}$/.test(paymentMethod.expiryDate)) {
        newErrors.expiryDate = "Invalid format (MM/YY)"
      } else {
        // Check if date is in the future
        const [month, year] = paymentMethod.expiryDate.split("/").map((n) => Number.parseInt(n, 10))
        const now = new Date()
        const currentYear = now.getFullYear() % 100 // Get last 2 digits of year
        const currentMonth = now.getMonth() + 1

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          newErrors.expiryDate = "Card has expired"
        }

        if (month < 1 || month > 12) {
          newErrors.expiryDate = "Invalid month"
        }
      }

      // CVV validation
      if (!paymentMethod.cvv?.trim()) {
        newErrors.cvv = "CVV is required"
      } else if (!/^\d{3,4}$/.test(paymentMethod.cvv)) {
        newErrors.cvv = "CVV must be 3-4 digits"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(paymentMethod)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <label className="block text-white mb-3">Select Payment Method</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              paymentMethod.type === "credit_card"
                ? "bg-[#644caa]/30 border-2 border-[#644caa]"
                : "bg-white/10 border border-white/20 hover:bg-white/20"
            }`}
            onClick={() => handleTypeChange("credit_card")}
          >
            <div className="flex flex-col items-center gap-2">
              <CreditCard className="h-6 w-6 text-white" />
              <span className="text-white font-medium">Credit Card</span>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              paymentMethod.type === "paypal"
                ? "bg-[#644caa]/30 border-2 border-[#644caa]"
                : "bg-white/10 border border-white/20 hover:bg-white/20"
            }`}
            onClick={() => handleTypeChange("paypal")}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl text-white font-bold">P</span>
              <span className="text-white font-medium">PayPal</span>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              paymentMethod.type === "bank_transfer"
                ? "bg-[#644caa]/30 border-2 border-[#644caa]"
                : "bg-white/10 border border-white/20 hover:bg-white/20"
            }`}
            onClick={() => handleTypeChange("bank_transfer")}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl text-white font-bold">🏦</span>
              <span className="text-white font-medium">Bank Transfer</span>
            </div>
          </div>
        </div>
      </div>

      {paymentMethod.type === "credit_card" && (
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-white mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentMethod.cardNumber}
              onChange={handleChange}
              className={`w-full bg-white/10 border ${errors.cardNumber ? "border-red-500" : "border-white/20"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa]`}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            {errors.cardNumber && (
              <p className="mt-1 text-red-400 flex items-center gap-1 text-sm">
                <AlertCircle size={12} />
                <span>{errors.cardNumber}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="nameOnCard" className="block text-white mb-1">
              Name on Card
            </label>
            <input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              value={paymentMethod.nameOnCard}
              onChange={handleChange}
              className={`w-full bg-white/10 border ${errors.nameOnCard ? "border-red-500" : "border-white/20"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa]`}
              placeholder="John Doe"
            />
            {errors.nameOnCard && (
              <p className="mt-1 text-red-400 flex items-center gap-1 text-sm">
                <AlertCircle size={12} />
                <span>{errors.nameOnCard}</span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-white mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={paymentMethod.expiryDate}
                onChange={handleChange}
                className={`w-full bg-white/10 border ${errors.expiryDate ? "border-red-500" : "border-white/20"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa]`}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.expiryDate && (
                <p className="mt-1 text-red-400 flex items-center gap-1 text-sm">
                  <AlertCircle size={12} />
                  <span>{errors.expiryDate}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cvv" className="block text-white mb-1">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentMethod.cvv}
                onChange={handleChange}
                className={`w-full bg-white/10 border ${errors.cvv ? "border-red-500" : "border-white/20"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa]`}
                placeholder="123"
                maxLength={4}
              />
              {errors.cvv && (
                <p className="mt-1 text-red-400 flex items-center gap-1 text-sm">
                  <AlertCircle size={12} />
                  <span>{errors.cvv}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {paymentMethod.type === "paypal" && (
        <div className="bg-white/10 p-6 rounded-lg border border-white/20 text-center">
          <p className="text-white mb-4">You will be redirected to PayPal to complete your payment.</p>
          <div className="inline-block bg-[#0070ba] px-4 py-3 rounded text-white font-bold">PayPal Checkout</div>
        </div>
      )}

      {paymentMethod.type === "bank_transfer" && (
        <div className="bg-white/10 p-6 rounded-lg border border-white/20">
          <p className="text-white mb-4">Please use the following details to make a bank transfer:</p>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/70">Bank Name:</span>
              <span className="text-white">ReachOut Financial</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Account Name:</span>
              <span className="text-white">ReachOut Marketing Inc.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Account Number:</span>
              <span className="text-white">XXXX-XXXX-1234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Routing Number:</span>
              <span className="text-white">123456789</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Reference:</span>
              <span className="text-white">Your Order ID will be provided</span>
            </div>
          </div>
          <p className="text-white/70 mt-4 text-sm">Note: Your order will be processed once payment is verified.</p>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-[#f6d2b0] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Shipping
        </button>

        <button
          type="submit"
          className="bg-[#644caa] text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
        >
          Review Order
        </button>
      </div>
    </form>
  )
}
