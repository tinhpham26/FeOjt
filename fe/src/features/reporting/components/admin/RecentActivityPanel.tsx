'use client'

interface ActivityItem {
  actor: string
  action: string
  time: string
}

const RECENT_ACTIVITIES: ActivityItem[] = [
  { actor: 'Nguyễn Văn A', action: 'Tạo khuyến mãi tuần 6', time: '10 phút trước' },
  { actor: 'Trần Thị B', action: 'Cập nhật tồn kho SKU-123', time: '25 phút trước' },
  { actor: 'Lê C', action: 'Phê duyệt đơn nhập hàng', time: '1 giờ trước' },
  { actor: 'Phạm D', action: 'Thêm nhân viên ca tối', time: '2 giờ trước' },
  { actor: 'Võ E', action: 'Khóa tài khoản nội bộ', time: '3 giờ trước' },
  { actor: 'Đặng F', action: 'Điều chỉnh giá mặt hàng', time: 'Hôm qua' },
]

export function RecentActivityPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h2>
        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">{RECENT_ACTIVITIES.length} mục</span>
      </div>
      <ul className="divide-y divide-gray-200">
        {RECENT_ACTIVITIES.map((item, idx) => (
          <li key={idx} className="py-3 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-900 font-medium">{item.actor}</p>
              <p className="text-sm text-gray-600">{item.action}</p>
            </div>
            <span className="text-xs text-gray-500">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentActivityPanel
