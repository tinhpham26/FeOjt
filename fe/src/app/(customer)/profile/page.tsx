'use client'

import { useState, useMemo } from 'react'
import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { useAuth } from '@/shared/hooks/useAuth'

type TabKey = 'vouchers' | 'orders' | 'profile' | 'addresses' | 'stores'

const storeLocations = [
  'BHX Quận 1, 123 Nguyễn Huệ',
  'BHX Quận 3, 456 Lê Văn Sỹ',
  'BHX Quận 5, 789 Trần Hưng Đạo',
  'BHX Quận 7, 321 Nguyễn Thị Thập',
  'BHX Quận 10, 654 Ba Tháng Hai',
  'BHX Gò Vấp, 987 Quang Trung',
  'BHX Bình Thạnh, 159 Xô Viết Nghệ Tĩnh',
]

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
    <div className="py-8 px-6">
      <PageHeader
        title="My Profile"
        subtitle="Manage your account information"
        breadcrumbs={[
          { label: 'Home', href: '/customer' },
          { label: 'Profile', href: '/customer/profile' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              {user?.name?.charAt(0).toUpperCase() || 'K'}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{user?.name || 'Khách hàng'}</h2>
            <p className="text-gray-600 text-sm">{user?.email || 'No email'}</p>
          </div>
          <Button fullWidth>Edit Profile</Button>
        </div>

        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
              <input
                type="text"
                value={user?.name || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                disabled
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
              <input
                type="tel"
                value={user?.phone || 'Chưa cập nhật'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ngày tham gia</label>
              <input
                type="text"
                value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
        <Button variant="outline">Change Password</Button>
      </div>
    </div>
  )
}


