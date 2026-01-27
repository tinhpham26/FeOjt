'use client'

import { useState } from 'react'
import Link from 'next/link'

export function MainHeader() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="bg-white border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex items-center justify-around">
          {/* Logo */}
          <Link href="/customer" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🌿</span>
              </div>
              <div className="hidden md:block">
                <div className="font-bold text-gray-900 text-lg leading-tight">Bách Hóa</div>
                <div className="font-bold text-emerald-600 text-lg leading-tight">XANH</div>
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Section - Location, Account, Cart */}
          <div className="flex items-center gap-4">
            {/* Location */}
            <button className="hidden lg:flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex-shrink-0">
              <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-500">Giao đến</div>
                <div className="text-sm font-medium text-gray-900">Quận 1, HCM</div>
              </div>
            </button>

            {/* Account - Login Link */}
            <Link href="/login" className="hidden md:flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-500">Tài khoản</div>
                <div className="text-sm font-medium text-gray-900">Đăng nhập</div>
              </div>
            </Link>

            {/* Cart */}
            <Link href="/customer/cart" className="relative flex-shrink-0">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center hover:bg-emerald-100 transition-colors">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  3
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
