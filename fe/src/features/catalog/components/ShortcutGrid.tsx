'use client'

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

export function ShortcutGrid() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="font-bold text-gray-900 text-lg mb-4">Mua sắm nhanh</h3>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
        {shortcuts.map((item) => (
          <button
            key={item.id}
            className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-emerald-50 transition-colors group"
          >
            <div className="text-4xl group-hover:scale-110 transition-transform">{item.icon}</div>
            <div className="text-xs font-medium text-gray-700 text-center leading-tight">{item.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
