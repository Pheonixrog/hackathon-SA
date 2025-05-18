"use client"
import { X, ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { useCart, type CartItem } from "@/context/cart-context"
import CheckoutModal from "./checkout/checkout-modal"

export default function Cart() {
  const { items, isCartOpen, closeCart, removeItem, updateQuantity, totalItems, subtotal, clearCart, openCheckout } =
    useCart()

  return (
    <>
      <div className={`cart-overlay ${isCartOpen ? "open" : ""}`} onClick={closeCart}></div>
      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingCart size={20} className="text-[#f6d2b0]" />
              <h3 className="text-xl font-bold">Your Cart ({totalItems})</h3>
            </div>
            <button onClick={closeCart} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-white/70">
                <ShoppingCart size={48} className="mb-4 opacity-50" />
                <p className="text-lg mb-2">Your cart is empty</p>
                <p className="text-sm text-center">Add some products to your cart and they will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onRemove={() => removeItem(item.id)}
                    onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-white/10">
              <div className="flex justify-between mb-4">
                <span className="text-white/70">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-white/70">Estimated Tax</span>
                <span className="font-bold">${(subtotal * 0.08).toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-6 text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold">${(subtotal * 1.08).toFixed(2)}</span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={openCheckout}
                  className="w-full bg-[#f6d2b0] text-[#04050c] font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="w-full bg-transparent border border-white/20 text-white py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal />
    </>
  )
}

interface CartItemCardProps {
  item: CartItem
  onRemove: () => void
  onUpdateQuantity: (quantity: number) => void
}

function CartItemCard({ item, onRemove, onUpdateQuantity }: CartItemCardProps) {
  return (
    <div className="flex gap-4 p-3 bg-white/5 rounded-lg">
      <div className="w-20 h-20 bg-white/10 rounded-md overflow-hidden flex-shrink-0">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-grow">
        <div className="flex justify-between">
          <h4 className="font-medium">{item.name}</h4>
          <button onClick={onRemove} className="text-white/50 hover:text-white/80 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="text-sm text-white/70 mb-2">{item.category}</div>

        <div className="flex justify-between items-center">
          <div className="font-bold">${item.price.toFixed(2)}</div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              className="w-6 h-6 flex items-center justify-center bg-white/10 rounded hover:bg-white/20 transition-colors"
            >
              <Minus size={14} />
            </button>

            <span className="w-8 text-center">{item.quantity}</span>

            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="w-6 h-6 flex items-center justify-center bg-white/10 rounded hover:bg-white/20 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
