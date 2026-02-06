'use client'

import { useState, memo } from 'react'
import { Product } from '@/shared/types/product.types'

interface Props {
  product: Product
}

type TabType = 'description' | 'info'

export const ProductTabs = memo(function ProductTabs({ product }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('description')

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-12">
      {/* Tabs Header */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('description')}
            className={`flex-1 py-4 px-6 font-semibold text-center transition-colors relative ${
              activeTab === 'description'
                ? 'text-green-600 bg-green-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Mô tả sản phẩm
            {activeTab === 'description' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-4 px-6 font-semibold text-center transition-colors relative ${
              activeTab === 'info'
                ? 'text-green-600 bg-green-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Thông tin chi tiết
            {activeTab === 'info' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600"></div>
            )}
          </button>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="p-6 lg:p-8">
        {activeTab === 'description' ? (
          <div className="prose prose-green max-w-none">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mô tả sản phẩm</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description || 'Thông tin mô tả sản phẩm đang được cập nhật.'}
            </p>
            
            {/* Additional Description Sections */}
            <div className="mt-6 space-y-4">
              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                <h4 className="font-semibold text-green-900 mb-2">✓ Cam kết chất lượng</h4>
                <p className="text-sm text-green-800">
                  Sản phẩm được kiểm tra kỹ lưỡng trước khi giao hàng, đảm bảo tươi ngon và an toàn.
                </p>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <h4 className="font-semibold text-blue-900 mb-2">✓ Chính sách đổi trả</h4>
                <p className="text-sm text-blue-800">
                  Đổi trả trong vòng 24h nếu sản phẩm không đạt chất lượng cam kết.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Thông tin chi tiết</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex py-3 border-b border-gray-200">
                <span className="w-40 font-semibold text-gray-700">Tên sản phẩm:</span>
                <span className="flex-1 text-gray-900">{product.name}</span>
              </div>
              
              <div className="flex py-3 border-b border-gray-200">
                <span className="w-40 font-semibold text-gray-700">SKU:</span>
                <span className="flex-1 text-gray-900">#{product.id.toString().padStart(6, '0')}</span>
              </div>
              
              <div className="flex py-3 border-b border-gray-200">
                <span className="w-40 font-semibold text-gray-700">Đơn vị:</span>
                <span className="flex-1 text-gray-900">{product.unit}</span>
              </div>
              
              <div className="flex py-3 border-b border-gray-200">
                <span className="w-40 font-semibold text-gray-700">Giá:</span>
                <span className="flex-1 text-green-600 font-bold">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </span>
              </div>
              
              <div className="flex py-3 border-b border-gray-200">
                <span className="w-40 font-semibold text-gray-700">Tồn kho:</span>
                <span className="flex-1 text-gray-900">
                  {product.stock ? `${product.stock} ${product.unit}` : 'Đang cập nhật'}
                </span>
              </div>
              
              <div className="flex py-3 border-b border-gray-200">
                <span className="w-40 font-semibold text-gray-700">Trạng thái:</span>
                <span className={`flex-1 font-semibold ${product.stock && product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock && product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                </span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Hướng dẫn bảo quản</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li>Bảo quản nơi khô ráo, thoáng mát</li>
                <li>Tránh ánh nắng trực tiếp</li>
                <li>Đậy kín sau khi sử dụng</li>
                <li>Sử dụng trong thời hạn ghi trên bao bì</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})
