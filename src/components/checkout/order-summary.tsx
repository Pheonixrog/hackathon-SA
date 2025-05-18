"use client"

import { ArrowLeft, Pencil } from "lucide-react"
import type { CartItem } from "@/context/cart-context"

interface Address {
  fullName: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
}

interface PaymentMethod {
  type: "credit_card" | "paypal" | "bank_transfer"
  cardNumber?: string
  nameOnCard?: string
  expiryDate?: string
  cvv?: string
}

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  shippingAddress: Address
  paymentMethod: PaymentMethod
  onPlaceOrder: () => void
  onEditShipping: () => void
  onEditPayment: () => void
}

export default function OrderSummary({
  items,
  subtotal,
  shippingAddress,
  paymentMethod,
  onPlaceOrder,
  onEditShipping,
  onEditPayment,
}: OrderSummaryProps) {
  const tax = subtotal * 0.08
  const total = subtotal + tax

  // Free shipping for orders over $100, otherwise $9.99
  const shipping = subtotal > 100 ? 0 : 9.99

  // Final total with shipping
  const finalTotal = total + shipping

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>

      {/* Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 bg-white/5 p-3 rounded-lg">
            <div className="w-16 h-16 flex-shrink-0 bg-white/10 rounded overflow-hidden">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <h4 className="font-medium text-white">{item.name}</h4>
                <span className="text-white">${item.price.toFixed(2)}</span>
              </div>
              <div className="text-sm text-white/70">{item.category}</div>
              <div className="text-white/70 mt-1">Qty: {item.quantity}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Address */}
      <div className="bg-white/5 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-white">Shipping Address</h4>
          <button
            onClick={onEditShipping}
            className="text-[#f6d2b0] hover:text-[#f6d2b0]/80 transition-colors flex items-center gap-1"
          >
            <Pencil size={14} />
            <span className="text-sm">Edit</span>
          </button>
        </div>
        <div className="text-white/70 text-sm">
          <p>{shippingAddress.fullName}</p>
          <p>{shippingAddress.addressLine1}</p>
          {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
          <p>
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
          </p>
          <p>{shippingAddress.country}</p>
          <p className="mt-1">Phone: {shippingAddress.phone}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white/5 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-white">Payment Method</h4>
          <button
            onClick={onEditPayment}
            className="text-[#f6d2b0] hover:text-[#f6d2b0]/80 transition-colors flex items-center gap-1"
          >
            <Pencil size={14} />
            <span className="text-sm">Edit</span>
          </button>
        </div>
        <div className="text-white/70 text-sm">
          {paymentMethod.type === "credit_card" && <p>Credit Card ending in {paymentMethod.cardNumber?.slice(-4)}</p>}
          {paymentMethod.type === "paypal" && <p>PayPal</p>}
          {paymentMethod.type === "bank_transfer" && <p>Bank Transfer</p>}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-2 border-t border-white/10 pt-4">
        <div className="flex justify-between">
          <span className="text-white/70">Subtotal</span>
          <span className="text-white">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Tax (8%)</span>
          <span className="text-white">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Shipping</span>
          <span className="text-white">
            {shipping === 0 ? <span className="text-green-400">Free</span> : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between pt-2 border-t border-white/10 mt-2">
          <span className="font-bold text-white">Total</span>
          <span className="font-bold text-white">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onEditPayment}
          className="flex items-center gap-2 text-white hover:text-[#f6d2b0] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Payment
        </button>

        <button
          onClick={onPlaceOrder}
          className="bg-[#f6d2b0] text-[#04050c] px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors"
        >
          Place Order
        </button>
      </div>

      <p className="text-white/50 text-xs text-center pt-4">
        By placing your order, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}
