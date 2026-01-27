'use client'

const categories = [
  { id: 1, name: 'Rau củ', icon: '🥬', color: 'bg-green-50' },
  { id: 2, name: 'Trái cây', icon: '🍎', color: 'bg-red-50' },
  { id: 3, name: 'Thịt', icon: '🥩', color: 'bg-pink-50' },
  { id: 4, name: 'Cá', icon: '🐟', color: 'bg-blue-50' },
]

export function QuickCategories() {
  return (
    <div className="space-y-3">
      <h3 className="font-bold text-gray-900 text-lg">Danh mục nổi bật</h3>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${cat.color} rounded-xl p-4 hover:shadow-md transition-all hover:-translate-y-0.5`}
          >
            <div className="text-3xl mb-2">{cat.icon}</div>
            <div className="text-sm font-medium text-gray-900">{cat.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
