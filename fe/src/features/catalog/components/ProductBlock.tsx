'use client'

import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  unit: string
  image: string
  discount?: string
}

const products: Product[] = [
  { id: 1, name: 'Rau cải xanh hữu cơ', price: '15,000đ', originalPrice: '20,000đ', unit: 'kg', image: '🥬', discount: '-25%' },
  { id: 2, name: 'Cà chua bi Đà Lạt', price: '35,000đ', originalPrice: '45,000đ', unit: 'kg', image: '🍅', discount: '-22%' },
  { id: 3, name: 'Xà lách xoong', price: '12,000đ', unit: 'kg', image: '🥗' },
  { id: 4, name: 'Cải thảo', price: '18,000đ', originalPrice: '25,000đ', unit: 'kg', image: '🥦', discount: '-28%' },
  { id: 5, name: 'Bông cải xanh', price: '28,000đ', unit: 'kg', image: '🥦' },
  { id: 6, name: 'Dưa leo', price: '20,000đ', originalPrice: '25,000đ', unit: 'kg', image: '🥒', discount: '-20%' },
]

interface ProductBlockProps {
  title: string
}

export function ProductBlock({ title }: ProductBlockProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <Link href="/products" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Xem tất cả →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/products/${product.id}`}>
              <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}
                  </div>
                )}
                <div className="text-6xl">{product.image}</div>
              </div>
            </Link>
            <div className="p-3">
              <Link href={`/products/${product.id}`}>
                <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 hover:text-primary-600">
                  {product.name}
                </h4>
              </Link>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-lg font-bold text-primary-600">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                )}
                <span className="text-xs text-gray-500">/{product.unit}</span>
              </div>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-medium">Thêm vào giỏ</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
