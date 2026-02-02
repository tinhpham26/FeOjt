import { CustomerHeader } from '@/features/catalog/components/CustomerHeader'
import { HeroBanner } from '@/features/promotions/components/HeroBanner'
import { CategoryGrid } from '@/features/catalog/components/CategoryGrid'
import { PromoBlocks } from '@/features/catalog/components/PromoBlocks'
import { ProductBlock } from '@/features/catalog/components/ProductBlock'
import Link from 'next/link'

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <CustomerHeader />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Category Grid */}
        <CategoryGrid />

        {/* Promo Blocks */}
        <PromoBlocks />

        {/* Product Section */}
        <ProductBlock title="Rau củ tươi mỗi ngày" />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Về chúng tôi</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-gray-600 hover:text-primary-600">Giới thiệu</Link></li>
                <li><Link href="/stores" className="text-sm text-gray-600 hover:text-primary-600">Hệ thống cửa hàng</Link></li>
                <li><Link href="/careers" className="text-sm text-gray-600 hover:text-primary-600">Tuyển dụng</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Hỗ trợ khách hàng</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-sm text-gray-600 hover:text-primary-600">Trung tâm trợ giúp</Link></li>
                <li><Link href="/shipping" className="text-sm text-gray-600 hover:text-primary-600">Chính sách giao hàng</Link></li>
                <li><Link href="/returns" className="text-sm text-gray-600 hover:text-primary-600">Đổi trả hàng</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Chính sách</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-primary-600">Bảo mật thông tin</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-600 hover:text-primary-600">Điều khoản sử dụng</Link></li>
                <li><Link href="/payment" className="text-sm text-gray-600 hover:text-primary-600">Thanh toán</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>📞 Hotline: 1900 xxxx</li>
                <li>📧 Email: support@bhx.vn</li>
                <li>⏰ 8:00 - 21:00 hàng ngày</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>© 2024 Bách Hóa Xanh. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
