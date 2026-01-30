'use client'

import { useState } from 'react'
import { CustomerHeader } from '@/features/catalog/components/CustomerHeader'
import { HeroBanner } from '@/features/promotions/components/HeroBanner'
import { QuickCategories } from '@/features/catalog/components/QuickCategories'
import { BenefitCards } from '@/features/catalog/components/BenefitCards'
import { ShortcutGrid } from '@/features/catalog/components/ShortcutGrid'
import { FlashSaleStrip } from '@/features/promotions/components/FlashSaleStrip'
import { ProductBlock } from '@/features/catalog/components/ProductBlock'

export default function Home() {
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <CustomerHeader />

      {/* Category Drawer Overlay */}
      {isCategoryDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsCategoryDrawerOpen(false)}
        />
      )}

      {/* Category Drawer */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        isCategoryDrawerOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>🛒</span>
              <span>Danh mục sản phẩm</span>
            </h2>
            <button 
              onClick={() => setIsCategoryDrawerOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <QuickCategories onItemClick={() => setIsCategoryDrawerOpen(false)} />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 py-6 space-y-6">
        {/* Row 1: Hero Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Center: Hero Banner */}
          <div className="col-span-1 lg:col-span-9">
            <HeroBanner />
          </div>

          {/* Right: Benefit Cards - Stack on mobile, sidebar on desktop */}
          <div className="col-span-1 lg:col-span-3">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:space-y-0">
              <BenefitCards />
            </div>
          </div>
        </div>

        {/* Row 2: Quick Shortcuts */}
        <ShortcutGrid onCategoryClick={() => setIsCategoryDrawerOpen(true)} />

        {/* Row 3: Flash Sale */}
        <FlashSaleStrip />

        {/* Row 4+: Product Blocks */}
        <ProductBlock title="Sản phẩm nổi bật" />
        <ProductBlock title="Rau củ tươi mới mỗi ngày" />
        <ProductBlock title="Trái cây nhập khẩu" />
        <ProductBlock title="Thực phẩm tiện lợi" />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Về chúng tôi</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Giới thiệu</a></li>
                <li><a href="#" className="hover:text-white">Liên hệ</a></li>
                <li><a href="#" className="hover:text-white">Tuyển dụng</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Chính sách</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Chính sách đổi trả</a></li>
                <li><a href="#" className="hover:text-white">Chính sách bảo mật</a></li>
                <li><a href="#" className="hover:text-white">Điều khoản sử dụng</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Câu hỏi thường gặp</a></li>
                <li><a href="#" className="hover:text-white">Hướng dẫn mua hàng</a></li>
                <li><a href="#" className="hover:text-white">Tra cứu đơn hàng</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Hotline: 1900-xxxx</li>
                <li>Email: support@bachhoa.vn</li>
                <li>Giờ làm việc: 8:00 - 22:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 Bách Hóa Xanh. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
