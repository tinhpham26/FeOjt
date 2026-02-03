'use client'

import { useMemo, useState } from 'react'
import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { DataTable } from '@/shared/ui/DataTable'
import { EmptyState } from '@/shared/ui/EmptyState'

type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'OVERSTOCK'

interface InventoryReportRow extends Record<string, unknown> {
  id: string
  productCode: string
  productName: string
  category: string
  storeName: string
  warehouseName: string
  currentStock: number
  minStock: number
  maxStock: number
  inTransit: number
  reserved: number
  available: number
  stockValue: number
  lastRestocked: string
  status: StockStatus
}

const statusLabels: Record<StockStatus, string> = {
  IN_STOCK: 'Còn hàng',
  LOW_STOCK: 'Sắp hết',
  OUT_OF_STOCK: 'Hết hàng',
  OVERSTOCK: 'Tồn kho cao',
}

const statusColors: Record<StockStatus, string> = {
  IN_STOCK: 'bg-green-100 text-green-800',
  LOW_STOCK: 'bg-yellow-100 text-yellow-800',
  OUT_OF_STOCK: 'bg-red-100 text-red-800',
  OVERSTOCK: 'bg-blue-100 text-blue-800',
}

function calcStatus(current: number, min: number, max: number): StockStatus {
  if (current === 0) return 'OUT_OF_STOCK'
  if (current < min) return 'LOW_STOCK'
  if (current > max) return 'OVERSTOCK'
  return 'IN_STOCK'
}

