'use client'

import Link from 'next/link'

const categories = [
  { id: 1, name: 'Trái cây', icon: '🍎', href: '/fresh' },
  { id: 2, name: 'Rau củ', icon: '🥬', href: '/vegetables' },
  { id: 3, name: 'Thịt, cá', icon: '🍖', href: '/meat' },
  { id: 4, name: 'Sữa, trứng', icon: '🥛', href: '/dairy' },
  { id: 5, name: 'Gạo, mì', icon: '🍚', href: '/rice' },
  { id: 6, name: 'Nước uống', icon: '🥤', href: '/drinks' },
  { id: 7, name: 'Bánh kẹo', icon: '🍪', href: '/snacks' },
  { id: 8, name: 'Gia vị', icon: '🧂', href: '/spices' },
]

export function CategoryGrid() {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Danh mục nổi bật</h3>
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-500 hover:shadow-md transition-all"
          >
            <div className="text-4xl mb-2">{cat.icon}</div>
            <span className="text-sm text-gray-700 text-center font-medium">{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
