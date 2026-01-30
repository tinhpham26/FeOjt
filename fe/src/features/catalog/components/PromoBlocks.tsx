'use client'

import Link from 'next/link'

const promos = [
  { id: 1, title: 'Giảm 50K', desc: 'Đơn từ 299K', color: 'bg-red-500', href: '/promotions/1' },
  { id: 2, title: 'Freeship', desc: 'Mọi đơn hàng', color: 'bg-blue-500', href: '/promotions/2' },
  { id: 3, title: 'Flash Sale', desc: 'Giá sốc hôm nay', color: 'bg-orange-500', href: '/promotions/3' },
  { id: 4, title: 'Hoàn xu', desc: 'Tích điểm mua sắm', color: 'bg-purple-500', href: '/promotions/4' },
]

export function PromoBlocks() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {promos.map((promo) => (
        <Link
          key={promo.id}
          href={promo.href}
          className={`${promo.color} rounded-lg p-6 text-white hover:opacity-90 transition-opacity`}
        >
          <h4 className="text-xl font-bold mb-1">{promo.title}</h4>
          <p className="text-sm opacity-90">{promo.desc}</p>
        </Link>
      ))}
    </div>
  )
}