export default function InventoryReportsPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | StockStatus>('all')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // Demo data
  const data: InventoryReportRow[] = useMemo(
    () => [
      {
        id: '1',
        productCode: 'SKU-001',
        productName: 'Gạo ST25 5kg',
        category: 'Thực phẩm khô',
        storeName: 'BHX Quận 1',
        warehouseName: 'Kho TpHCM',
        currentStock: 120,
        minStock: 50,
        maxStock: 200,
        inTransit: 30,
        reserved: 15,
        available: 105,
        stockValue: 18000000,
        lastRestocked: '2026-01-28',
        status: 'IN_STOCK',
      },
      {
        id: '2',
        productCode: 'SKU-002',
        productName: 'Nước mắm Nam Ngư 500ml',
        category: 'Gia vị',
        storeName: 'BHX Quận 1',
        warehouseName: 'Kho TpHCM',
        currentStock: 25,
        minStock: 40,
        maxStock: 150,
        inTransit: 50,
        reserved: 5,
        available: 20,
        stockValue: 625000,
        lastRestocked: '2026-01-25',
        status: 'LOW_STOCK',
      },
      {
        id: '3',
        productCode: 'SKU-003',
        productName: 'Dầu ăn Neptune 1L',
        category: 'Dầu ăn',
        storeName: 'BHX Quận 2',
        warehouseName: 'Kho TpHCM',
        currentStock: 0,
        minStock: 30,
        maxStock: 100,
        inTransit: 80,
        reserved: 0,
        available: 0,
        stockValue: 0,
        lastRestocked: '2026-01-15',
        status: 'OUT_OF_STOCK',
      },
      {
        id: '4',
        productCode: 'SKU-004',
        productName: 'Mì gói Hảo Hảo 30 gói',
        category: 'Thực phẩm khô',
        storeName: 'BHX Quận 3',
        warehouseName: 'Kho TpHCM',
        currentStock: 250,
        minStock: 50,
        maxStock: 150,
        inTransit: 0,
        reserved: 20,
        available: 230,
        stockValue: 25000000,
        lastRestocked: '2026-02-01',
        status: 'OVERSTOCK',
      },
      {
        id: '5',
        productCode: 'SKU-005',
        productName: 'Sữa tươi Vinamilk 1L',
        category: 'Sữa & Đồ uống',
        storeName: 'BHX Quận 1',
        warehouseName: 'Kho TpHCM',
        currentStock: 85,
        minStock: 60,
        maxStock: 120,
        inTransit: 40,
        reserved: 10,
        available: 75,
        stockValue: 2125000,
        lastRestocked: '2026-02-02',
        status: 'IN_STOCK',
      },
      {
        id: '6',
        productCode: 'SKU-006',
        productName: 'Trứng gà CP 10 quả',
        category: 'Thực phẩm tươi sống',
        storeName: 'BHX Quận 2',
        warehouseName: 'Kho TpHCM',
        currentStock: 15,
        minStock: 50,
        maxStock: 200,
        inTransit: 100,
        reserved: 5,
        available: 10,
        stockValue: 450000,
        lastRestocked: '2026-01-30',
        status: 'LOW_STOCK',
      },
    ],
    []
  )

  const filtered = useMemo(() => {
    return data.filter((row) => {
      const matchesStatus = statusFilter === 'all' || row.status === statusFilter
      const matchesCategory =
        !categoryFilter ||
        row.category.toLowerCase().includes(categoryFilter.toLowerCase())
      const matchesLocation =
        !locationFilter ||
        row.storeName.toLowerCase().includes(locationFilter.toLowerCase()) ||
        row.warehouseName.toLowerCase().includes(locationFilter.toLowerCase())
      const matchesSearch =
        !searchQuery ||
        row.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.productCode.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesStatus && matchesCategory && matchesLocation && matchesSearch
    })
  }, [data, statusFilter, categoryFilter, locationFilter, searchQuery])

  const totalValue = filtered.reduce((s, r) => s + r.stockValue, 0)
  const totalItems = filtered.reduce((s, r) => s + r.currentStock, 0)
  const lowStockCount = filtered.filter((r) => r.status === 'LOW_STOCK').length
  const outOfStockCount = filtered.filter((r) => r.status === 'OUT_OF_STOCK').length

  const categories = useMemo(() => {
    const cats = new Set(data.map((r) => r.category))
    return Array.from(cats).sort()
  }, [data])

  return (
    <div className="p-6">
      <PageHeader
        title="Inventory Reports"
        subtitle="Báo cáo tồn kho theo sản phẩm, cửa hàng và trạng thái"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Reports', href: '/admin/reports' },
          { label: 'Inventory Reports', href: '/admin/reports/inventory' },
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => alert('Export to PDF')}>
              📄 Export PDF
            </Button>
            <Button onClick={() => alert('Export to Excel')}>
              📊 Export Excel
            </Button>
          </div>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card p-4 border-l-4 border-blue-500">
          <div className="text-sm text-gray-600 mb-1">Tổng giá trị tồn kho</div>
          <div className="text-2xl font-bold text-blue-600">
            {totalValue.toLocaleString('vi-VN')} ₫
          </div>
          <div className="text-xs text-gray-500 mt-1">{filtered.length} sản phẩm</div>
        </div>
        <div className="card p-4 border-l-4 border-emerald-500">
          <div className="text-sm text-gray-600 mb-1">Tổng số lượng</div>
          <div className="text-2xl font-bold text-emerald-600">
            {totalItems.toLocaleString('vi-VN')}
          </div>
          <div className="text-xs text-gray-500 mt-1">Đơn vị</div>
        </div>
        <div className="card p-4 border-l-4 border-yellow-500">
          <div className="text-sm text-gray-600 mb-1">Sắp hết hàng</div>
          <div className="text-2xl font-bold text-yellow-600">{lowStockCount}</div>
          <div className="text-xs text-gray-500 mt-1">Cần bổ sung</div>
        </div>
        <div className="card p-4 border-l-4 border-red-500">
          <div className="text-sm text-gray-600 mb-1">Hết hàng</div>
          <div className="text-2xl font-bold text-red-600">{outOfStockCount}</div>
          <div className="text-xs text-gray-500 mt-1">Cần nhập khẩn</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Input
              placeholder="Tìm sản phẩm hoặc mã SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <select
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | StockStatus)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="IN_STOCK">Còn hàng</option>
              <option value="LOW_STOCK">Sắp hết</option>
              <option value="OUT_OF_STOCK">Hết hàng</option>
              <option value="OVERSTOCK">Tồn kho cao</option>
            </select>
          </div>
          <div>
            <select
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Input
              placeholder="Lọc theo địa điểm..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        {filtered.length === 0 ? (
          <EmptyState
            title="Không có dữ liệu"
            description="Không tìm thấy sản phẩm phù hợp với bộ lọc."
          />
        ) : (
          <DataTable
            data={filtered}
            columns={[
              {
                key: 'productCode',
                label: 'Mã SKU',
                render: (v) => <span className="font-mono text-sm">{v as string}</span>,
              },
              {
                key: 'productName',
                label: 'Sản phẩm',
                render: (v, item) => {
                  const row = item as InventoryReportRow
                  return (
                    <div>
                      <div className="font-semibold text-gray-900">{v as string}</div>
                      <div className="text-xs text-gray-500">{row.category}</div>
                    </div>
                  )
                },
              },
              {
                key: 'storeName',
                label: 'Địa điểm',
                render: (v, item) => {
                  const row = item as InventoryReportRow
                  return (
                    <div>
                      <div className="text-sm text-gray-900">{v as string}</div>
                      <div className="text-xs text-gray-500">{row.warehouseName}</div>
                    </div>
                  )
                },
              },
              {
                key: 'currentStock',
                label: 'Tồn kho',
                render: (v, item) => {
                  const row = item as InventoryReportRow
                  return (
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{v as number}</div>
                      <div className="text-xs text-gray-500">
                        Min: {row.minStock} / Max: {row.maxStock}
                      </div>
                    </div>
                  )
                },
              },
              {
                key: 'available',
                label: 'Khả dụng',
                render: (v, item) => {
                  const row = item as InventoryReportRow
                  return (
                    <div className="text-center">
                      <div className="font-medium text-emerald-700">{v as number}</div>
                      <div className="text-xs text-gray-500">
                        Đặt: {row.reserved} / Đang chuyển: {row.inTransit}
                      </div>
                    </div>
                  )
                },
              },
              {
                key: 'stockValue',
                label: 'Giá trị',
                render: (v) => (
                  <span className="font-medium text-gray-900">
                    {Number(v).toLocaleString('vi-VN')} ₫
                  </span>
                ),
              },
              {
                key: 'lastRestocked',
                label: 'Nhập gần nhất',
                render: (v) => (
                  <span className="text-sm text-gray-600">
                    {new Date(v as string).toLocaleDateString('vi-VN')}
                  </span>
                ),
              },
              {
                key: 'status',
                label: 'Trạng thái',
                render: (v) => {
                  const status = v as StockStatus
                  return (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
                      {statusLabels[status]}
                    </span>
                  )
                },
              },
            ]}
          />
        )}
      </div>

      {/* Stock Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Phân tích theo trạng thái
          </h3>
          <div className="space-y-3">
            {(['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'OVERSTOCK'] as StockStatus[]).map(
              (status) => {
                const count = data.filter((r) => r.status === status).length
                const percentage = ((count / data.length) * 100).toFixed(1)
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[status]}`}>
                        {statusLabels[status]}
                      </span>
                      <span className="text-sm text-gray-600">{count} sản phẩm</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{percentage}%</div>
                  </div>
                )
              }
            )}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top sản phẩm theo giá trị tồn
          </h3>
          <div className="space-y-3">
            {data
              .sort((a, b) => b.stockValue - a.stockValue)
              .slice(0, 5)
              .map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                    <div className="text-xs text-gray-500">
                      {item.currentStock} đơn vị - {item.storeName}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-blue-600">
                    {item.stockValue.toLocaleString('vi-VN')} ₫
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
