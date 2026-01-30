'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const banners = [
  {
    icon: '🎉',
    title: 'Khuyến mãi đặc biệt',
    subtitle: 'Giảm giá lên đến 50% cho đơn hàng đầu tiên',
    cta: 'Mua ngay',
    href: '/products',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    icon: '🚚',
    title: 'Giao hàng siêu tốc',
    subtitle: 'Giao trong 2 giờ - Miễn phí vận chuyển',
    cta: 'Đặt hàng',
    href: '/products',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    icon: '🥬',
    title: 'Tươi ngon mỗi ngày',
    subtitle: 'Hàng trăm sản phẩm tươi sống chất lượng',
    cta: 'Khám phá',
    href: '/products',
    gradient: 'from-green-500 to-emerald-600'
  }
]

export function HeroBanner() {
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const banner = banners[currentBanner]

  return (
    <div className="relative">
      <div className={`bg-gradient-to-r ${banner.gradient} rounded-2xl overflow-hidden h-[400px] flex items-center justify-center relative shadow-xl`}>
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <div className="text-6xl mb-4 animate-bounce">{banner.icon}</div>
          <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">{banner.title}</h2>
          <p className="text-2xl mb-8 drop-shadow-md">{banner.subtitle}</p>
          <Link 
            href={banner.href}
            className="inline-block bg-white text-emerald-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
          >
            {banner.cta} →
          </Link>
        </div>
      </div>

      {/* Banner indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentBanner ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
