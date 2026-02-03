'use client'

import { useMemo, useState } from 'react'
import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import Link from 'next/link'

interface ReportCard {
  title: string
  description: string
  icon: string
  href: string
  color: string
}

interface ChartDataPoint {
  label: string
  value: number
  color: string
}

interface LineChartDataPoint {
  date: string
  revenue: number
  profit: number
  orders: number
}

export default function AllReportsPage() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  // Report Cards
  const reports: ReportCard[] = [
    {
      title: 'Sales Reports',
      description: 'Tổng hợp doanh thu theo ngày, cửa hàng và kênh bán',
      icon: '💰',
      href: '/admin/reports/sales',
      color: 'border-emerald-500',
    },
    {
      title: 'Inventory Reports',
      description: 'Báo cáo tồn kho theo sản phẩm, cửa hàng và trạng thái',
      icon: '📦',
      href: '/admin/reports/inventory',
      color: 'border-blue-500',
    },
    {
      title: 'Profit & Loss',
      description: 'Báo cáo lãi/lỗ và phân tích tài chính',
      icon: '💵',
      href: '/admin/reports/finance',
      color: 'border-purple-500',
    },
  ]

  // Pie Chart Data - Revenue by Category
  const pieChartData: ChartDataPoint[] = useMemo(
    () => [
      { label: 'Thực phẩm khô', value: 450, color: '#10b981' },
      { label: 'Gia vị', value: 280, color: '#3b82f6' },
      { label: 'Đồ uống', value: 320, color: '#8b5cf6' },
      { label: 'Sữa & Bánh', value: 250, color: '#f59e0b' },
      { label: 'Khác', value: 180, color: '#6b7280' },
    ],
    []
  )

  // Line Chart Data - Trend over time
  const lineChartData: LineChartDataPoint[] = useMemo(() => {
    const data: LineChartDataPoint[] = []
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      data.push({
        date: date.toISOString().split('T')[0],
        revenue: 20 + Math.random() * 30 + Math.sin(i / 3) * 10,
        profit: 5 + Math.random() * 15 + Math.sin(i / 3) * 5,
        orders: 80 + Math.random() * 60 + Math.sin(i / 3) * 20,
      })
    }
    return data
  }, [period])

  // Calculate totals
  const totalPieValue = pieChartData.reduce((sum, item) => sum + item.value, 0)
  const avgRevenue = lineChartData.reduce((sum, item) => sum + item.revenue, 0) / lineChartData.length
  const avgProfit = lineChartData.reduce((sum, item) => sum + item.profit, 0) / lineChartData.length
  const totalOrders = Math.floor(lineChartData.reduce((sum, item) => sum + item.orders, 0))

  // Render Pie Chart
  const renderPieChart = () => {
    let cumulativePercent = 0

    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {pieChartData.map((item, index) => {
          const percent = (item.value / totalPieValue) * 100
          const angle = (percent / 100) * 360
          const startAngle = (cumulativePercent / 100) * 360 - 90
          const endAngle = startAngle + angle

          const x1 = 100 + 90 * Math.cos((Math.PI * startAngle) / 180)
          const y1 = 100 + 90 * Math.sin((Math.PI * startAngle) / 180)
          const x2 = 100 + 90 * Math.cos((Math.PI * endAngle) / 180)
          const y2 = 100 + 90 * Math.sin((Math.PI * endAngle) / 180)

          const largeArcFlag = angle > 180 ? 1 : 0

          const pathData = [
            `M 100 100`,
            `L ${x1} ${y1}`,
            `A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `Z`,
          ].join(' ')

          cumulativePercent += percent

          return (
            <g key={index}>
              <path d={pathData} fill={item.color} stroke="white" strokeWidth="2" />
            </g>
          )
        })}
        <circle cx="100" cy="100" r="50" fill="white" />
        <text
          x="100"
          y="95"
          textAnchor="middle"
          className="text-xl font-bold"
          fill="#1f2937"
        >
          {totalPieValue}M
        </text>
        <text
          x="100"
          y="110"
          textAnchor="middle"
          className="text-xs"
          fill="#6b7280"
        >
          Total
        </text>
      </svg>
    )
  }

  // Render Line Chart
  const renderLineChart = () => {
    const maxRevenue = Math.max(...lineChartData.map((d) => d.revenue))
    const maxProfit = Math.max(...lineChartData.map((d) => d.profit))
    const maxValue = Math.max(maxRevenue, maxProfit)
    const padding = 40
    const chartWidth = 700
    const chartHeight = 300

    const getX = (index: number) => padding + (index / (lineChartData.length - 1)) * (chartWidth - padding * 2)
    const getY = (value: number) => chartHeight - padding - ((value / maxValue) * (chartHeight - padding * 2))

    // Revenue line points
    const revenuePoints = lineChartData
      .map((d, i) => `${getX(i)},${getY(d.revenue)}`)
      .join(' ')

    // Profit line points
    const profitPoints = lineChartData
      .map((d, i) => `${getX(i)},${getY(d.profit)}`)
      .join(' ')

    return (
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = padding + (i / 4) * (chartHeight - padding * 2)
          return (
            <g key={i}>
              <line
                x1={padding}
                y1={y}
                x2={chartWidth - padding}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <text x={padding - 10} y={y + 5} textAnchor="end" className="text-xs" fill="#9ca3af">
                {Math.round(maxValue * (1 - i / 4))}M
              </text>
            </g>
          )
        })}

        {/* Revenue line */}
        <polyline
          points={revenuePoints}
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Profit line */}
        <polyline
          points={profitPoints}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {lineChartData.map((d, i) => (
          <g key={i}>
            <circle cx={getX(i)} cy={getY(d.revenue)} r="4" fill="#10b981" />
            <circle cx={getX(i)} cy={getY(d.profit)} r="4" fill="#3b82f6" />
          </g>
        ))}

        {/* X-axis labels */}
        {lineChartData
          .filter((_, i) => i % Math.ceil(lineChartData.length / 7) === 0)
          .map((d, i, arr) => {
            const index = lineChartData.indexOf(d)
            return (
              <text
                key={index}
                x={getX(index)}
                y={chartHeight - padding + 20}
                textAnchor="middle"
                className="text-xs"
                fill="#6b7280"
              >
                {new Date(d.date).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' })}
              </text>
            )
          })}
      </svg>
    )
  }

  return (
    <div className="p-6">
      <PageHeader
        title="All Reports"
        subtitle="Tổng quan và phân tích báo cáo kinh doanh"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Reports', href: '/admin/reports' },
        ]}
        actions={
          <Button onClick={() => alert('Export all reports')}>
            📊 Export Dashboard
          </Button>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card p-4 border-l-4 border-emerald-500">
          <div className="text-sm text-gray-600 mb-1">Doanh thu TB/Ngày</div>
          <div className="text-2xl font-bold text-emerald-600">
            {avgRevenue.toFixed(1)}M ₫
          </div>
          <div className="text-xs text-gray-500 mt-1">↑ 12.5% so với kỳ trước</div>
        </div>

        <div className="card p-4 border-l-4 border-blue-500">
          <div className="text-sm text-gray-600 mb-1">Lợi nhuận TB/Ngày</div>
          <div className="text-2xl font-bold text-blue-600">
            {avgProfit.toFixed(1)}M ₫
          </div>
          <div className="text-xs text-gray-500 mt-1">↑ 8.3% so với kỳ trước</div>
        </div>

        <div className="card p-4 border-l-4 border-purple-500">
          <div className="text-sm text-gray-600 mb-1">Tổng đơn hàng</div>
          <div className="text-2xl font-bold text-purple-600">{totalOrders.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">↑ 15.2% so với kỳ trước</div>
        </div>

        <div className="card p-4 border-l-4 border-amber-500">
          <div className="text-sm text-gray-600 mb-1">Biên lợi nhuận</div>
          <div className="text-2xl font-bold text-amber-600">
            {((avgProfit / avgRevenue) * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500 mt-1">↓ 1.2% so với kỳ trước</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart - Revenue by Category */}
        <div className="card">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Doanh thu theo danh mục</h3>
            <p className="text-sm text-gray-600">Phân bổ doanh thu trong {period === '7d' ? '7 ngày' : period === '30d' ? '30 ngày' : '90 ngày'} qua</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 mb-4">
              {renderPieChart()}
            </div>

            {/* Legend */}
            <div className="w-full space-y-2">
              {pieChartData.map((item, index) => {
                const percent = ((item.value / totalPieValue) * 100).toFixed(1)
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {item.value}M ₫
                      </span>
                      <span className="text-xs text-gray-500">({percent}%)</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Line Chart - Trend over time */}
        <div className="card">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Xu hướng doanh thu & lợi nhuận</h3>
              <p className="text-sm text-gray-600">Biến động theo thời gian</p>
            </div>
            <select
              className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              value={period}
              onChange={(e) => setPeriod(e.target.value as '7d' | '30d' | '90d')}
            >
              <option value="7d">7 ngày</option>
              <option value="30d">30 ngày</option>
              <option value="90d">90 ngày</option>
            </select>
          </div>

          <div className="w-full h-80">
            {renderLineChart()}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-emerald-500 rounded" />
              <span className="text-sm text-gray-700">Doanh thu</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-blue-500 rounded" />
              <span className="text-sm text-gray-700">Lợi nhuận</span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Cards */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Báo cáo chi tiết</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <Link key={index} href={report.href}>
              <div className={`card hover:shadow-lg transition-shadow cursor-pointer border-l-4 ${report.color}`}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{report.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {report.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                    <div className="text-sm text-blue-600 font-medium hover:text-blue-700">
                      Xem báo cáo →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Sản phẩm đang bán</div>
            <div className="text-xl font-bold text-gray-900">1,234</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Khách hàng</div>
            <div className="text-xl font-bold text-gray-900">5,678</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Cửa hàng</div>
            <div className="text-xl font-bold text-gray-900">12</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Tồn kho</div>
            <div className="text-xl font-bold text-gray-900">45,890</div>
          </div>
        </div>
      </div>
    </div>
  )
}
