'use client'

import { useState } from 'react'

const products = [
  { id: 1, name: 'Cà chua bi', price: '25.000đ', unit: 'kg', image: '🍅', rating: 4.5 },
  { id: 2, name: 'Táo Fuji Nhật', price: '89.000đ', unit: 'kg', image: '🍎', rating: 4.8 },
  { id: 3, name: 'Xoài cát Hòa Lộc', price: '65.000đ', unit: 'kg', image: '🥭', rating: 4.7 },
  { id: 4, name: 'Ớt chuông', price: '35.000đ', unit: 'kg', image: '🫑', rating: 4.3 },
  { id: 5, name: 'Nho xanh Mỹ', price: '120.000đ', unit: 'kg', image: '🍇', rating: 4.9 },
  { id: 6, name: 'Dưa hấu', price: '15.000đ', unit: 'kg', image: '🍉', rating: 4.4 },
  { id: 7, name: 'Chuối', price: '20.000đ', unit: 'nải', image: '🍌', rating: 4.6 },
  { id: 8, name: 'Dâu tây Đà Lạt', price: '85.000đ', unit: 'hộp', image: '🍓', rating: 4.8 },
]

const tabs = ['Tất cả', 'Rau củ', 'Trái cây', 'Bán chạy']

export function ProductBlock({ title }: { title: string }) {
  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">Xem tất cả →</button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-2 font-medium transition-colors relative ${
              activeTab === tab
                ? 'text-emerald-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
            )}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="relative mb-3">
              <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                {product.image}
              </div>
            </div>
            <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 h-10">{product.name}</h4>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-yellow-400">⭐</span>
              <span className="text-xs text-gray-600">{product.rating}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-lg font-bold text-emerald-600">{product.price}</span>
                <span className="text-xs text-gray-500">/{product.unit}</span>
              </div>
              <button className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center hover:bg-emerald-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
