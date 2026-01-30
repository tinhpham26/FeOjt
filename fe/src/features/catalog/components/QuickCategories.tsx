'use client'

import Link from 'next/link'

interface QuickCategoriesProps {
  onItemClick?: () => void
}

const categories = [
  { id: 1, name: 'Rau củ tươi', icon: '🥬', color: 'bg-green-50 hover:bg-green-100', textColor: 'text-green-700', href: '/customer/category/vegetables' },
  { id: 2, name: 'Trái cây', icon: '🍎', color: 'bg-red-50 hover:bg-red-100', textColor: 'text-red-700', href: '/customer/category/fruits' },
  { id: 3, name: 'Thịt tươi', icon: '🍖', color: 'bg-pink-50 hover:bg-pink-100', textColor: 'text-pink-700', href: '/customer/category/meat' },
  { id: 4, name: 'Hải sản', icon: '🐟', color: 'bg-blue-50 hover:bg-blue-100', textColor: 'text-blue-700', href: '/customer/category/seafood' },
  { id: 5, name: 'Sữa & trứng', icon: '🥚', color: 'bg-yellow-50 hover:bg-yellow-100', textColor: 'text-yellow-700', href: '/customer/category/dairy' },
  { id: 6, name: 'Thực phẩm khô', icon: '🍘', color: 'bg-orange-50 hover:bg-orange-100', textColor: 'text-orange-700', href: '/customer/category/dry-food' },
  { id: 7, name: 'Đồ uống', icon: '🧃', color: 'bg-purple-50 hover:bg-purple-100', textColor: 'text-purple-700', href: '/customer/category/beverages' },
  { id: 8, name: 'Bánh kẹo', icon: '🍬', color: 'bg-rose-50 hover:bg-rose-100', textColor: 'text-rose-700', href: '/customer/category/snacks' },
  { id: 9, name: 'Đồ gia dụng', icon: '🧼', color: 'bg-teal-50 hover:bg-teal-100', textColor: 'text-teal-700', href: '/customer/category/household' },
  { id: 10, name: 'Chăm sóc cá nhân', icon: '🧴', color: 'bg-indigo-50 hover:bg-indigo-100', textColor: 'text-indigo-700', href: '/customer/category/personal-care' },
]

export function QuickCategories({ onItemClick }: QuickCategoriesProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 h-full">
      <h3 className="font-bold text-gray-900 text-base mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
        <span className="text-xl">🛒</span>
        <span>Danh mục</span>
      </h3>
      <div className="space-y-2">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            onClick={onItemClick}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all group"
          >
            <div className="text-2xl group-hover:scale-110 transition-transform flex-shrink-0">{cat.icon}</div>
            <div className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">{cat.name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
