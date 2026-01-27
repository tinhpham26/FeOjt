'use client'

const benefits = [
  {
    icon: '🚚',
    title: 'Giao hàng nhanh',
    description: 'Trong 2 giờ'
  },
  {
    icon: '💰',
    title: 'Giá tốt nhất',
    description: 'Cam kết hoàn tiền'
  },
  {
    icon: '✅',
    title: 'Đảm bảo chất lượng',
    description: 'Hàng chính hãng'
  },
]

export function BenefitCards() {
  return (
    <div className="space-y-3">
      {benefits.map((benefit, idx) => (
        <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{benefit.icon}</div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">{benefit.title}</h4>
              <p className="text-xs text-gray-600">{benefit.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
