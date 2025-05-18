"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useCart } from "@/context/cart-context"
import ShippingAddressForm from "./shipping-address-form"
import PaymentMethodForm from "./payment-method-form"
import OrderSummary from "./order-summary"

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

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, items, subtotal, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState("")

  // Generate a random order ID when order is placed
  useEffect(() => {
    if (orderPlaced) {
      setOrderId(`ORD-${Math.floor(100000 + Math.random() * 900000)}`)
    }
  }, [orderPlaced])

  const handleShippingSubmit = (address: Address) => {
    setShippingAddress(address)
    setCurrentStep(2)
  }

  const handlePaymentSubmit = (payment: PaymentMethod) => {
    setPaymentMethod(payment)
    setCurrentStep(3)
  }

  const handlePlaceOrder = () => {
    // Here you would typically send an API request to create the order
    console.log("Order placed with:", {
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      tax: subtotal * 0.08,
      total: subtotal * 1.08,
    })

    setOrderPlaced(true)
  }

  const handleStartOver = () => {
    clearCart()
    setCurrentStep(1)
    setShippingAddress(null)
    setPaymentMethod(null)
    setOrderPlaced(false)
    closeCheckout()
  }

  if (!isCheckoutOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm" onClick={closeCheckout}></div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto bg-[#04050c] z-50 rounded-xl shadow-2xl border border-white/10">
        <div className="sticky top-0 bg-[#04050c] z-10 px-4 sm:px-6 py-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {orderPlaced
              ? "Order Confirmation"
              : `Checkout ${currentStep === 1 ? "- Shipping" : currentStep === 2 ? "- Payment" : "- Review"}`}
          </h2>
          <button
            onClick={closeCheckout}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        <div className="px-4 sm:px-6 py-6">
          {orderPlaced ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-[#f6d2b0]/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#f6d2b0]"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Thank You for Your Order!</h3>
              <p className="text-white/70 mb-6">Your order has been placed successfully</p>

              <div className="glass-card mx-auto max-w-md p-6 rounded-xl mb-8">
                <div className="border-b border-white/10 pb-4 mb-4">
                  <span className="text-white/60 text-sm">Order Number</span>
                  <p className="text-white text-lg font-bold">{orderId}</p>
                </div>

                <div className="border-b border-white/10 pb-4 mb-4">
                  <span className="text-white/60 text-sm">Shipping Address</span>
                  <p className="text-white">
                    {shippingAddress?.fullName}
                    <br />
                    {shippingAddress?.addressLine1}
                    <br />
                    {shippingAddress?.addressLine2 && (
                      <>
                        {shippingAddress.addressLine2}
                        <br />
                      </>
                    )}
                    {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.postalCode}
                    <br />
                    {shippingAddress?.country}
                  </p>
                </div>

                <div>
                  <span className="text-white/60 text-sm">Payment Method</span>
                  <p className="text-white">
                    {paymentMethod?.type === "credit_card"
                      ? `Credit Card ending in ${paymentMethod.cardNumber?.slice(-4)}`
                      : paymentMethod?.type === "paypal"
                        ? "PayPal"
                        : "Bank Transfer"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleStartOver}
                  className="bg-[#f6d2b0] text-[#04050c] px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
                >
                  Return to Shop
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-transparent border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
                >
                  Print Receipt
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center font-medium ${
                        currentStep >= step ? "bg-[#644caa] text-white" : "bg-white/10 text-white/50"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`h-1 w-12 sm:w-16 mx-1 ${currentStep > step ? "bg-[#644caa]" : "bg-white/10"}`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              {currentStep === 1 && (
                <ShippingAddressForm onSubmit={handleShippingSubmit} initialValues={shippingAddress} />
              )}

              {currentStep === 2 && (
                <PaymentMethodForm
                  onSubmit={handlePaymentSubmit}
                  onBack={() => setCurrentStep(1)}
                  initialValues={paymentMethod}
                />
              )}

              {currentStep === 3 && (
                <OrderSummary
                  items={items}
                  subtotal={subtotal}
                  shippingAddress={shippingAddress!}
                  paymentMethod={paymentMethod!}
                  onPlaceOrder={handlePlaceOrder}
                  onEditShipping={() => setCurrentStep(1)}
                  onEditPayment={() => setCurrentStep(2)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
