'use client'

import { useState } from 'react'
import { useAuth } from '@/shared/hooks/useAuth'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function MainHeader() {
  const [searchQuery, setSearchQuery] = useState('')
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  return (
    <div className="border-b border-green-700/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image 
                src="/logocty.png" 
                alt="Bách Hóa Xanh Logo" 
                width={48}
                height={48}
                className="object-contain rounded-lg"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col leading-tight -space-y-1">
              <span 
                className="text-3xl lg:text-4xl font-extrabold text-white"
                style={{ 
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.15)',
                  letterSpacing: '0.5px'
                }}
              >
                Bách Hóa Xanh
              </span>
              <span 
                className="text-xs lg:text-sm text-white/90 font-light tracking-wide pl-0.5"
                style={{ 
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  textShadow: '0 1px 2px rgba(0,0,0,0.15)'
                }}
              >
                An tâm mua sắm mỗi ngày
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl min-w-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Bạn tìm gì hôm nay..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-white/20 bg-white/95 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder:text-gray-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-green-600 text-white rounded-md hover:bg-green-700">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-9 flex-shrink-0">
            {/* Location */}
            <button className="hidden md:flex items-center gap-2 text-white hover:text-green-200 mr-2.5">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="text-left">
              <div className="text-xs text-green-100">Giao hàng đến</div>
              <div className="text-sm font-medium text-white">Quận 1</div>
              </div>
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-white hover:text-green-200 mr-2.5">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">0</span>
            </Link>

            {/* Auth action */}
            {isAuthenticated && user ? (
              <>
                <Link
                  href={user.role === 'ADMIN' ? '/admin/dashboard' : '/customer/profile'}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-white rounded-lg hover:bg-green-50 shadow-sm hover:shadow-md border border-white"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{user.role === 'CUSTOMER' ? 'Khách hàng' : user.name}</span>
                </Link>
                {user.role === 'ADMIN' && (
                  <button
                    onClick={() => {
                      logout()
                      router.push('/')
                    }}
                    className="px-4 py-2 text-sm font-medium text-green-700 bg-white rounded-lg hover:bg-green-50 border border-white"
                  >
                    Đăng xuất
                  </button>
                )}
              </>
            ) : (
              <Link href="/login" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-white rounded-lg hover:bg-green-50 shadow-sm hover:shadow-md border border-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Đăng nhập</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
