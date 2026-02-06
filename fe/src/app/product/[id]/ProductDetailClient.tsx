'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Product } from '@/shared/types/product.types'
import { ProductGallery } from './components/ProductGallery'
import { ProductInfo } from './components/ProductInfo'
import { ProductTabs } from './components/ProductTabs'
import { RelatedProducts } from './components/RelatedProducts'

interface Props {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailClient({ product, relatedProducts }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState('default')

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
  }

  // Calculate discount percentage if originalPrice exists
  const discountPercent = useMemo(() => {
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    }
    return 0
  }, [product.price, product.originalPrice])

  // Handle add to cart
  const handleAddToCart = () => {
    console.log('Add to cart:', { productId: product.id, quantity, variant: selectedVariant })
    // TODO: Implement cart logic
    alert(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`)
  }

  // Handle quantity change
  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => {
      const newQty = prev + delta
      if (newQty < 1) return 1
      if (product.stock && newQty > product.stock) return product.stock
      return newQty
    })
  }

  // Gallery images (using emoji as placeholder)
  const images = useMemo(() => {
    return [product.image, product.image, product.image, product.image]
  }, [product.image])

  return (
    <main className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-green-600 transition-colors">
          Trang chủ
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href={`/category/${product.categorySlug}`} className="hover:text-green-600 transition-colors">
          Danh mục
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      {/* Main Product Section - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Gallery */}
        <ProductGallery images={images} productName={product.name} />

        {/* Right Column - Product Info */}
        <ProductInfo
          product={product}
          quantity={quantity}
          selectedVariant={selectedVariant}
          discountPercent={discountPercent}
          formatPrice={formatPrice}
          onQuantityChange={handleQuantityChange}
          onVariantChange={setSelectedVariant}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Product Details Tabs */}
      <ProductTabs product={product} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} formatPrice={formatPrice} />
      )}
    </main>
  )
}
