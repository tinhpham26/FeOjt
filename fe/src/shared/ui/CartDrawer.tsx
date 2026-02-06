'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart.store'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCartStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
  }

  const cartCount = getTotalItems()
  const cartTotal = getTotalPrice()

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header - Green background */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-xl">Giỏ hàng của bạn</h2>
            <p className="text-white/90 text-sm mt-1">{cartCount} sản phẩm</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Đóng giỏ hàng"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items List - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {items.length > 0 ? (
            <div className="p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-4xl border-2 border-gray-100">
                      {item.image}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                          aria-label="Xóa"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      {item.discount && (
                        <span className="inline-block px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded mb-2">
                          {item.discount}
                        </span>
                      )}

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between">
                        {/* Quantity Control */}
                        <div className="flex items-center gap-1 bg-gray-100 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-l-lg transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-10 text-center text-gray-900 font-semibold text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-white bg-green-600 hover:bg-green-700 rounded-r-lg transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          {item.originalPrice && (
                            <div className="text-xs text-gray-400 line-through">
                              {formatPrice(item.originalPrice * item.quantity)}
                            </div>
                          )}
                          <div className="font-bold text-green-600">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="text-8xl mb-4">🛒</div>
              <p className="text-gray-500 font-medium text-lg mb-2">Giỏ hàng trống</p>
              <p className="text-gray-400 text-sm mb-6">
                Thêm sản phẩm vào giỏ để tiếp tục mua sắm
              </p>
              <Link
                href="/customer"
                onClick={onClose}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          )}
        </div>

        {/* Footer - Total and Checkout */}
        {items.length > 0 && (
          <div className="bg-white border-t-2 border-gray-200 p-6 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <span className="text-gray-700 font-semibold text-lg">Tổng cộng:</span>
              <span className="text-green-600 font-bold text-2xl">{formatPrice(cartTotal)}</span>
            </div>

            {/* View Cart Button */}
            <Link
              href="/customer/cart"
              onClick={onClose}
              className="block w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold text-center transition-all duration-200 shadow-lg hover:shadow-xl active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Xem giỏ hàng</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
