'use client'

import { useState } from 'react'
import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

interface ConfigSection {
  id: string
  title: string
  description: string
  icon: string
}

interface ConfigItem {
  id: string
  sectionId: string
  label: string
  description: string
  type: 'text' | 'number' | 'select' | 'toggle' | 'textarea'
  value: string | number | boolean
  options?: { label: string; value: string }[]
  unit?: string
}

export default function ConfigurationPage() {
  const [activeSection, setActiveSection] = useState('general')
  const [hasChanges, setHasChanges] = useState(false)

  const sections: ConfigSection[] = [
    {
      id: 'general',
      title: 'Cài đặt chung',
      description: 'Thông tin cơ bản về hệ thống',
      icon: '⚙️',
    },
    {
      id: 'business',
      title: 'Cài đặt kinh doanh',
      description: 'Cấu hình về kinh doanh và vận hành',
      icon: '🏪',
    },
    {
      id: 'payment',
      title: 'Thanh toán',
      description: 'Cấu hình phương thức thanh toán',
      icon: '💳',
    },
    {
      id: 'notification',
      title: 'Thông báo',
      description: 'Cài đặt email và thông báo',
      icon: '🔔',
    },
    {
      id: 'security',
      title: 'Bảo mật',
      description: 'Cài đặt bảo mật và quyền truy cập',
      icon: '🔒',
    },
    {
      id: 'integration',
      title: 'Tích hợp',
      description: 'API và dịch vụ bên thứ 3',
      icon: '🔗',
    },
  ]

  const [configs, setConfigs] = useState<ConfigItem[]>([
    // General Settings
    {
      id: 'company_name',
      sectionId: 'general',
      label: 'Tên công ty',
      description: 'Tên hiển thị của công ty',
      type: 'text',
      value: 'Bach Hoa Xanh',
    },
    {
      id: 'company_email',
      sectionId: 'general',
      label: 'Email công ty',
      description: 'Email liên hệ chính',
      type: 'text',
      value: 'contact@bhx.vn',
    },
    {
      id: 'company_phone',
      sectionId: 'general',
      label: 'Số điện thoại',
      description: 'Hotline hỗ trợ khách hàng',
      type: 'text',
      value: '1900 1234',
    },
    {
      id: 'timezone',
      sectionId: 'general',
      label: 'Múi giờ',
      description: 'Múi giờ mặc định của hệ thống',
      type: 'select',
      value: 'Asia/Ho_Chi_Minh',
      options: [
        { label: 'Asia/Ho_Chi_Minh (GMT+7)', value: 'Asia/Ho_Chi_Minh' },
        { label: 'Asia/Bangkok (GMT+7)', value: 'Asia/Bangkok' },
        { label: 'Asia/Singapore (GMT+8)', value: 'Asia/Singapore' },
      ],
    },
    {
      id: 'language',
      sectionId: 'general',
      label: 'Ngôn ngữ',
      description: 'Ngôn ngữ hiển thị mặc định',
      type: 'select',
      value: 'vi',
      options: [
        { label: 'Tiếng Việt', value: 'vi' },
        { label: 'English', value: 'en' },
      ],
    },

    // Business Settings
    {
      id: 'tax_rate',
      sectionId: 'business',
      label: 'Thuế VAT',
      description: 'Tỷ lệ thuế VAT áp dụng',
      type: 'number',
      value: 10,
      unit: '%',
    },
    {
      id: 'min_order_amount',
      sectionId: 'business',
      label: 'Đơn hàng tối thiểu',
      description: 'Giá trị đơn hàng tối thiểu',
      type: 'number',
      value: 50000,
      unit: 'VND',
    },
    {
      id: 'free_shipping_threshold',
      sectionId: 'business',
      label: 'Freeship từ',
      description: 'Miễn phí vận chuyển khi đơn hàng từ',
      type: 'number',
      value: 300000,
      unit: 'VND',
    },
    {
      id: 'loyalty_points_rate',
      sectionId: 'business',
      label: 'Tỷ lệ tích điểm',
      description: 'Số điểm tích lũy trên 1000 VND',
      type: 'number',
      value: 1,
      unit: 'điểm/1000đ',
    },
    {
      id: 'auto_confirm_order',
      sectionId: 'business',
      label: 'Tự động xác nhận đơn',
      description: 'Tự động xác nhận đơn hàng online',
      type: 'toggle',
      value: true,
    },

    // Payment Settings
    {
      id: 'enable_cod',
      sectionId: 'payment',
      label: 'Thanh toán COD',
      description: 'Cho phép thanh toán khi nhận hàng',
      type: 'toggle',
      value: true,
    },
    {
      id: 'enable_vnpay',
      sectionId: 'payment',
      label: 'VNPay',
      description: 'Kích hoạt thanh toán qua VNPay',
      type: 'toggle',
      value: true,
    },
    {
      id: 'enable_momo',
      sectionId: 'payment',
      label: 'MoMo',
      description: 'Kích hoạt thanh toán qua MoMo',
      type: 'toggle',
      value: true,
    },
    {
      id: 'enable_bank_transfer',
      sectionId: 'payment',
      label: 'Chuyển khoản ngân hàng',
      description: 'Cho phép thanh toán bằng chuyển khoản',
      type: 'toggle',
      value: false,
    },

    // Notification Settings
    {
      id: 'email_order_confirmation',
      sectionId: 'notification',
      label: 'Email xác nhận đơn hàng',
      description: 'Gửi email khi đơn hàng được tạo',
      type: 'toggle',
      value: true,
    },
    {
      id: 'email_shipping',
      sectionId: 'notification',
      label: 'Email giao hàng',
      description: 'Thông báo khi đơn hàng được giao',
      type: 'toggle',
      value: true,
    },
    {
      id: 'sms_notification',
      sectionId: 'notification',
      label: 'SMS thông báo',
      description: 'Gửi SMS cho các sự kiện quan trọng',
      type: 'toggle',
      value: false,
    },
    {
      id: 'smtp_host',
      sectionId: 'notification',
      label: 'SMTP Host',
      description: 'Máy chủ SMTP để gửi email',
      type: 'text',
      value: 'smtp.gmail.com',
    },
    {
      id: 'smtp_port',
      sectionId: 'notification',
      label: 'SMTP Port',
      description: 'Cổng SMTP',
      type: 'number',
      value: 587,
    },

    // Security Settings
    {
      id: 'session_timeout',
      sectionId: 'security',
      label: 'Thời gian timeout',
      description: 'Thời gian hết phiên đăng nhập (phút)',
      type: 'number',
      value: 30,
      unit: 'phút',
    },
    {
      id: 'password_min_length',
      sectionId: 'security',
      label: 'Độ dài mật khẩu tối thiểu',
      description: 'Số ký tự tối thiểu cho mật khẩu',
      type: 'number',
      value: 8,
      unit: 'ký tự',
    },
    {
      id: 'enable_2fa',
      sectionId: 'security',
      label: 'Xác thực 2 yếu tố',
      description: 'Bắt buộc 2FA cho tài khoản admin',
      type: 'toggle',
      value: false,
    },
    {
      id: 'max_login_attempts',
      sectionId: 'security',
      label: 'Số lần đăng nhập sai',
      description: 'Số lần đăng nhập sai tối đa trước khi khóa',
      type: 'number',
      value: 5,
      unit: 'lần',
    },

    // Integration Settings
    {
      id: 'enable_api',
      sectionId: 'integration',
      label: 'Kích hoạt API',
      description: 'Cho phép truy cập qua REST API',
      type: 'toggle',
      value: true,
    },
    {
      id: 'api_key',
      sectionId: 'integration',
      label: 'API Key',
      description: 'Khóa API cho các dịch vụ bên ngoài',
      type: 'text',
      value: 'bhx_sk_live_xxxxxxxxxxxx',
    },
    {
      id: 'webhook_url',
      sectionId: 'integration',
      label: 'Webhook URL',
      description: 'URL nhận thông báo webhook',
      type: 'textarea',
      value: 'https://api.bhx.vn/webhook',
    },
  ])

  const handleChange = (id: string, newValue: string | number | boolean) => {
    setConfigs(configs.map((config) => (config.id === id ? { ...config, value: newValue } : config)))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Save to backend
    alert('Đã lưu cấu hình thành công!')
    setHasChanges(false)
  }

  const handleReset = () => {
    if (confirm('Bạn có chắc muốn hoàn tác các thay đổi?')) {
      // Reset logic here
      setHasChanges(false)
    }
  }

  const filteredConfigs = configs.filter((config) => config.sectionId === activeSection)

  const renderConfigInput = (config: ConfigItem) => {
    switch (config.type) {
      case 'text':
        return (
          <Input
            value={config.value as string}
            onChange={(e) => handleChange(config.id, e.target.value)}
            className="max-w-md"
          />
        )

      case 'number':
        return (
          <div className="flex items-center gap-2 max-w-md">
            <Input
              type="number"
              value={config.value as number}
              onChange={(e) => handleChange(config.id, Number(e.target.value))}
              className="flex-1"
            />
            {config.unit && <span className="text-sm text-gray-600">{config.unit}</span>}
          </div>
        )

      case 'select':
        return (
          <select
            value={config.value as string}
            onChange={(e) => handleChange(config.id, e.target.value)}
            className="max-w-md rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            {config.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'toggle':
        return (
          <button
            type="button"
            onClick={() => handleChange(config.id, !config.value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              config.value ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                config.value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        )

      case 'textarea':
        return (
          <textarea
            value={config.value as string}
            onChange={(e) => handleChange(config.id, e.target.value)}
            rows={3}
            className="max-w-md w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Configuration"
        subtitle="Cấu hình hệ thống và các tùy chọn"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'System', href: '/admin/system' },
          { label: 'Configuration', href: '/admin/system/config' },
        ]}
        actions={
          hasChanges && (
            <div className="flex gap-2">
              <Button variant="secondary" onClick={handleReset}>
                Hoàn tác
              </Button>
              <Button onClick={handleSave}>💾 Lưu thay đổi</Button>
            </div>
          )
        }
      />

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="card sticky top-6">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{section.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm">{section.title}</div>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="card">
            {/* Section Header */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">
                  {sections.find((s) => s.id === activeSection)?.icon}
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {sections.find((s) => s.id === activeSection)?.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {sections.find((s) => s.id === activeSection)?.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Config Items */}
            <div className="space-y-6">
              {filteredConfigs.map((config) => (
                <div key={config.id} className="pb-6 border-b border-gray-100 last:border-0">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-900">
                      {config.label}
                    </label>
                    <p className="text-sm text-gray-600 mb-2">{config.description}</p>
                    {renderConfigInput(config)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex gap-3">
              <span className="text-blue-600 text-xl">ℹ️</span>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-900 mb-1">Lưu ý</h4>
                <p className="text-sm text-blue-700">
                  Một số thay đổi có thể yêu cầu khởi động lại hệ thống hoặc đăng xuất/đăng nhập
                  lại để có hiệu lực. Vui lòng kiểm tra kỹ trước khi lưu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
