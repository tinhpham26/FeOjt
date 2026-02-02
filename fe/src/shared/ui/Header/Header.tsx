'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/shared/hooks/useAuth'
import type { UserRole } from '@/shared/types'

interface SearchSuggestion {
  id: string
  type: 'product' | 'category' | 'keyword'
  text: string
  image?: string
  category?: string
}

interface LocationOption {
  id: string
  city: string
  district: string
  storeCount: number
}

interface MenuItem {
  label: string
  href: string
  icon?: React.ReactNode
  badge?: string
  roles: UserRole[]
}

const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Trang chủ',
    href: '/customer',
    roles: ['CUSTOMER', 'STAFF', 'STORE_MANAGER', 'WAREHOUSE_MANAGER', 'ADMIN']
  },
  {
    label: 'Khuyến mãi',
    href: '/customer/promotions',
    badge: 'HOT',
    roles: ['CUSTOMER']
  },
  {
    label: 'Sản phẩm',
    href: '/admin/catalog/products',
    roles: ['ADMIN', 'STORE_MANAGER']
  },
  {
    label: 'Đơn hàng',
    href: '/customer/orders',
    roles: ['CUSTOMER', 'STAFF', 'STORE_MANAGER', 'ADMIN']
  },
  {
    label: 'Kho hàng',
    href: '/ops/inventory',
    roles: ['STAFF', 'WAREHOUSE_MANAGER', 'ADMIN']
  },
  {
    label: 'Giao hàng',
    href: '/ops/delivery',
    roles: ['STAFF', 'WAREHOUSE_MANAGER', 'ADMIN']
  },
  {
    label: 'Loyalty',
    href: '/customer/loyalty',
    roles: ['CUSTOMER', 'ADMIN']
  },
  {
    label: 'Báo cáo',
    href: '/admin/reports',
    roles: ['STORE_MANAGER', 'ADMIN']
  },
  {
    label: 'Quản lý',
    href: '/admin/dashboard',
    roles: ['ADMIN']
  }
]

const MOCK_SUGGESTIONS: SearchSuggestion[] = [
  { id: '1', type: 'product', text: 'Cà chua bi', category: 'Rau củ quả', image: '/products/tomato.jpg' },
  { id: '2', type: 'product', text: 'Thịt ba chỉ heo', category: 'Thịt, cá', image: '/products/pork.jpg' },
  { id: '3', type: 'category', text: 'Trái cây tươi' },
  { id: '4', type: 'keyword', text: 'khuyến mãi cuối tuần' },
  { id: '5', type: 'product', text: 'Sữa tươi Vinamilk', category: 'Đồ uống', image: '/products/milk.jpg' }
]

const MOCK_LOCATIONS: LocationOption[] = [
  { id: '1', city: 'TP. Hồ Chí Minh', district: 'Quận 1', storeCount: 12 },
  { id: '2', city: 'TP. Hồ Chí Minh', district: 'Quận 3', storeCount: 8 },
  { id: '3', city: 'TP. Hồ Chí Minh', district: 'Quận 7', storeCount: 15 },
  { id: '4', city: 'Hà Nội', district: 'Ba Đình', storeCount: 10 },
  { id: '5', city: 'Hà Nội', district: 'Cầu Giấy', storeCount: 14 }
]

