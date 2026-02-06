'use client'

import { memo } from 'react'
import { Product } from '@/shared/types/product.types'

interface Props {
  product: Product
  quantity: number
  selectedVariant: string
  discountPercent: number
  formatPrice: (price: number) => string
  onQuantityChange: (delta: number) => void
  onVariantChange: (variant: string) => void
  onAddToCart: () => void
}

export const ProductInfo = memo(function ProductInfo({
  product,
  quantity,
  selectedVariant,
  discountPercent,
  formatPrice,
  onQuantityChange,
  onVariantChange,
  onAddToCart,
}: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      {/* Product Name */}
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        {product.name}
      </h1>

      {/* SKU */}
      <div className="text-sm text-gray-500 mb-4">
        SKU: <span className="font-mono">#{product.id.toString().padStart(6, '0')}</span>
      </div>

      {/* Price Box */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-200">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-green-600">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>
        <div className="text-sm text-gray-600 mt-1">/{product.unit}</div>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2 mb-6">
        {product.stock && product.stock > 0 ? (
          <>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">
              Còn hàng ({product.stock} {product.unit})
            </span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-red-700">Hết hàng</span>
          </>
        )}
      </div>

      {/* Shipping Info */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
        <div className="flex items-start gap-3 mb-2">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <div className="text-sm">
            <p className="font-semibold text-blue-900 mb-1">Miễn phí giao hàng</p>
            <p className="text-blue-700">Cho đơn hàng từ 200.000đ</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm">
            <p className="font-semibold text-blue-900 mb-1">Giao hàng nhanh</p>
            <p className="text-blue-700">Trong vòng 1-2 giờ</p>
          </div>
        </div>
      </div>

      {/* Promotions */}
      {product.discount && (
        <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-200">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-amber-900">
              Ưu đãi đặc biệt - Giảm {discountPercent}%
            </span>
          </div>
        </div>
      )}

      {/* Variant Selection (Unit) */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Đơn vị tính
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => onVariantChange('default')}
            className={`px-6 py-2.5 rounded-lg border-2 font-medium transition-all ${
              selectedVariant === 'default'
                ? 'border-green-600 bg-green-50 text-green-700'
                : 'border-gray-300 bg-white text-gray-700 hover:border-green-400'
            }`}
          >
            {product.unit.toUpperCase()}
          </button>
        </div>
      </div>

      {/* Quantity Control */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Số lượng
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => onQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <div className="w-16 h-12 flex items-center justify-center font-bold text-lg border-x-2 border-gray-300">
              {quantity}
            </div>
            <button
              onClick={() => onQuantityChange(1)}
              disabled={product.stock ? quantity >= product.stock : false}
              className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <span className="text-sm text-gray-600">
            {product.stock && `(Còn ${product.stock} ${product.unit})`}
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={onAddToCart}
        disabled={!product.stock || product.stock === 0}
        className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span>THÊM VÀO GIỎ HÀNG</span>
      </button>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button className="py-3 px-4 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Yêu thích
        </button>
        <button className="py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Chia sẻ
        </button>
      </div>
    </div>
  )
})
