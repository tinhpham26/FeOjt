'use client'

import { formatCurrency, formatNumber } from '@/shared/utils/format'

interface KpiItem {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'flat'
  accent?: 'emerald' | 'amber' | 'red'
}

const KPIS: KpiItem[] = [
  {
    title: 'Doanh thu hôm nay',
    value: formatCurrency(125_500_000, 'VND'),
    change: '+4.2% so với hôm qua',
    trend: 'up',
    accent: 'emerald',
  },
  {
    title: 'Đơn online hôm nay',
    value: formatNumber(843, 0),
    change: '+2.1% so với hôm qua',
    trend: 'up',
    accent: 'emerald',
  },
  {
    title: 'Cảnh báo tồn kho thấp',
    value: formatNumber(27, 0),
    change: '3 nhóm hàng cần xử lý',
    trend: 'flat',
    accent: 'amber',
  },
  {
    title: 'User nội bộ đang hoạt động',
    value: formatNumber(156, 0),
    change: '−1 ca nghỉ sớm',
    trend: 'down',
    accent: 'emerald',
  },
]

export function DashboardKpis() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {KPIS.map((kpi, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4"
        >
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-gray-600">{kpi.title}</h3>
            <span
              className={
                kpi.accent === 'amber'
                  ? 'px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700'
                  : 'px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-700'
              }
            >
              {kpi.trend === 'up' ? '▲' : kpi.trend === 'down' ? '▼' : '—'}
            </span>
          </div>
          <div className="mt-2 text-2xl lg:text-3xl font-bold text-gray-900">{kpi.value}</div>
          <div className="mt-1 text-xs text-gray-500">{kpi.change}</div>
        </div>
      ))}
    </div>
  )
}

export default DashboardKpis
