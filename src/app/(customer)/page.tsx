import { CustomerHeader } from '@/features/catalog/components/CustomerHeader'
import { HeroBanner } from '@/features/promotions/components/HeroBanner'
import { QuickCategories } from '@/features/catalog/components/QuickCategories'
import { BenefitCards } from '@/features/catalog/components/BenefitCards'
import { ShortcutGrid } from '@/features/catalog/components/ShortcutGrid'
import { FlashSaleStrip } from '@/features/promotions/components/FlashSaleStrip'
import { ProductBlock } from '@/features/catalog/components/ProductBlock'

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <CustomerHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Row 1: Hero Area */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left: Quick Categories */}
          <div className="col-span-12 md:col-span-2">
            <QuickCategories />
          </div>

          {/* Center: Hero Banner */}
          <div className="col-span-12 md:col-span-7">
            <HeroBanner />
          </div>

          {/* Right: Benefit Cards */}
          <div className="col-span-12 md:col-span-3">
            <BenefitCards />
          </div>
        </div>

        {/* Row 2: Quick Shortcuts */}
        <ShortcutGrid />

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

                <p className="text-sm text-gray-600">$29.99</p>
              </div>
            </div>
          ))}
          <Button fullWidth className="mt-4">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  )
}
