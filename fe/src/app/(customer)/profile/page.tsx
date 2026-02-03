'use client'

import { useMemo, useState } from 'react'
import { CustomerHeader } from '@/features/catalog/components/CustomerHeader'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { useAuth } from '@/shared/hooks/useAuth'

type TabKey = 'vouchers' | 'promos' | 'profile' | 'support' | 'stores' | 'address'

const tabs: { key: TabKey; label: string }[] = [
  { key: 'vouchers', label: 'Phiếu mua hàng' },
  { key: 'promos', label: 'Ưu đãi đặc biệt' },
  { key: 'profile', label: 'Thông tin cá nhân' },
  { key: 'support', label: 'Hỗ trợ khách hàng' },
  { key: 'stores', label: 'Tìm kiếm cửa hàng' },
  { key: 'address', label: 'Địa chỉ nhận hàng' },
]

const purchaseVouchers = [
  { id: 'PX-12045', product: 'Rau củ tươi - Combo gia đình', date: '2026-01-20', total: 245000 },
  { id: 'PX-12038', product: 'Sữa tươi & bánh mì', date: '2026-01-12', total: 98000 },
  { id: 'PX-12011', product: 'Thịt heo tươi - 2kg', date: '2025-12-28', total: 310000 },
]

const promotions = [
  {
    id: 'PROMO-01',
    title: 'Giảm 15% cho đơn hàng trên 299k',
    description: 'Áp dụng cho tất cả thực phẩm tươi sống trong khung giờ vàng 9:00 - 11:00.',
    code: 'BHTS15',
    expiry: '20/02/2026',
  },
  {
    id: 'PROMO-02',
    title: 'Mua 2 tặng 1 đồ uống',
    description: 'Áp dụng tại các cửa hàng khu vực TP.HCM, số lượng có hạn.',
    code: 'DRINK21',
    expiry: '15/02/2026',
  },
]

const storeLocations = ['Thủ Đức', 'Ba Vì', 'Quận 1', 'Quận 7']

