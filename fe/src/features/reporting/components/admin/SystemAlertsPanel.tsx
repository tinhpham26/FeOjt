'use client'

interface AlertItem {
  type: 'stock' | 'approval' | 'delivery'
  message: string
  severity: 'low' | 'medium' | 'high'
}

const SYSTEM_ALERTS: AlertItem[] = [
  { type: 'stock', message: 'Tồn kho thấp: Rau xà lách tại kho Q7', severity: 'medium' },
  { type: 'approval', message: 'Đang chờ duyệt: Khuyến mãi "Tết 2026"', severity: 'low' },
  { type: 'delivery', message: 'Đang trễ: 12 đơn giao trong khu vực Q1', severity: 'high' },
]

export function SystemAlertsPanel() {
  const getBadgeClasses = (severity: AlertItem['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700'
      case 'medium':
        return 'bg-amber-100 text-amber-700'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getTypeIcon = (type: AlertItem['type']) => {
    switch (type) {
      case 'stock':
        return '📦'
      case 'approval':
        return '✅'
      case 'delivery':
        return '🚚'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Cảnh báo hệ thống</h2>
        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">{SYSTEM_ALERTS.length} mục</span>
      </div>
      <ul className="divide-y divide-gray-200">
        {SYSTEM_ALERTS.map((alert, idx) => (
          <li key={idx} className="py-3 flex items-start gap-3">
            <span className="text-xl">{getTypeIcon(alert.type)}</span>
            <div className="flex-1">
              <p className="text-sm text-gray-900">{alert.message}</p>
              <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${getBadgeClasses(alert.severity)}`}>
                {alert.severity === 'high' ? 'Cao' : alert.severity === 'medium' ? 'Trung bình' : 'Thấp'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SystemAlertsPanel
