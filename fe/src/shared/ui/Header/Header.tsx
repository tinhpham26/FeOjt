'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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
  price?: number
}

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
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
  { id: '1', type: 'product', text: 'Cà chua bi', category: 'Rau củ quả', image: '/products/tomato.jpg', price: 25000 },
  { id: '2', type: 'product', text: 'Thịt ba chỉ heo', category: 'Thịt, cá', image: '/products/pork.jpg', price: 89000 },
  { id: '3', type: 'category', text: 'Trái cây tươi' },
  { id: '4', type: 'keyword', text: 'khuyến mãi cuối tuần' },
  { id: '5', type: 'product', text: 'Sữa tươi Vinamilk', category: 'Đồ uống', image: '/products/milk.jpg', price: 32000 }
]

const TRENDING_SEARCHES = [
  '🔥 Rau củ tươi', '🔥 Thịt heo', '🎁 Khuyến mãi', '🥗 Trái cây', '🍖 Thịt bò'
]

const MOCK_CART_ITEMS: CartItem[] = [
  { id: '1', name: 'Cà chua bi', image: '/products/tomato.jpg', price: 25000, quantity: 2 },
  { id: '2', name: 'Thịt ba chỉ heo', image: '/products/pork.jpg', price: 89000, quantity: 1 },
  { id: '3', name: 'Sữa tươi Vinamilk', image: '/products/milk.jpg', price: 32000, quantity: 3 }
]

