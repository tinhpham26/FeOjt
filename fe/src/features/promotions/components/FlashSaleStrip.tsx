'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const flashSaleProducts = [
  { id: 1, name: 'Táo Fuji Nhật Bản', price: '49.000đ', originalPrice: '89.000đ', discount: '-45%', image: '🍎', sold: 234, stock: 500 },
  { id: 2, name: 'Thịt ba chỉ heo', price: '129.000đ', originalPrice: '199.000đ', discount: '-35%', image: '🥩', sold: 156, stock: 300 },
  { id: 3, name: 'Cá hồi Na Uy', price: '299.000đ', originalPrice: '499.000đ', discount: '-40%', image: '🐟', sold: 89, stock: 200 },
  { id: 4, name: 'Sữa tươi Vinamilk', price: '25.000đ', originalPrice: '35.000đ', discount: '-28%', image: '🥛', sold: 567, stock: 1000 },
  { id: 5, name: 'Rau xanh hữu cơ', price: '15.000đ', originalPrice: '25.000đ', discount: '-40%', image: '🥬', sold: 345, stock: 800 },
  { id: 6, name: 'Tôm sú tươi', price: '199.000đ', originalPrice: '299.000đ', discount: '-33%', image: '🦐', sold: 123, stock: 250 },
  { id: 7, name: 'Gạo ST25', price: '89.000đ', originalPrice: '129.000đ', discount: '-31%', image: '🌾', sold: 456, stock: 600 },
  { id: 8, name: 'Dầu ăn Cái Lân', price: '69.000đ', originalPrice: '99.000đ', discount: '-30%', image: '🛢️', sold: 289, stock: 400 },
]

export function FlashSaleStrip() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 34, seconds: 56 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-r from-red-500 via-red-600 to-orange-500 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="animate-pulse">
            <span className="text-4xl drop-shadow-lg">⚡</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white drop-shadow-md">FLASH SALE</h3>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-white/90 font-medium">Kết thúc trong:</p>
              <div className="flex items-center gap-1">
                <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-white font-bold text-sm min-w-[32px] text-center">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className="text-white font-bold">:</span>
                <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-white font-bold text-sm min-w-[32px] text-center">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className="text-white font-bold">:</span>
                <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-white font-bold text-sm min-w-[32px] text-center">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link href="/customer/flash-sale" className="text-white hover:underline font-medium bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
          Xem tất cả →
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {flashSaleProducts.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-48 bg-white rounded-xl p-4 hover:shadow-lg transition-shadow"
          >
            <div className="relative mb-3">
              <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-5xl">
                {product.image}
              </div>
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}
              </span>
            </div>
            <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-red-600">{product.price}</span>
              <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
            </div>
            <div className="mt-2">
              <div className="bg-red-50 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-500 to-orange-500 h-full transition-all" 
                  style={{ width: `${(product.sold / product.stock) * 100}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-600">Đã bán {product.sold}</p>
                <p className="text-xs text-red-600 font-medium">Còn {product.stock - product.sold}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
