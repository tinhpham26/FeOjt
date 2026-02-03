'use client'

import { useMemo, useState } from 'react'
import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { DataTable } from '@/shared/ui/DataTable'
import { EmptyState } from '@/shared/ui/EmptyState'

type Channel = 'ONLINE' | 'POS'

interface SalesRow {
  id: string
  date: string
  channel: Channel
  storeName: string
  orders: number
  items: number
  grossRevenue: number
  discounts: number
  netRevenue: number
}

const channelLabels: Record<Channel, string> = {
  ONLINE: 'Online',
  POS: 'POS',
}

export default function SalesReportsPage() {
  const [channelFilter, setChannelFilter] = useState<'all' | Channel>('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [storeQuery, setStoreQuery] = useState('')

  // Demo data
  const data: SalesRow[] = useMemo(
    () => [
      {
        id: '1',
        date: '2026-02-01',
        channel: 'ONLINE',
        storeName: 'BHX Quận 1',
        orders: 120,
        items: 450,
        grossRevenue: 45000000,
        discounts: 3000000,
        netRevenue: 42000000,
      },
      {
        id: '2',
        date: '2026-02-01',
        channel: 'POS',
        storeName: 'BHX Quận 1',
        orders: 80,
        items: 320,
        grossRevenue: 28000000,
        discounts: 1500000,
        netRevenue: 26500000,
      },
      {
        id: '3',
        date: '2026-02-01',
        channel: 'ONLINE',
        storeName: 'BHX Quận 2',
        orders: 60,
        items: 210,
        grossRevenue: 21000000,
        discounts: 1000000,
        netRevenue: 20000000,
      },
      {
        id: '4',
        date: '2026-02-02',
        channel: 'POS',
        storeName: 'BHX Quận 1',
        orders: 95,
        items: 350,
        grossRevenue: 32000000,
        discounts: 2000000,
        netRevenue: 30000000,
      },
    ],
    []
  )

  const filtered = useMemo(() => {
    return data.filter((row) => {
      const matchesChannel = channelFilter === 'all' || row.channel === channelFilter
      const matchesStore =
        !storeQuery ||
        row.storeName.toLowerCase().includes(storeQuery.trim().toLowerCase())
      const day = row.date
      const matchesFrom = !dateFrom || day >= dateFrom
      const matchesTo = !dateTo || day <= dateTo
      return matchesChannel && matchesStore && matchesFrom && matchesTo
    })
  }, [data, channelFilter, storeQuery, dateFrom, dateTo])

  const totalOrders = filtered.reduce((s, r) => s + r.orders, 0)
  const totalNet = filtered.reduce((s, r) => s + r.netRevenue, 0)
  const totalDiscounts = filtered.reduce((s, r) => s + r.discounts, 0)

  return (
    <div className="p-6">
      <PageHeader
        title="Sales Reports"
        subtitle="Tổng hợp doanh thu theo ngày, cửa hàng và kênh bán"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Reports', href: '/admin/reports' },
          { label: 'Sales Reports', href: '/admin/reports/sales' },
        ]}
        actions={<Button onClick={() => alert('Export demo')}>Export CSV</Button>}
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4 border-l-4 border-emerald-500">
          <div className="text-sm text-gray-600 mb-1">Tổng đơn hàng</div>
          <div className="text-2xl font-bold text-emerald-600">{totalOrders}</div>
        </div>
        <div className="card p-4 border-l-4 border-blue-500">
          <div className="text-sm text-gray-600 mb-1">Doanh thu ròng</div>
          <div className="text-2xl font-bold text-blue-600">
            {totalNet.toLocaleString('vi-VN')} ₫
          </div>
        </div>
        <div className="card p-4 border-l-4 border-amber-500">
          <div className="text-sm text-gray-600 mb-1">Giảm giá</div>
          <div className="text-2xl font-bold text-amber-600">
            {totalDiscounts.toLocaleString('vi-VN')} ₫
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <Input
              placeholder="Lọc theo tên cửa hàng..."
              value={storeQuery}
              onChange={(e) => setStoreQuery(e.target.value)}
            />
          </div>
          <div>
            <select
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value as 'all' | Channel)}
            >
              <option value="all">Tất cả kênh</option>
              <option value="ONLINE">Online</option>
              <option value="POS">POS</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="flex-1"
            />
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        {filtered.length === 0 ? (
          <EmptyState
            title="Không có dữ liệu"
            description="Không tìm thấy bản ghi doanh thu phù hợp với bộ lọc."
          />
        ) : (
          <DataTable
            data={filtered as unknown as Record<string, unknown>[]}
            columns={[
              {
                key: 'date',
                label: 'Ngày',
                render: (v) => new Date(v as string).toLocaleDateString('vi-VN'),
              },
              { key: 'storeName', label: 'Cửa hàng' },
              {
                key: 'channel',
                label: 'Kênh',
                render: (v) => (
                  <span className="text-sm font-medium text-gray-800">
                    {channelLabels[v as Channel]}
                  </span>
                ),
              },
              { key: 'orders', label: 'Số đơn' },
              { key: 'items', label: 'SL sản phẩm' },
              {
                key: 'grossRevenue',
                label: 'Doanh thu gộp',
                render: (v) => `${Number(v).toLocaleString('vi-VN')} ₫`,
              },
              {
                key: 'discounts',
                label: 'Giảm giá',
                render: (v) => `${Number(v).toLocaleString('vi-VN')} ₫`,
              },
              {
                key: 'netRevenue',
                label: 'Doanh thu ròng',
                render: (v) => (
                  <span className="font-semibold text-gray-900">
                    {Number(v).toLocaleString('vi-VN')} ₫
                  </span>
                ),
              },
            ]}
          />
        )}
      </div>
    </div>
  )
}


