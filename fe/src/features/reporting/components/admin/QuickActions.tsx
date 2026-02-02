'use client'

import Link from 'next/link'

interface ActionItem {
  label: string
  href?: string
  enabled: boolean
}

const ACTIONS: ActionItem[] = [
  { label: 'Tạo tài khoản nội bộ', href: '/admin/users', enabled: true },
  { label: 'Tạo sản phẩm', href: '/admin/catalog/products', enabled: true },
  { label: 'Tạo khuyến mãi', href: '/admin/promotions', enabled: true },
  { label: 'Xem báo cáo', href: '/admin/reports', enabled: true },
]

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Hành động nhanh</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ACTIONS.map((a, idx) => (
          a.enabled && a.href ? (
            <Link
              key={idx}
              href={a.href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              <span>⚙️</span>
              <span className="font-medium">{a.label}</span>
            </Link>
          ) : (
            <div
              key={idx}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-500 bg-gray-50 cursor-not-allowed"
              title="Chưa triển khai"
            >
              <span>⌛</span>
              <span className="font-medium">{a.label}</span>
            </div>
          )
        ))}
      </div>
    </div>
  )
}

export default QuickActions
