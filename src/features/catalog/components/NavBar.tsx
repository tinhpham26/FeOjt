'use client'

import { useState } from 'react'
import Link from 'next/link'

const categories = [
  {
    id: 1,
    name: 'Rau củ quả',
    icon: '🥬',
    subcategories: ['Rau lá', 'Củ quả', 'Nấm các loại', 'Trái cây tươi']
  },
  {
    id: 2,
    name: 'Thịt, cá, trứng',
    icon: '🥩',
    subcategories: ['Thịt heo', 'Thịt bò', 'Cá biển', 'Hải sản', 'Trứng']
  },
  {
    id: 3,
    name: 'Thực phẩm khô',
    icon: '🍚',
    subcategories: ['Gạo', 'Mì, miến', 'Gia vị', 'Dầu ăn']
  },
  {
    id: 4,
    name: 'Đồ uống',
    icon: '🥤',
    subcategories: ['Nước ngọt', 'Nước ép', 'Sữa', 'Bia rượu']
  },
  {
    id: 5,
    name: 'Bánh kẹo',
    icon: '🍪',
    subcategories: ['Bánh quy', 'Kẹo', 'Chocolate', 'Snack']
  },
  {
    id: 6,
    name: 'Chăm sóc cá nhân',
    icon: '🧴',
    subcategories: ['Dầu gội', 'Sữa tắm', 'Kem đánh răng', 'Mỹ phẩm']
  },
]

const quickLinks = [
  { name: 'Khuyến mãi', href: '/customer/promotions' },
  { name: 'Siêu sale', href: '/customer/flash-sale' },
  { name: 'Hàng mới về', href: '/customer/new-arrivals' },
  { name: 'Sản phẩm bán chạy', href: '/customer/best-sellers' },
]

export function NavBar() {
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const [activeCategory, setActiveCategory] = useState(categories[0])

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white border-b-2 border-gray-300 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-6 h-14">
          {/* Category Button */}
          <div className="relative">
            <button
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Danh mục</span>
            </button>

            {/* Mega Menu */}
            {showMegaMenu && (
              <div
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
                className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-xl z-50 w-[800px]"
              >
                <div className="grid grid-cols-12 min-h-[400px]">
                  {/* Main Categories */}
                  <div className="col-span-4 border-r bg-gray-50 p-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(cat)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeCategory.id === cat.id
                            ? 'bg-white text-emerald-600 font-medium shadow-sm'
                            : 'hover:bg-white text-gray-700'
                        }`}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span>{cat.name}</span>
                        <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                  </div>

                  {/* Subcategories */}
                  <div className="col-span-5 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">{activeCategory.name}</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {activeCategory.subcategories.map((sub, idx) => (
                        <Link
                          key={idx}
                          href={`/customer/category/${activeCategory.id}/${idx}`}
                          className="text-gray-600 hover:text-emerald-600 hover:underline py-1"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Promo Banner */}
                  <div className="col-span-3 p-4 bg-gradient-to-br from-emerald-50 to-blue-50">
                    <div className="bg-white rounded-lg p-4 h-full flex flex-col items-center justify-center text-center">
                      <div className="text-4xl mb-2">🎁</div>
                      <p className="font-bold text-gray-900 mb-1">Ưu đãi đặc biệt</p>
                      <p className="text-xs text-gray-600 mb-3">Giảm đến 50%</p>
                      <button className="text-xs bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700">
                        Xem ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
