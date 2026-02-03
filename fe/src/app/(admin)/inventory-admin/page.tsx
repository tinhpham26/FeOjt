'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'
import { Input } from '@/shared/ui/Input'
import { DataTable } from '@/shared/ui/DataTable'
import Modal from '@/shared/ui/Modal'

interface InventoryItem {
  id: string
  sku: string
  productName: string
  locationType: 'WAREHOUSE' | 'STORE'
  locationName: string
  quantity: number
  minStock: number
  maxStock: number
  lastUpdated: string
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'
}

const statusLabels = {
  IN_STOCK: 'In Stock',
  LOW_STOCK: 'Low Stock',
  OUT_OF_STOCK: 'Out of Stock',
}

const statusColors = {
  IN_STOCK: 'bg-green-100 text-green-800',
  LOW_STOCK: 'bg-yellow-100 text-yellow-800',
  OUT_OF_STOCK: 'bg-red-100 text-red-800',
}

export default function InventoryOverviewPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mode, setMode] = useState<'create' | 'edit'>('create')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [sku, setSku] = useState('')
  const [productName, setProductName] = useState('')
  const [locationType, setLocationType] = useState<'WAREHOUSE' | 'STORE'>('WAREHOUSE')
  const [locationName, setLocationName] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [minStock, setMinStock] = useState(0)
  const [maxStock, setMaxStock] = useState(0)
  const [inventory, setInventory] = useState<InventoryItem[]>([])

  // Load inventory từ localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    const raw = window.localStorage.getItem('demo-inventory')
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as InventoryItem[]
      setInventory(parsed)
    } catch {
      // ignore parse error
    }
  }, [])

  const syncInventory = (next: InventoryItem[]) => {
    setInventory(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('demo-inventory', JSON.stringify(next))
    }
  }

  const calculateStatus = (qty: number, min: number): InventoryItem['status'] => {
    if (qty === 0) return 'OUT_OF_STOCK'
    if (qty <= min) return 'LOW_STOCK'
    return 'IN_STOCK'
  }

  const handleOpenCreate = () => {
    setMode('create')
    setEditingId(null)
    setSku('')
    setProductName('')
    setLocationType('WAREHOUSE')
    setLocationName('')
    setQuantity(0)
    setMinStock(0)
    setMaxStock(0)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSku('')
    setProductName('')
    setLocationType('WAREHOUSE')
    setLocationName('')
    setQuantity(0)
    setMinStock(0)
    setMaxStock(0)
    setEditingId(null)
  }

  const handleEditClick = (item: InventoryItem) => {
    setMode('edit')
    setEditingId(item.id)
    setSku(item.sku)
    setProductName(item.productName)
    setLocationType(item.locationType)
    setLocationName(item.locationName)
    setQuantity(item.quantity)
    setMinStock(item.minStock)
    setMaxStock(item.maxStock)
    setIsModalOpen(true)
  }

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this inventory item?')) {
      syncInventory(inventory.filter((item) => item.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === 'create') {
      const newItem: InventoryItem = {
        id: `inv-${Date.now()}`,
        sku,
        productName,
        locationType,
        locationName,
        quantity,
        minStock,
        maxStock,
        lastUpdated: new Date().toISOString(),
        status: calculateStatus(quantity, minStock),
      }
      syncInventory([...inventory, newItem])
    } else if (mode === 'edit' && editingId) {
      syncInventory(
        inventory.map((item) =>
          item.id === editingId
            ? {
                ...item,
                sku,
                productName,
                locationType,
                locationName,
                quantity,
                minStock,
                maxStock,
                lastUpdated: new Date().toISOString(),
                status: calculateStatus(quantity, minStock),
              }
            : item
        )
      )
    }

    // TODO: Gọi API để lưu inventory
    // await axiosInstance.post('/inventory', newItem)

    handleCloseModal()
  }

  const createButton = (
    <Button onClick={handleOpenCreate}>Add Inventory</Button>
  )

  return (
    <div className="p-6">
      <PageHeader
        title="Inventory Overview"
        subtitle="Manage stock levels and inventory across warehouses and stores"
        actions={createButton}
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Kho & Tồn kho', href: '/admin/inventory' },
          { label: 'Inventory Overview', href: '/admin/inventory' },
        ]}
      />

      <div className="card">
        {inventory.length === 0 ? (
          <EmptyState
            title="No Inventory Records"
            description="Start tracking inventory for your products"
            action={createButton}
          />
        ) : (
          <DataTable
            data={inventory}
            columns={[
              {
                key: 'sku',
                label: 'SKU',
              },
              {
                key: 'productName',
                label: 'Product Name',
              },
              {
                key: 'locationType',
                label: 'Location',
                render: (value, item) => {
                  const inv = item as InventoryItem
                  return (
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {inv.locationName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {inv.locationType === 'WAREHOUSE' ? 'Warehouse' : 'Store'}
                      </div>
                    </div>
                  )
                },
              },
              {
                key: 'quantity',
                label: 'Quantity',
                render: (value, item) => {
                  const inv = item as InventoryItem
                  return (
                    <div>
                      <span className="font-semibold text-gray-900">{value}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        (Min: {inv.minStock}, Max: {inv.maxStock})
                      </span>
                    </div>
                  )
                },
              },
              {
                key: 'status',
                label: 'Status',
                render: (value) => {
                  const status = value as InventoryItem['status']
                  return (
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}
                    >
                      {statusLabels[status]}
                    </span>
                  )
                },
              },
              {
                key: 'lastUpdated',
                label: 'Last Updated',
                render: (value) => {
                  return new Date(value as string).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                },
              },
              {
                key: 'id',
                label: 'Actions',
                render: (_value, item) => {
                  const inv = item as InventoryItem
                  return (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditClick(inv)
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteItem(inv.id)
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  )
                },
              },
            ]}
          />
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={mode === 'create' ? 'Add Inventory Item' : 'Edit Inventory Item'}
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="PROD-001"
            required
          />
          <Input
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product name"
            required
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Location Type</label>
            <select
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              value={locationType}
              onChange={(e) => setLocationType(e.target.value as 'WAREHOUSE' | 'STORE')}
            >
              <option value="WAREHOUSE">Warehouse</option>
              <option value="STORE">Store</option>
            </select>
          </div>
          <Input
            label="Location Name"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Warehouse A / Store 1"
            required
          />
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="0"
              required
              min={0}
            />
            <Input
              label="Min Stock"
              type="number"
              value={minStock}
              onChange={(e) => setMinStock(Number(e.target.value))}
              placeholder="0"
              required
              min={0}
            />
            <Input
              label="Max Stock"
              type="number"
              value={maxStock}
              onChange={(e) => setMaxStock(Number(e.target.value))}
              placeholder="0"
              required
              min={0}
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}

