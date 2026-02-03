'use client'

import { useEffect, useState } from 'react'
import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'
import { Input } from '@/shared/ui/Input'
import { DataTable } from '@/shared/ui/DataTable'
import Modal from '@/shared/ui/Modal'

interface POSOrder {
  id: string
  orderNumber: string
  customerId?: string
  customerName?: string
  customerPhone?: string
  items: OrderItem[]
  totalAmount: number
  paymentMethod: 'CASH' | 'CARD' | 'MOMO' | 'ZALOPAY' | 'BANK_TRANSFER'
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED'
  status: 'COMPLETED' | 'CANCELLED' | 'REFUNDED'
  storeId: string
  storeName: string
  staffId: string
  staffName: string
  createdAt: string
  updatedAt: string
}

interface OrderItem {
  productId: string
  productName: string
  sku: string
  quantity: number
  price: number
  subtotal: number
}

const statusLabels = {
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded',
}

const statusColors = {
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  REFUNDED: 'bg-orange-100 text-orange-800',
}

const paymentMethodLabels = {
  CASH: 'Cash',
  CARD: 'Card',
  MOMO: 'MoMo',
  ZALOPAY: 'ZaloPay',
  BANK_TRANSFER: 'Bank Transfer',
}

const paymentStatusLabels = {
  PENDING: 'Pending',
  PAID: 'Paid',
  REFUNDED: 'Refunded',
}

const paymentStatusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PAID: 'bg-green-100 text-green-800',
  REFUNDED: 'bg-red-100 text-red-800',
}

export default function AdminPOSOrdersPage() {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<POSOrder | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<string>('all')
  const [orders, setOrders] = useState<POSOrder[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const raw = window.localStorage.getItem('demo-pos-orders')
    if (!raw) {
      const sampleOrders: POSOrder[] = [
        {
          id: 'pos-order-1',
          orderNumber: 'POS-2024-001',
          customerName: 'Walk-in Customer',
          customerPhone: 'N/A',
          items: [
            { productId: 'prod-1', productName: 'Gạo ST25', sku: 'RICE-ST25-001', quantity: 1, price: 150000, subtotal: 150000 },
          ],
          totalAmount: 150000,
          paymentMethod: 'CASH',
          paymentStatus: 'PAID',
          status: 'COMPLETED',
          storeId: 'store-1',
          storeName: 'BHX Quận 1',
          staffId: 'staff-1',
          staffName: 'Store Staff',
          createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        },
      ]
      setOrders(sampleOrders)
      window.localStorage.setItem('demo-pos-orders', JSON.stringify(sampleOrders))
      return
    }
    try {
      setOrders(JSON.parse(raw) as POSOrder[])
    } catch {
      setOrders([])
    }
  }, [])

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.customerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.customerPhone || '').includes(searchQuery) ||
      o.staffName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus
    const matchesPay = filterPaymentStatus === 'all' || o.paymentStatus === filterPaymentStatus
    return matchesSearch && matchesStatus && matchesPay
  })

  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="p-6">
      <PageHeader
        title="POS Orders"
        subtitle="Manage and track all point-of-sale orders from stores"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Orders', href: '/admin/orders' },
          { label: 'POS Orders', href: '/admin/orders/pos' },
        ]}
      />

      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <Input
              placeholder="Search by order number, customer, phone, or staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <select
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              {Object.entries(statusLabels).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              value={filterPaymentStatus}
              onChange={(e) => setFilterPaymentStatus(e.target.value)}
            >
              <option value="all">All Payment</option>
              {Object.entries(paymentStatusLabels).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        {sorted.length === 0 ? (
          <EmptyState title="No POS Orders" description="No POS orders found" />
        ) : (
          <DataTable
            data={sorted}
            columns={[
              { key: 'orderNumber', label: 'Order Number' },
              { key: 'customerName', label: 'Customer' },
              {
                key: 'paymentMethod',
                label: 'Payment',
                render: (_v, item) => {
                  const o = item as POSOrder
                  return (
                    <div>
                      <div className="text-sm font-medium text-gray-900">{paymentMethodLabels[o.paymentMethod]}</div>
                      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${paymentStatusColors[o.paymentStatus]}`}>
                        {paymentStatusLabels[o.paymentStatus]}
                      </span>
                    </div>
                  )
                },
              },
              {
                key: 'totalAmount',
                label: 'Total',
                render: (v) => <span className="font-semibold text-gray-900">{Number(v).toLocaleString('vi-VN')} ₫</span>,
              },
              {
                key: 'status',
                label: 'Status',
                render: (v) => {
                  const s = v as POSOrder['status']
                  return <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[s]}`}>{statusLabels[s]}</span>
                },
              },
              {
                key: 'id',
                label: 'Actions',
                render: (_v, item) => {
                  const o = item as POSOrder
                  return (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedOrder(o)
                        setIsDetailModalOpen(true)
                      }}
                    >
                      View Details
                    </Button>
                  )
                },
              },
            ]}
          />
        )}
      </div>

      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={`POS Order Details: ${selectedOrder?.orderNumber || ''}`}
        size="lg"
        footer={
          <div className="flex justify-end">
            <Button variant="secondary" onClick={() => setIsDetailModalOpen(false)}>
              Close
            </Button>
          </div>
        }
      >
        {selectedOrder ? (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Customer</div>
              <div className="font-semibold text-gray-900">{selectedOrder.customerName || 'Walk-in Customer'}</div>
              {selectedOrder.customerPhone ? <div className="text-sm text-gray-600 mt-1">{selectedOrder.customerPhone}</div> : null}
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="font-semibold text-gray-900 mb-2">Items</div>
              <div className="space-y-2">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <div className="text-gray-900">
                      {it.productName} <span className="text-gray-500">({it.sku})</span>
                    </div>
                    <div className="text-gray-700">
                      {it.quantity} × {it.price.toLocaleString('vi-VN')} ₫
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-gray-900">{selectedOrder.totalAmount.toLocaleString('vi-VN')} ₫</span>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}

