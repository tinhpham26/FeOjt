'use client'

import { useEffect, useState } from 'react'
import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'
import { Input } from '@/shared/ui/Input'
import { DataTable } from '@/shared/ui/DataTable'
import Modal from '@/shared/ui/Modal'

interface OnlineOrder {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  customerPhone: string
  customerEmail: string
  items: OrderItem[]
  totalAmount: number
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  address: string
  description: string
  storeId: string
  storeName: string
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
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-purple-100 text-purple-800',
  SHIPPED: 'bg-indigo-100 text-indigo-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

export default function AdminOnlineOrdersPage() {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<OnlineOrder | null>(null)
  const [newStatus, setNewStatus] = useState<OnlineOrder['status']>('PENDING')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [orders, setOrders] = useState<OnlineOrder[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const raw = window.localStorage.getItem('demo-online-orders')
    if (!raw) {
      const sampleOrders: OnlineOrder[] = [
        {
          id: 'order-1',
          orderNumber: 'ORD-2024-001',
          customerId: 'cust-1',
          customerName: 'Nguyễn Văn A',
          customerPhone: '0901234567',
          customerEmail: 'nguyenvana@example.com',
          items: [
            {
              productId: 'prod-1',
              productName: 'Gạo ST25',
              sku: 'RICE-ST25-001',
              quantity: 2,
              price: 150000,
              subtotal: 300000,
            },
            {
              productId: 'prod-2',
              productName: 'Sữa tươi Vinamilk',
              sku: 'MILK-VNM-001',
              quantity: 3,
              price: 30000,
              subtotal: 90000,
            },
          ],
          totalAmount: 390000,
          status: 'PENDING',
          address: '123 Đường ABC, Quận 1, TP.HCM',
          description: 'Giao hàng trong giờ hành chính',
          storeId: 'store-1',
          storeName: 'BHX Quận 1',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'order-2',
          orderNumber: 'ORD-2024-002',
          customerId: 'cust-2',
          customerName: 'Trần Thị B',
          customerPhone: '0907654321',
          customerEmail: 'tranthib@example.com',
          items: [
            {
              productId: 'prod-3',
              productName: 'Thịt heo ba chỉ',
              sku: 'MEAT-PORK-001',
              quantity: 1,
              price: 120000,
              subtotal: 120000,
            },
          ],
          totalAmount: 120000,
          status: 'CONFIRMED',
          address: '456 Đường XYZ, Quận 2, TP.HCM',
          description: '',
          storeId: 'store-1',
          storeName: 'BHX Quận 1',
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        },
      ]
      setOrders(sampleOrders)
      window.localStorage.setItem('demo-online-orders', JSON.stringify(sampleOrders))
      return
    }

    try {
      const parsed = JSON.parse(raw) as OnlineOrder[]
      setOrders(parsed)
    } catch {
      setOrders([])
    }
  }, [])

  const handleViewDetail = (order: OnlineOrder) => {
    setSelectedOrder(order)
    setIsDetailModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedOrder(null)
  }

  const handleOpenStatusModal = (order: OnlineOrder) => {
    setSelectedOrder(order)
    setNewStatus(order.status)
    setIsStatusModalOpen(true)
  }

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false)
    setSelectedOrder(null)
  }

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOrder) return

    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order
    )
    setOrders(updatedOrders)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('demo-online-orders', JSON.stringify(updatedOrders))
    }
    handleCloseStatusModal()
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === 'all' || order.status === filterStatus

    const orderDate = new Date(order.createdAt)
    const matchesDateFrom = !dateFrom || orderDate >= new Date(dateFrom)
    const matchesDateTo = !dateTo || orderDate <= new Date(dateTo + 'T23:59:59')

    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo
  })

  const sortedOrders = [...filteredOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="p-6">
      <PageHeader
        title="Online Orders"
        subtitle="Manage and track all online customer orders"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Orders', href: '/admin/orders' },
          { label: 'Online Orders', href: '/admin/orders/online' },
        ]}
      />

      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <Input
              placeholder="Search by order number, customer name, phone, or email..."
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
              {Object.entries(statusLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="flex-1" />
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="flex-1" />
          </div>
        </div>
      </div>

      <div className="card">
        {sortedOrders.length === 0 ? (
          <EmptyState title="No Online Orders" description="No online orders found" />
        ) : (
          <DataTable
            data={sortedOrders}
            columns={[
              { key: 'orderNumber', label: 'Order Number' },
              {
                key: 'customerName',
                label: 'Customer',
                render: (_value, item) => {
                  const order = item as OnlineOrder
                  return (
                    <div>
                      <div className="font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-xs text-gray-500">{order.customerPhone}</div>
                      <div className="text-xs text-gray-500">{order.customerEmail}</div>
                    </div>
                  )
                },
              },
              {
                key: 'totalAmount',
                label: 'Total Amount',
                render: (value) => (
                  <span className="font-semibold text-gray-900">{Number(value).toLocaleString('vi-VN')} ₫</span>
                ),
              },
              {
                key: 'status',
                label: 'Status',
                render: (value) => {
                  const status = value as OnlineOrder['status']
                  return (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
                      {statusLabels[status]}
                    </span>
                  )
                },
              },
              {
                key: 'id',
                label: 'Actions',
                render: (_value, item) => {
                  const order = item as OnlineOrder
                  return (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewDetail(order)}>
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleOpenStatusModal(order)}>
                        Update Status
                      </Button>
                    </div>
                  )
                },
              },
            ]}
          />
        )}
      </div>

      <Modal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        title={`Order Details: ${selectedOrder?.orderNumber || ''}`}
        size="lg"
        footer={
          <div className="flex justify-end">
            <Button variant="secondary" onClick={handleCloseDetailModal}>
              Close
            </Button>
          </div>
        }
      >
        {selectedOrder ? (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Customer</div>
              <div className="font-semibold text-gray-900">{selectedOrder.customerName}</div>
              <div className="text-sm text-gray-600 mt-1">{selectedOrder.customerPhone}</div>
              <div className="text-sm text-gray-600">{selectedOrder.customerEmail}</div>
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

      <Modal
        isOpen={isStatusModalOpen}
        onClose={handleCloseStatusModal}
        title="Update Order Status"
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseStatusModal}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus}>Update Status</Button>
          </div>
        }
      >
        {selectedOrder ? (
          <form className="space-y-4" onSubmit={handleUpdateStatus}>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Order Number</div>
              <div className="font-semibold text-gray-900">{selectedOrder.orderNumber}</div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">New Status</label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as OnlineOrder['status'])}
              >
                {Object.entries(statusLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </form>
        ) : null}
      </Modal>
    </div>
  )
}

