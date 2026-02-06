'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MEGA_MENU_CATEGORIES } from '@/data/mega-menu'

export function MegaMenu() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMouseEnter = (categoryId: string) => {
    setActiveCategory(categoryId)
    setIsMenuOpen(true)
  }

  const handleMouseLeave = () => {
    setIsMenuOpen(false)
    setActiveCategory(null)
  }

  const activeCategoryData = MEGA_MENU_CATEGORIES.find(cat => cat.id === activeCategory)

  return (
    <div 
      className="relative"
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Menu Button */}
      <button
        onMouseEnter={() => setIsMenuOpen(true)}
        className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-semibold text-[13px] transition-colors py-2.5"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="text-[13px]">Danh mục sản phẩm</span>
      </button>

      {/* Mega Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 mt-0 flex bg-white border border-gray-200 shadow-2xl z-50 rounded-b-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Left Side - Categories List */}
          <div className="w-[280px] bg-white border-r border-gray-100">
            <div className="py-1">
              {MEGA_MENU_CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  className={`flex items-center justify-between px-4 py-3 transition-all ${
                    category.id === 'gia-sieu-re'
                      ? 'bg-green-600 hover:bg-green-700 text-white font-bold'
                      : activeCategory === category.id
                      ? 'bg-gray-50 text-green-600 border-r-2 border-green-600 font-semibold'
                      : 'hover:bg-gray-50 text-gray-800 font-medium'
                  }`}
                >
                  <span className="text-[13px]">{category.name}</span>
                  {category.id !== 'gia-sieu-re' && category.subCategories.length > 0 && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - Subcategories & Product Image */}
          {activeCategoryData && activeCategoryData.subCategories.length > 0 && (
            <div className="w-[600px] bg-white p-6 flex gap-6">
              {/* Subcategories List */}
              <div className="flex-1">
                <h3 
                  className="font-extrabold text-gray-900 mb-4 text-[15px] pb-2 border-b-2"
                  style={{ borderColor: activeCategoryData.color }}
                >
                  {activeCategoryData.name}
                </h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {activeCategoryData.subCategories.map((subCat) => (
                    <Link
                      key={subCat.id}
                      href={`/category/${subCat.slug}`}
                      className="text-[13px] font-medium text-gray-700 hover:text-green-600 hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group"
                    >
                      <svg 
                        className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" 
                        style={{ color: activeCategoryData.color }}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{subCat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Product Representative Image */}
              <div className="w-[180px] flex-shrink-0">
                <div 
                  className="relative w-full h-[180px] rounded-xl overflow-hidden shadow-sm flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${activeCategoryData.color}10`,
                    border: `1px solid ${activeCategoryData.color}20`
                  }}
                >
                  {/* Placeholder for product image */}
                  <div className="text-center p-4">
                    <div 
                      className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2"
                      style={{ backgroundColor: `${activeCategoryData.color}20` }}
                    >
                      <svg 
                        className="w-8 h-8" 
                        style={{ color: activeCategoryData.color }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-[11px] text-gray-500 font-semibold leading-tight">
                      {activeCategoryData.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
