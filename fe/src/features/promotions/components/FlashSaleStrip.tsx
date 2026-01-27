'use client'

const flashSaleProducts = [
  { id: 1, name: 'Táo Fuji', price: '49.000đ', originalPrice: '89.000đ', discount: '-45%', image: '🍎' },
  { id: 2, name: 'Thịt ba chỉ', price: '129.000đ', originalPrice: '199.000đ', discount: '-35%', image: '🥩' },
  { id: 3, name: 'Cá hồi', price: '299.000đ', originalPrice: '499.000đ', discount: '-40%', image: '🐟' },
  { id: 4, name: 'Sữa tươi', price: '25.000đ', originalPrice: '35.000đ', discount: '-28%', image: '🥛' },
  { id: 5, name: 'Rau xanh', price: '15.000đ', originalPrice: '25.000đ', discount: '-40%', image: '🥬' },
]

export function FlashSaleStrip() {
  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">⚡</span>
          <div>
            <h3 className="text-xl font-bold text-white">Flash Sale</h3>
            <p className="text-sm text-white/90">Kết thúc trong: 02:34:56</p>
          </div>
        </div>
        <button className="text-white hover:underline font-medium">Xem tất cả →</button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {flashSaleProducts.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-48 bg-white rounded-xl p-4 hover:shadow-lg transition-shadow"
          >
            <div className="relative mb-3">
              <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-5xl">
                {product.image}
              </div>
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}
              </span>
            </div>
            <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-red-600">{product.price}</span>
              <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
            </div>
            <div className="mt-2 bg-red-50 rounded h-1 overflow-hidden">
              <div className="bg-red-500 h-full w-3/4" />
            </div>
            <p className="text-xs text-gray-600 mt-1">Đã bán 234</p>
          </div>
        ))}
      </div>
    </div>
  )
}
