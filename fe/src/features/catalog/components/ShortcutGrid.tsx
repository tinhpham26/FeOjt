'use client'

interface ShortcutGridProps {
  onCategoryClick?: () => void
}

const shortcuts = [
  { id: 1, name: 'Rau củ tươi', icon: '🥬' },
  { id: 2, name: 'Trái cây', icon: '🍎' },
  { id: 3, name: 'Thịt tươi', icon: '🥩' },
  { id: 4, name: 'Hải sản', icon: '🦐' },
  { id: 5, name: 'Sữa & trứng', icon: '🥛' },
  { id: 6, name: 'Thực phẩm khô', icon: '🍚' },
  { id: 7, name: 'Đồ uống', icon: '🥤' },
  { id: 8, name: 'Bánh kẹo', icon: '🍪' },
  { id: 9, name: 'Đồ gia dụng', icon: '🏠' },
  { id: 10, name: 'Chăm sóc', icon: '🧴' },
]

export function ShortcutGrid({ onCategoryClick }: ShortcutGridProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
          <span>⚡</span>
          <span>Mua sắm nhanh</span>
        </h3>
        <button 
          onClick={onCategoryClick}
          className="lg:hidden flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors"
        >
          <span>🛒</span>
          <span>Xem tất cả danh mục</span>
        </button>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-3">
        {shortcuts.map((item) => (
          <button
            key={item.id}
            onClick={onCategoryClick}
            className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 transition-all group hover:shadow-md hover:-translate-y-1"
          >
            <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">{item.icon}</div>
            <div className="text-xs font-medium text-gray-700 group-hover:text-emerald-600 text-center leading-tight transition-colors">{item.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