export function Header() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()
  
  // State management
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showCartPreview, setShowCartPreview] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_CART_ITEMS)
  const [recentSearches, setRecentSearches] = useState<string[]>(['Rau củ', 'Thịt heo', 'Trái cây'])
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  
  // Refs
  const searchRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const cartRef = useRef<HTMLDivElement>(null)
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null)

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
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCartPreview(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Search handler with debounce
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current)
    }

    if (!query.trim()) {
      setSuggestions([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    
    searchDebounceRef.current = setTimeout(() => {
      const filtered = MOCK_SUGGESTIONS.filter(item =>
        item.text.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered)
      setIsSearching(false)
    }, 300)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setRecentSearches(prev => {
        const updated = [searchQuery, ...prev.filter(s => s !== searchQuery)]
        return updated.slice(0, 5)
      })
      router.push(`/customer/search?q=${encodeURIComponent(searchQuery)}`)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchQuery(suggestion.text)
    setShowSuggestions(false)
    if (suggestion.type === 'product') {
      router.push(`/customer/products/${suggestion.id}`)
    } else if (suggestion.type === 'category') {
      router.push(`/customer/category/${suggestion.id}`)
    } else {
      router.push(`/customer/search?q=${encodeURIComponent(suggestion.text)}`)
    }
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    router.push('/login')
  }

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
  }

  const removeRecentSearch = (search: string) => {
    setRecentSearches(prev => prev.filter(s => s !== search))
  }

  // Calculated values
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  // Filter menu items by role
  const visibleMenuItems = MENU_ITEMS.filter(item => 
    user ? item.roles.includes(user.role) : item.roles.includes('CUSTOMER')
  )

  // Fix hydration mismatch
  useEffect(() => {
    if (isAuthenticated && !user) {
      logout()
    }
  }, [isAuthenticated, user, logout])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'shadow-xl' 
        : 'shadow-lg'
    }`}>
      {/* Main header - Red background */}
      <div className="bg-red-600">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 md:gap-6">
            {/* Logo */}
            <Link href="/customer" className="flex-shrink-0 group">
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden bg-white group-hover:scale-105 transition-all duration-300">
                  <Image
                    src="/logo.jpg"
                    alt="Bách Hóa XANH"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="hidden sm:block">
                  <div className="font-bold text-white text-xl md:text-2xl leading-tight tracking-tight">Bách Hóa</div>
                  <div className="font-bold text-white text-xl md:text-2xl leading-tight tracking-tight">XANH</div>
                </div>
              </div>
            </Link>

            {/* Search bar */}
            <div ref={searchRef} className="flex-1 relative max-w-3xl">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm sản phẩm, danh mục..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full pl-4 pr-12 py-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 text-gray-700"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-red-600 transition-colors"
                    aria-label="Tìm kiếm"
                  >
                    {isSearching ? (
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </form>

              {/* Search suggestions dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Recent searches */}
                  {searchQuery === '' && recentSearches.length > 0 && (
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tìm kiếm gần đây</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSearchQuery(search)
                              handleSearch(search)
                            }}
                            className="group flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-emerald-50 rounded-full text-sm transition-all duration-200"
                          >
                            <svg className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700 group-hover:text-emerald-700">{search}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                removeRecentSearch(search)
                              }}
                              className="ml-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trending searches */}
                  {searchQuery === '' && (
                    <div className="p-4 border-b border-gray-100">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Xu hướng tìm kiếm</span>
                      <div className="flex flex-wrap gap-2">
                        {TRENDING_SEARCHES.map((trend, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              const cleanTrend = trend.replace(/[🔥🎁🥗🍖]/g, '').trim()
                              setSearchQuery(cleanTrend)
                              handleSearch(cleanTrend)
                            }}
                            className="px-3 py-1.5 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 rounded-full text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 border border-orange-200/50"
                          >
                            {trend}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search suggestions */}
                  {suggestions.length > 0 && (
                    <div className="max-h-96 overflow-y-auto">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion.id}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-0"
                        >
                          {suggestion.type === 'product' && suggestion.image && (
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                              <Image
                                src={suggestion.image}
                                alt={suggestion.text}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                              {suggestion.type === 'category' && (
                                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                              )}
                              {suggestion.type === 'keyword' && (
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                              )}
                              <span className="font-medium text-gray-900">{suggestion.text}</span>
                            </div>
                            {suggestion.category && (
                              <div className="text-xs text-gray-500 mt-0.5">{suggestion.category}</div>
                            )}
                          </div>
                          {suggestion.price && (
                            <div className="font-semibold text-emerald-600 text-sm">
                              {formatPrice(suggestion.price)}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* No results */}
                  {searchQuery !== '' && suggestions.length === 0 && !isSearching && (
                    <div className="p-8 text-center">
                      <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p className="text-gray-500 font-medium">Không tìm thấy kết quả</p>
                      <p className="text-sm text-gray-400 mt-1">Thử tìm kiếm với từ khóa khác</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right section - WinMart style */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Giao Hàng button */}
              <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">Giao Hàng</span>
              </button>

              {/* Cart - Giỏ hàng */}
              <div ref={cartRef} className="relative">
                <button
                  onClick={() => setShowCartPreview(!showCartPreview)}
                  className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Giỏ hàng"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="hidden md:inline text-white font-medium text-sm">Giỏ hàng ({cartCount})</span>
                  {cartCount > 0 && (
                    <span className="md:hidden absolute -top-1 -right-1 min-w-[20px] h-5 bg-yellow-400 text-red-600 text-xs rounded-full flex items-center justify-center font-bold px-1.5">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Cart preview dropdown */}
                {showCartPreview && (
                  <div className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-pink-50">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">Giỏ hàng của bạn</h3>
                        <span className="px-2.5 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                          {cartCount} sản phẩm
                        </span>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {cartItems.length > 0 ? (
                        <>
                          {cartItems.map((item) => (
                            <div key={item.id} className="p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</p>
                                  <div className="flex items-center justify-between mt-1">
                                    <span className="text-sm text-gray-600">SL: {item.quantity}</span>
                                    <span className="font-semibold text-emerald-600 text-sm">{formatPrice(item.price)}</span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                  aria-label="Xóa"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                          <div className="p-4 bg-gray-50 border-t border-gray-200">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-semibold text-gray-700">Tổng cộng:</span>
                              <span className="font-bold text-red-600 text-lg">{formatPrice(cartTotal)}</span>
                            </div>
                            <Link
                              href="/customer/cart"
                              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98"
                            >
                              <span>Xem giỏ hàng</span>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Link>
                          </div>
                        </>
                      ) : (
                        <div className="p-8 text-center">
                          <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <p className="text-gray-500 font-medium">Giỏ hàng trống</p>
                          <Link
                            href="/customer"
                            className="inline-block mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            Tiếp tục mua sắm
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User menu - Hội viên */}
              {user && isAuthenticated ? (
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="hidden md:inline text-white font-medium text-sm">Hội viên</span>
                  </button>

                  {/* User dropdown menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-pink-50">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {user.email.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{user.email}</p>
                            <p className="text-xs text-gray-600 mt-0.5">
                              {user.role === 'ADMIN' ? 'Quản trị viên' :
                               user.role === 'STORE_MANAGER' ? 'Quản lý cửa hàng' :
                               user.role === 'WAREHOUSE_MANAGER' ? 'Quản lý kho' :
                               user.role === 'STAFF' ? 'Nhân viên' : 'Khách hàng'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/customer/profile"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700 hover:text-red-600"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="font-medium">Tài khoản của tôi</span>
                        </Link>
                        <Link
                          href="/customer/orders"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700 hover:text-red-600"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          <span className="font-medium">Đơn hàng của tôi</span>
                        </Link>
                        <Link
                          href="/customer/loyalty"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700 hover:text-red-600"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">Điểm tích lũy</span>
                        </Link>
                      </div>
                      <div className="border-t border-gray-100 py-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600 font-medium"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="hidden md:inline text-white font-medium text-sm">Hội viên</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 py-2.5">
            {/* Danh mục sản phẩm button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="text-sm">Danh mục sản phẩm</span>
            </button>

            {/* Tư vấn mua hàng */}
            <Link 
              href="/customer/support"
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-sm">Tư vấn mua hàng</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile category menu dropdown */}
      {isMobileMenuOpen && (
        <div className="bg-white border-b border-gray-200 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {visibleMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-full bg-red-100 group-hover:bg-red-200 flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-red-600 text-center">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full uppercase">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