export default function CustomerProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<TabKey>('vouchers')
  const [storeQuery, setStoreQuery] = useState('')

  const [profileForm, setProfileForm] = useState({
    name: user?.name ?? 'Khách hàng Bách Hóa Xanh',
    email: user?.email ?? 'khachhang@example.com',
    phone: '0909 888 999',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({})

  const [addressForm, setAddressForm] = useState({
    recipient: user?.name ?? 'Khách hàng Bách Hóa Xanh',
    phone: '0909 888 999',
    addressLine: 'Tòa nhà BHX, 123 Lê Lợi, Phường Bến Thành',
    note: 'Giao giờ hành chính',
  })

  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({})

  const formatVnd = (value: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)

  const filteredStores = useMemo(() => {
    const query = storeQuery.trim().toLowerCase()
    if (!query) return storeLocations
    return storeLocations.filter((store) => store.toLowerCase().includes(query))
  }, [storeQuery])

  const validateProfile = () => {
    const errors: Record<string, string> = {}
    if (!profileForm.name.trim()) errors.name = 'Vui lòng nhập tên.'
    if (!profileForm.email.trim()) {
      errors.email = 'Vui lòng nhập email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email)) {
      errors.email = 'Email không hợp lệ.'
    }

    if (profileForm.newPassword || profileForm.confirmPassword) {
      if (!profileForm.currentPassword) {
        errors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại.'
      }
      if (profileForm.newPassword.length < 8) {
        errors.newPassword = 'Mật khẩu mới tối thiểu 8 ký tự.'
      }
      if (profileForm.newPassword !== profileForm.confirmPassword) {
        errors.confirmPassword = 'Mật khẩu xác nhận không khớp.'
      }
    }

    setProfileErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateAddress = () => {
    const errors: Record<string, string> = {}
    if (!addressForm.recipient.trim()) errors.recipient = 'Vui lòng nhập người nhận.'
    if (!addressForm.phone.trim()) errors.phone = 'Vui lòng nhập số điện thoại.'
    if (!addressForm.addressLine.trim()) errors.addressLine = 'Vui lòng nhập địa chỉ.'
    setAddressErrors(errors)
    return Object.keys(errors).length === 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerHeader />

      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white rounded-3xl p-6 md:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-emerald-100">Tài khoản của tôi</p>
              <h1 className="text-2xl md:text-3xl font-bold mt-2">Chào {user?.name ?? 'bạn'} 👋</h1>
              <p className="text-emerald-50 mt-2 max-w-2xl">
                Quản lý đơn hàng, ưu đãi, thông tin cá nhân và địa chỉ giao nhận một cách nhanh chóng.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => setActiveTab('profile')}
              >
                Cập nhật hồ sơ
              </Button>
              <Button
                className="bg-white text-emerald-700 hover:bg-emerald-50"
                onClick={() => setActiveTab('vouchers')}
              >
                Xem phiếu mua hàng
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                activeTab === tab.key
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'vouchers' && (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Phiếu mua hàng</h2>
              <p className="text-sm text-gray-500">Theo dõi lịch sử mua sắm và tổng giá trị.</p>
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-3">Mã phiếu</th>
                    <th className="py-3">Sản phẩm</th>
                    <th className="py-3">Ngày mua</th>
                    <th className="py-3 text-right">Tổng giá trị</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseVouchers.map((voucher) => (
                    <tr key={voucher.id} className="border-b last:border-b-0">
                      <td className="py-3 font-semibold text-emerald-700">{voucher.id}</td>
                      <td className="py-3 text-gray-700">{voucher.product}</td>
                      <td className="py-3 text-gray-600">{voucher.date}</td>
                      <td className="py-3 text-right font-semibold text-gray-900">
                        {formatVnd(voucher.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 md:hidden">
              {purchaseVouchers.map((voucher) => (
                <div key={voucher.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald-700 font-semibold">{voucher.id}</span>
                    <span className="text-sm text-gray-500">{voucher.date}</span>
                  </div>
                  <p className="mt-2 text-gray-800 font-medium">{voucher.product}</p>
                  <p className="mt-2 text-sm text-gray-600">Tổng: {formatVnd(voucher.total)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'promos' && (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Ưu đãi đặc biệt</h2>
              <p className="text-sm text-gray-500">Tham gia chương trình khuyến mãi đang có.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {promotions.map((promo) => (
                <div key={promo.id} className="border border-emerald-100 rounded-2xl p-5 bg-emerald-50/40">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{promo.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">{promo.description}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                        <span className="px-2.5 py-1 rounded-full bg-white text-emerald-700 border border-emerald-200 font-semibold">
                          Mã: {promo.code}
                        </span>
                        <span className="text-gray-500">Hết hạn: {promo.expiry}</span>
                      </div>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Tham gia</Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'profile' && (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Thông tin cá nhân</h2>
              <p className="text-sm text-gray-500">Cập nhật thông tin và thay đổi mật khẩu.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                <div className="w-20 h-20 rounded-full bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold">
                  {(user?.name ?? 'BHX')[0]}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{profileForm.name}</h3>
                <p className="text-sm text-gray-600">{profileForm.email}</p>
                <p className="text-sm text-gray-500 mt-2">Điểm tích lũy: 1.250</p>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Họ và tên"
                    value={profileForm.name}
                    onChange={(e) => {
                      setProfileForm((prev) => ({ ...prev, name: e.target.value }))
                      setProfileErrors((prev) => ({ ...prev, name: '' }))
                    }}
                    error={profileErrors.name}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => {
                      setProfileForm((prev) => ({ ...prev, email: e.target.value }))
                      setProfileErrors((prev) => ({ ...prev, email: '' }))
                    }}
                    error={profileErrors.email}
                    required
                  />
                  <Input
                    label="Số điện thoại"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm((prev) => ({ ...prev, phone: e.target.value }))}
                    helperText="Dùng để liên hệ giao hàng"
                  />
                </div>

                <div className="border border-gray-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-900">Đổi mật khẩu</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Input
                      label="Mật khẩu hiện tại"
                      type="password"
                      value={profileForm.currentPassword}
                      onChange={(e) => {
                        setProfileForm((prev) => ({ ...prev, currentPassword: e.target.value }))
                        setProfileErrors((prev) => ({ ...prev, currentPassword: '' }))
                      }}
                      error={profileErrors.currentPassword}
                    />
                    <Input
                      label="Mật khẩu mới"
                      type="password"
                      value={profileForm.newPassword}
                      onChange={(e) => {
                        setProfileForm((prev) => ({ ...prev, newPassword: e.target.value }))
                        setProfileErrors((prev) => ({ ...prev, newPassword: '' }))
                      }}
                      error={profileErrors.newPassword}
                      helperText="Tối thiểu 8 ký tự"
                    />
                    <Input
                      label="Xác nhận mật khẩu mới"
                      type="password"
                      value={profileForm.confirmPassword}
                      onChange={(e) => {
                        setProfileForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                        setProfileErrors((prev) => ({ ...prev, confirmPassword: '' }))
                      }}
                      error={profileErrors.confirmPassword}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => validateProfile()}
                  >
                    Lưu thay đổi
                  </Button>
                  <Button
                    variant="outline"
                    className="border-emerald-200 text-emerald-700"
                    onClick={() => {
                      setProfileForm((prev) => ({
                        ...prev,
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                      }))
                      setProfileErrors({})
                    }}
                  >
                    Đặt lại
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'support' && (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Hỗ trợ khách hàng</h2>
              <p className="text-sm text-gray-500">Luôn sẵn sàng hỗ trợ mọi vấn đề của bạn.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-emerald-100 rounded-2xl p-5 bg-emerald-50/60">
                <p className="text-sm text-gray-500">Hotline</p>
                <p className="text-xl font-semibold text-emerald-700">1900 959999</p>
                <p className="text-sm text-gray-600 mt-1">7:30 - 21:00 mỗi ngày</p>
              </div>
              <div className="border border-gray-200 rounded-2xl p-5">
                <p className="text-sm text-gray-500">Dịch vụ hỗ trợ</p>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  <li>• Tư vấn sản phẩm & khuyến mãi</li>
                  <li>• Theo dõi đơn hàng</li>
                  <li>• Khiếu nại & đổi trả</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-2xl p-5">
                <p className="text-sm text-gray-500">Kênh bổ sung</p>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  <li>• Chat trực tuyến trong ứng dụng</li>
                  <li>• Email: support@bachhoaxanh.vn</li>
                  <li>• Fanpage Bách Hóa Xanh</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'stores' && (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Tìm kiếm cửa hàng</h2>
              <p className="text-sm text-gray-500">Nhập khu vực để tìm cửa hàng gần bạn.</p>
            </div>

            <div className="max-w-lg">
              <Input
                label="Khu vực"
                placeholder="Ví dụ: Thủ Đức"
                value={storeQuery}
                onChange={(e) => setStoreQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStores.length > 0 ? (
                filteredStores.map((store) => (
                  <div key={store} className="border border-gray-200 rounded-2xl p-4">
                    <p className="text-sm text-gray-500">Khu vực</p>
                    <p className="text-lg font-semibold text-gray-900">{store}</p>
                    <p className="text-sm text-gray-500 mt-1">Mở cửa: 7:00 - 22:00</p>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">Không tìm thấy cửa hàng phù hợp.</div>
              )}
            </div>
          </section>
        )}

        {activeTab === 'address' && (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Địa chỉ nhận hàng</h2>
              <p className="text-sm text-gray-500">Cập nhật địa chỉ nhận hàng mặc định.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Người nhận"
                value={addressForm.recipient}
                onChange={(e) => {
                  setAddressForm((prev) => ({ ...prev, recipient: e.target.value }))
                  setAddressErrors((prev) => ({ ...prev, recipient: '' }))
                }}
                error={addressErrors.recipient}
                required
              />
              <Input
                label="Số điện thoại"
                value={addressForm.phone}
                onChange={(e) => {
                  setAddressForm((prev) => ({ ...prev, phone: e.target.value }))
                  setAddressErrors((prev) => ({ ...prev, phone: '' }))
                }}
                error={addressErrors.phone}
                required
              />
              <div className="md:col-span-2">
                <Input
                  label="Địa chỉ cụ thể"
                  value={addressForm.addressLine}
                  onChange={(e) => {
                    setAddressForm((prev) => ({ ...prev, addressLine: e.target.value }))
                    setAddressErrors((prev) => ({ ...prev, addressLine: '' }))
                  }}
                  error={addressErrors.addressLine}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
                <textarea
                  value={addressForm.note}
                  onChange={(e) => setAddressForm((prev) => ({ ...prev, note: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => validateAddress()}
              >
                Lưu địa chỉ
              </Button>
              <Button
                variant="outline"
                className="border-emerald-200 text-emerald-700"
                onClick={() => setAddressErrors({})}
              >
                Hủy
              </Button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
