'use client'

const benefits = [
  {
    icon: '🚚',
    title: 'Giao hàng nhanh',
    description: 'Trong 2 giờ',
    details: 'Miễn phí cho đơn từ 150K',
    color: 'bg-blue-50 border-blue-100'
  },
  {
    icon: '💰',
    title: 'Giá tốt nhất',
    description: 'Cam kết hoàn tiền',
    details: 'Nếu tìm thấy giá rẻ hơn',
    color: 'bg-emerald-50 border-emerald-100'
  },
  {
    icon: '✅',
    title: 'Đảm bảo chất lượng',
    description: 'Hàng chính hãng',
    details: '100% tươi ngon',
    color: 'bg-green-50 border-green-100'
  },
  {
    icon: '🎁',
    title: 'Ưu đãi độc quyền',
    description: 'Cho thành viên',
    details: 'Tích điểm đổi quà',
    color: 'bg-orange-50 border-orange-100'
  },
]

export function BenefitCards() {
  return (
    <>
      {benefits.map((benefit, idx) => (
        <div 
          key={idx} 
          className={`${benefit.color} border-2 rounded-xl p-4 hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer h-full`}
        >
          <div className="flex items-start gap-3">
            <div className="text-3xl flex-shrink-0">{benefit.icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-sm mb-1">{benefit.title}</h4>
              <p className="text-xs text-gray-700 font-medium">{benefit.description}</p>
              <p className="text-xs text-gray-600 mt-1">{benefit.details}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
