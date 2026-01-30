'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface CategoryDropdownProps {
  compact?: boolean
}

const categories = [
  { id: 1, name: 'Rau củ tươi', icon: '🥬', href: '/category/vegetables' },
  { id: 2, name: 'Trái cây', icon: '🍎', href: '/category/fruits' },
  { id: 3, name: 'Thịt tươi', icon: '🍖', href: '/category/meat' },
  { id: 4, name: 'Hải sản', icon: '🐟', href: '/category/seafood' },
  { id: 5, name: 'Sữa & trứng', icon: '🥚', href: '/category/dairy' },
  { id: 6, name: 'Thực phẩm khô', icon: '🍘', href: '/category/dry-food' },
  { id: 7, name: 'Đồ uống', icon: '🧃', href: '/category/beverages' },
  { id: 8, name: 'Bánh kẹo', icon: '🍬', href: '/category/snacks' },
  { id: 9, name: 'Đồ gia dụng', icon: '🧼', href: '/category/household' },
  { id: 10, name: 'Chăm sóc cá nhân', icon: '🧴', href: '/category/personal-care' },
]

export function CategoryDropdown({ compact = false }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Đóng menu khi nhấn ESC
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button Danh mục */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 transition-colors font-medium whitespace-nowrap ${
          compact
            ? 'text-sm text-gray-700 hover:text-primary-600'
            : 'px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700'
        }`}
      >
        {/* Icon Menu 3 gạch */}
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M4 6h16M4 12h16M4 18h16" 
          />
        </svg>
        <span>Danh mục</span>
        {/* Icon mũi tên */}
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 transition-all duration-200 ease-out origin-top ${
          isOpen
            ? 'opacity-100 scale-100 visible'
            : 'opacity-0 scale-95 invisible'
        }`}
      >
        {/* Header Menu */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3">
          <h3 className="text-white font-bold text-base flex items-center gap-2">
            <span>🛒</span>
            <span>Danh mục sản phẩm</span>
          </h3>
        </div>

        {/* List Danh mục */}
        <div className="max-h-[400px] overflow-y-auto py-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-primary-50 hover:to-teal-50 transition-all group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {category.icon}
              </span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                {category.name}
              </span>
              {/* Icon arrow right */}
              <svg 
                className="w-4 h-4 ml-auto text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </Link>
          ))}
        </div>

        {/* Footer Menu (optional) */}
        <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
          <Link 
            href="/categories"
            onClick={() => setIsOpen(false)}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center gap-1"
          >
            <span>Xem tất cả danh mục</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Overlay backdrop (optional - cho mobile) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