export function Header() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()
  
  // State management
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showLocationMenu, setShowLocationMenu] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(MOCK_LOCATIONS[0])
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [cartCount, setCartCount] = useState(3)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Refs
  const searchRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationMenu(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Search handler
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 0) {
      // Mock search - trong thực tế sẽ gọi API
      const filtered = MOCK_SUGGESTIONS.filter(s => 
        s.text.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/customer/search?q=${encodeURIComponent(searchQuery)}`)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'product') {
      router.push(`/customer/products/${suggestion.id}`)
    } else if (suggestion.type === 'category') {
      router.push(`/customer/category/${suggestion.id}`)
    } else {
      setSearchQuery(suggestion.text)
      handleSearchSubmit({ preventDefault: () => {} } as React.FormEvent)
    }
    setShowSuggestions(false)
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  // Filter menu items by role
  const visibleMenuItems = MENU_ITEMS.filter(item => 
    user ? item.roles.includes(user.role) : item.roles.includes('CUSTOMER')
  )

  // Fix hydration mismatch: Force logout if state inconsistent
  useEffect(() => {
    if (isAuthenticated && !user) {
      logout()
    }
  }, [isAuthenticated, user, logout])

  return (
    <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : 'shadow-md'
    }`}>
      {/* Top bar - Announcements */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="hidden md:inline">📢 Miễn phí giao hàng cho đơn từ 150.000đ</span>
              <span className="md:hidden">🚚 Free ship 150K+</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/customer/download-app" className="hover:underline hidden sm:inline">
                📱 Tải App
              </Link>
              <span className="hidden md:inline">🔥 Flash Sale 12h - 20h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center gap-3 md:gap-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Logo */}
            <Link href="/customer" className="flex-shrink-0 group">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden border-2 border-emerald-500 group-hover:border-emerald-600 transition-colors shadow-sm">
                  <Image
                    src="/logo.jpg"
                    alt="Bách Hóa XANH"
                    width={48}
                    height={48}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
                <div className="hidden sm:block">
                  <div className="font-bold text-gray-900 text-base md:text-lg leading-tight">Bách Hóa</div>
                  <div className="font-bold text-emerald-600 text-base md:text-lg leading-tight">XANH</div>
                </div>
              </div>
            </Link>

            {/* Location selector - Desktop */}
            <div ref={locationRef} className="relative hidden lg:block">
              <button
                onClick={() => setShowLocationMenu(!showLocationMenu)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
              >
                <svg className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-500">Giao hàng đến</div>
                  <div className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                    {selectedLocation.district}
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Location dropdown */}
              {showLocationMenu && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Chọn địa điểm giao hàng</h3>
                    <input
                      type="text"
                      placeholder="Tìm quận, huyện..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="p-2">
                    {MOCK_LOCATIONS.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => {
                          setSelectedLocation(loc)
                          setShowLocationMenu(false)
                        }}
                        className={`w-full text-left px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors ${
                          selectedLocation.id === loc.id ? 'bg-emerald-50 border border-emerald-200' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{loc.district}</div>
                            <div className="text-sm text-gray-500">{loc.city}</div>
                          </div>
                          <div className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                            {loc.storeCount} cửa hàng
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search bar - Smart search with suggestions */}
            <div ref={searchRef} className="flex-1 relative max-w-2xl">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm sản phẩm, danh mục..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => searchQuery && setShowSuggestions(true)}
                    className="w-full pl-4 pr-12 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm md:text-base"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                    aria-label="Tìm kiếm"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Search suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                  <div className="p-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        {suggestion.type === 'product' && suggestion.image && (
                          <div className="w-10 h-10 rounded bg-gray-100 flex-shrink-0 overflow-hidden">
                            <Image 
                              src={suggestion.image} 
                              alt={suggestion.text}
                              width={40}
                              height={40}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">{suggestion.text}</div>
                          {suggestion.category && (
                            <div className="text-xs text-gray-500 mt-0.5">{suggestion.category}</div>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          {suggestion.type === 'product' && (
                            <span className="text-xs text-gray-400">Sản phẩm</span>
                          )}
                          {suggestion.type === 'category' && (
                            <span className="text-xs text-emerald-600">Danh mục</span>
                          )}
                          {suggestion.type === 'keyword' && (
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 p-3 bg-gray-50">
                    <div className="text-xs text-gray-500 flex items-center justify-between">
                      <span>💡 Gợi ý: Thử tìm &quot;rau củ tươi&quot; hoặc &quot;khuyến mãi&quot;</span>
                      <button 
                        onClick={() => setShowSuggestions(false)}
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right section - Account & Cart */}
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              {/* Account / User menu */}
              {user && isAuthenticated ? (
                <div className="flex items-center gap-2 md:gap-3">
                  {/* User Menu Dropdown */}
                  <div ref={userMenuRef} className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors group"
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold border-2 border-white shadow-md">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="hidden md:block text-left">
                        <div className="text-xs text-gray-500">Xin chào</div>
                        <div className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                          {user.name}
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </button>

                  {/* User dropdown menu */}
                  {showUserMenu && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                      <div className="p-4 border-b border-gray-200 bg-gradient-to-br from-emerald-50 to-white">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                            <div className="text-xs text-emerald-600 font-medium mt-0.5 capitalize">
                              {user.role.replace('_', ' ')}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        {user.role === 'CUSTOMER' && (
                          <>
                            <Link
                              href="/customer/profile"
                              className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors text-gray-700"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span className="text-sm font-medium">Thông tin tài khoản</span>
                            </Link>
                            <Link
                              href="/customer/orders"
                              className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors text-gray-700"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                              <span className="text-sm font-medium">Đơn hàng của tôi</span>
                            </Link>
                            <Link
                              href="/customer/loyalty"
                              className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors text-gray-700"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm font-medium">Điểm tích lũy</span>
                            </Link>
                          </>
                        )}
                        
                        {(user.role === 'ADMIN' || user.role === 'STORE_MANAGER') && (
                          <>
                            <Link
                              href="/admin/dashboard"
                              className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors text-gray-700"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                              <span className="text-sm font-medium">Dashboard</span>
                            </Link>
                            <Link
                              href="/admin/reports"
                              className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors text-gray-700"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span className="text-sm font-medium">Báo cáo</span>
                            </Link>
                          </>
                        )}

                        <div className="border-t border-gray-200 my-2"></div>
                        
                        <button
                          onClick={() => {
                            handleLogout()
                            setShowUserMenu(false)
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span className="text-sm font-semibold">Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  )}
                  </div>

                  {/* Prominent Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white text-red-600 border-2 border-red-200 rounded-lg font-semibold text-sm shadow-sm hover:bg-red-50 hover:border-red-300 hover:shadow-md transition-all duration-200 group"
                    title="Đăng xuất"
                  >
                    <svg 
                      className="w-5 h-5 group-hover:scale-110 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                      />
                    </svg>
                    <span className="hidden sm:inline">Đăng xuất</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-3 md:px-4 py-2 md:py-2.5 transition-all font-medium shadow-sm hover:shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span className="text-sm font-semibold">Đăng nhập</span>
                </Link>
              )}

              {/* Cart */}
              <Link
                href="/customer/cart"
                className="relative flex-shrink-0 group"
              >
                <div className="w-10 h-10 md:w-11 md:h-11 bg-emerald-50 rounded-full flex items-center justify-center hover:bg-emerald-100 transition-colors border-2 border-emerald-100 group-hover:border-emerald-200">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold px-1.5 shadow-md animate-pulse">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation menu - Desktop */}
      <div className="hidden lg:block border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1">
            {visibleMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-3 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-t-lg transition-colors group"
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                  {item.badge && (
                    <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded uppercase">
                      {item.badge}
                    </span>
                  )}
                </span>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-2">
            {/* Location selector mobile */}
            <div className="mb-3 pb-3 border-b border-gray-200">
              <button
                onClick={() => setShowLocationMenu(!showLocationMenu)}
                className="w-full flex items-center justify-between px-3 py-2.5 border border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Giao đến</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedLocation.district}</div>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Menu items */}
            <div className="space-y-1">
              {visibleMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Login button for mobile when not authenticated */}
            {!isAuthenticated && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Đăng nhập
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
