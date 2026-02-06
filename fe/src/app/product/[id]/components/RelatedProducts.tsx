'use client'

import { memo } from 'react'
import Link from 'next/link'
import { Product } from '@/shared/types/product.types'

interface Props {
  products: Product[]
  formatPrice: (price: number) => string
}

export const RelatedProducts = memo(function RelatedProducts({ products, formatPrice }: Props) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sản phẩm liên quan</h2>
        <Link
          href="/category/all"
          className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1 transition-colors"
        >
          Xem tất cả
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-green-500 transition-all group"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-6">
              <div className="text-6xl group-hover:scale-110 transition-transform">
                {product.image}
              </div>
              
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}%
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                {product.name}
              </h3>
              
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-lg font-bold text-green-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              
              <div className="text-xs text-gray-500">
                /{product.unit}
              </div>

              {/* Stock Status */}
              {product.stock && product.stock > 0 ? (
                <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Còn hàng
                </div>
              ) : (
                <div className="flex items-center gap-1 mt-2 text-xs text-red-600">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Hết hàng
                </div>
              )}
            </div>

            {/* Quick Add Button */}
            <div className="px-4 pb-4">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  alert(`Đã thêm ${product.name} vào giỏ hàng!`)
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Thêm vào giỏ
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
})
