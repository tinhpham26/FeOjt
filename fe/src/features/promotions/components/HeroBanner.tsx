'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

/**
 * Hero Banner Images - Place your images in /public/ folder
 * Recommended image specs:
 * - Dimensions: 1920x600px or 1920x700px (16:5 or similar ratio)
 * - Format: JPG or WebP for best performance
 * - Size: < 300KB per image (optimized for web)
 * - Content: Real product photos, store ambiance, or promotional campaigns
 */

interface BannerSlide {
  id: number
  image: string
  title: string
  subtitle: string
  cta: {
    text: string
    href: string
  }
  badge?: string
  textPosition: 'left' | 'center' | 'right'
  textColor: 'light' | 'dark'
}

const banners: BannerSlide[] = [
  {
    id: 1,
    image: '/herobanner-1.png',
    title: 'Thực phẩm tươi sống mỗi ngày',
    subtitle: 'Nguồn gốc rõ ràng - Giá cả hợp lý',
    cta: {
      text: 'Mua ngay',
      href: '/customer/products'
    },
    badge: 'Miễn phí giao hàng',
    textPosition: 'left',
    textColor: 'light'
  },
  {
    id: 2,
    image: '/herobanner-7.png',
    title: 'Flash Sale cuối tuần',
    subtitle: 'Giảm đến 40% cho hàng trăm sản phẩm',
    cta: {
      text: 'Xem ưu đãi',
      href: '/customer/promotions'
    },
    badge: 'Chỉ 3 ngày',
    textPosition: 'center',
    textColor: 'light'
  },
  {
    id: 3,
    image: '/herobanner-4.png',
    title: 'Rau củ quả hữu cơ',
    subtitle: 'An toàn - Sạch - Tươi ngon',
    cta: {
      text: 'Khám phá',
      href: '/customer/category/organic'
    },
    textPosition: 'right',
    textColor: 'dark'
  },
  {
    id: 4,
    image: '/herobanner-5.png',
    title: 'Giao hàng nhanh trong 2 giờ',
    subtitle: 'Đặt online - Nhận tại nhà',
    cta: {
      text: 'Đặt hàng ngay',
      href: '/customer/products'
    },
    badge: 'Miễn phí ship 150K+',
    textPosition: 'left',
    textColor: 'light'
  }
]

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const banner = banners[currentSlide]

  const getTextAlignmentClass = () => {
    switch (banner.textPosition) {
      case 'left':
        return 'items-start text-left'
      case 'right':
        return 'items-end text-right'
      default:
        return 'items-center text-center'
    }
  }

  const getTextColorClass = () => {
    return banner.textColor === 'light' ? 'text-white' : 'text-gray-900'
  }

  return (
    <div className="relative">
      {/* Main Banner Container - Lazada Style */}
      <div className="relative rounded-lg md:rounded-xl overflow-hidden shadow-md md:shadow-lg h-[400px] sm:h-[480px] md:h-[560px] lg:h-[620px] group">
        {/* Image Slides */}
        <div className="relative w-full h-full">
          {banners.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                quality={90}
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
              {/* Gradient Overlay for better text readability */}
              <div className={`absolute inset-0 ${
                banner.textColor === 'light' 
                  ? 'bg-gradient-to-r from-black/60 via-black/30 to-transparent'
                  : 'bg-gradient-to-r from-white/60 via-white/30 to-transparent'
              }`} />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16">
          <div className={`flex flex-col ${getTextAlignmentClass()} max-w-7xl mx-auto w-full space-y-3 sm:space-y-4 md:space-y-6`}>
            {/* Badge - Lazada Style */}
            {banner.badge && (
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-bold shadow-lg animate-pulse ${
                banner.textColor === 'light'
                  ? 'bg-red-500 text-white'
                  : 'bg-red-500 text-white'
              }`}>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {banner.badge}
              </div>
            )}

            {/* Title */}
            <h2 className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight ${getTextColorClass()} drop-shadow-2xl max-w-2xl`}>
              {banner.title}
            </h2>

            {/* Subtitle */}
            <p className={`text-sm sm:text-base md:text-xl lg:text-2xl font-medium ${
              banner.textColor === 'light' ? 'text-white/90' : 'text-gray-700'
            } drop-shadow-md max-w-xl`}>
              {banner.subtitle}
            </p>

            {/* CTA Button - Lazada Style */}
            <div className="pt-2 sm:pt-3">
              <Link
                href={banner.cta.href}
                className={`inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-3.5 rounded-lg font-bold text-sm sm:text-base md:text-lg transition-all duration-200 hover:scale-105 hover:shadow-2xl active:scale-95 uppercase tracking-wide ${
                  banner.textColor === 'light'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700'
                } shadow-xl`}
              >
                {banner.cta.text}
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'bg-white w-8 sm:w-10 h-2 sm:h-2.5 shadow-lg'
                  : 'bg-white/60 hover:bg-white/80 w-2 sm:w-2.5 h-2 sm:h-2.5'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md bg-black/50 backdrop-blur-sm text-white text-xs font-semibold">
          {currentSlide + 1}/{banners.length}
        </div>
      </div>
    </div>
  )
}
