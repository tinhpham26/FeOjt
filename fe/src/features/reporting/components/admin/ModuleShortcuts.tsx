'use client'

import Link from 'next/link'

interface ShortcutItem {
  title: string
  description: string
  href: string
  status: 'Ready' | 'Stub'
}

const SHORTCUTS: ShortcutItem[] = [
  { title: 'Users & Roles', description: 'Quản lý IAM và phân quyền', href: '/admin/users', status: 'Ready' },
  { title: 'Products', description: 'Danh mục hàng hóa', href: '/admin/catalog/products', status: 'Ready' },
  { title: 'Categories', description: 'Phân loại sản phẩm', href: '/admin/catalog/categories', status: 'Ready' },
  { title: 'Promotions', description: 'Chương trình khuyến mãi', href: '/admin/promotions', status: 'Ready' },
  { title: 'Reports', description: 'Phân tích và báo cáo', href: '/admin/reports', status: 'Ready' },
  { title: 'Customers', description: 'Quản lý khách hàng', href: '/admin/customers', status: 'Ready' },
  { title: 'Delivery', description: 'Theo dõi đơn giao hàng', href: '/admin/delivery', status: 'Ready' },
]

export function ModuleShortcuts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {SHORTCUTS.map((s, idx) => (
        <Link
          key={idx}
          href={s.href}
          className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 group"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900 group-hover:text-emerald-700">{s.title}</h3>
            <span
              className={`${
                s.status === 'Ready'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-600'
              } px-2 py-0.5 text-xs rounded-full`}
            >
              {s.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">{s.description}</p>
        </Link>
      ))}
    </div>
  )
}

export default ModuleShortcuts
