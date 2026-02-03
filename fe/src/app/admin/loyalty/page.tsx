'use client'

import { useEffect, useMemo, useState } from 'react'
import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'
import { Input } from '@/shared/ui/Input'
import { DataTable } from '@/shared/ui/DataTable'
import Modal from '@/shared/ui/Modal'

type LoyaltyTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM'
type TxType = 'EARN' | 'REDEEM' | 'ADJUST'

interface LoyaltyCustomer extends Record<string, unknown> {
  id: string
  customerId: string
  fullName: string
  email: string
  phone: string
  tier: LoyaltyTier
  points: number
  lifetimePoints: number
  lastActivityAt: string
  createdAt: string
}

interface LoyaltyTransaction extends Record<string, unknown> {
  id: string
  customerId: string
  customerName: string
  type: TxType
  pointsChange: number
  reason: string
  reference?: string
  createdBy: string
  createdAt: string
}

const tierLabels: Record<LoyaltyTier, string> = {
  BRONZE: 'Bronze',
  SILVER: 'Silver',
  GOLD: 'Gold',
  PLATINUM: 'Platinum',
}

const tierColors: Record<LoyaltyTier, string> = {
  BRONZE: 'bg-amber-100 text-amber-800',
  SILVER: 'bg-gray-100 text-gray-800',
  GOLD: 'bg-yellow-100 text-yellow-800',
  PLATINUM: 'bg-indigo-100 text-indigo-800',
}

const txLabels: Record<TxType, string> = {
  EARN: 'Earn',
  REDEEM: 'Redeem',
  ADJUST: 'Adjust',
}

const txColors: Record<TxType, string> = {
  EARN: 'bg-green-100 text-green-800',
  REDEEM: 'bg-red-100 text-red-800',
  ADJUST: 'bg-blue-100 text-blue-800',
}

function calcTier(points: number): LoyaltyTier {
  if (points >= 5000) return 'PLATINUM'
  if (points >= 2000) return 'GOLD'
  if (points >= 500) return 'SILVER'
  return 'BRONZE'
}

export default function AdminLoyaltyPage() {
  const [customers, setCustomers] = useState<LoyaltyCustomer[]>([])
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([])

  const [query, setQuery] = useState('')
  const [filterTier, setFilterTier] = useState<'all' | LoyaltyTier>('all')

  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false)
  const [isTxModalOpen, setIsTxModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<LoyaltyCustomer | null>(null)

  const [adjustType, setAdjustType] = useState<'ADD' | 'SUBTRACT'>('ADD')
  const [adjustPoints, setAdjustPoints] = useState(0)
  const [adjustReason, setAdjustReason] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const rawCust = window.localStorage.getItem('demo-loyalty-customers')
    const rawTx = window.localStorage.getItem('demo-loyalty-transactions')

    if (!rawCust) {
      const seedCustomers: LoyaltyCustomer[] = [
        {
          id: 'loy-1',
          customerId: 'cust-1',
          fullName: 'Nguyễn Văn A',
          email: 'customer@bhx.vn',
          phone: '0909000000',
          points: 120,
          lifetimePoints: 180,
          tier: calcTier(120),
          lastActivityAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'loy-2',
          customerId: 'cust-2',
          fullName: 'Trần Thị B',
          email: 'tranthib@bhx.vn',
          phone: '0908123456',
          points: 860,
          lifetimePoints: 1100,
          tier: calcTier(860),
          lastActivityAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'loy-3',
          customerId: 'cust-3',
          fullName: 'Lê Văn C',
          email: 'levanc@bhx.vn',
          phone: '0907555666',
          points: 2500,
          lifetimePoints: 3400,
          tier: calcTier(2500),
          lastActivityAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ]
      setCustomers(seedCustomers)
      window.localStorage.setItem('demo-loyalty-customers', JSON.stringify(seedCustomers))
    } else {
      try {
        setCustomers(JSON.parse(rawCust) as LoyaltyCustomer[])
      } catch {
        setCustomers([])
      }
    }

    if (!rawTx) {
      const seedTx: LoyaltyTransaction[] = [
        {
          id: 'tx-1',
          customerId: 'cust-1',
          customerName: 'Nguyễn Văn A',
          type: 'EARN',
          pointsChange: 80,
          reason: 'Order completed',
          reference: 'ORD-2024-001',
          createdBy: 'Admin',
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'tx-2',
          customerId: 'cust-1',
          customerName: 'Nguyễn Văn A',
          type: 'REDEEM',
          pointsChange: -40,
          reason: 'Redeem voucher',
          reference: 'VOUCHER-10K',
          createdBy: 'Admin',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'tx-3',
          customerId: 'cust-2',
          customerName: 'Trần Thị B',
          type: 'EARN',
          pointsChange: 120,
          reason: 'Order completed',
          reference: 'ORD-2024-002',
          createdBy: 'Admin',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ]
      setTransactions(seedTx)
      window.localStorage.setItem('demo-loyalty-transactions', JSON.stringify(seedTx))
    } else {
      try {
        setTransactions(JSON.parse(rawTx) as LoyaltyTransaction[])
      } catch {
        setTransactions([])
      }
    }
  }, [])

  const syncCustomers = (next: LoyaltyCustomer[]) => {
    setCustomers(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('demo-loyalty-customers', JSON.stringify(next))
    }
  }

  const syncTransactions = (next: LoyaltyTransaction[]) => {
    setTransactions(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('demo-loyalty-transactions', JSON.stringify(next))
    }
  }

  const filteredCustomers = useMemo(() => {
    const q = query.trim().toLowerCase()
    return customers.filter((c) => {
      const matchesQuery =
        !q ||
        c.fullName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
      const matchesTier = filterTier === 'all' || c.tier === filterTier
      return matchesQuery && matchesTier
    })
  }, [customers, query, filterTier])

  const totalCustomers = customers.length
  const totalPoints = customers.reduce((sum, c) => sum + c.points, 0)
  const goldPlus = customers.filter((c) => c.tier === 'GOLD' || c.tier === 'PLATINUM').length
  const active7d = customers.filter((c) => Date.now() - new Date(c.lastActivityAt).getTime() <= 7 * 24 * 60 * 60 * 1000).length

  const openAdjust = (c: LoyaltyCustomer) => {
    setSelectedCustomer(c)
    setAdjustType('ADD')
    setAdjustPoints(0)
    setAdjustReason('')
    setIsAdjustModalOpen(true)
  }

  const openTx = (c: LoyaltyCustomer) => {
    setSelectedCustomer(c)
    setIsTxModalOpen(true)
  }

  const closeAdjust = () => {
    setIsAdjustModalOpen(false)
    setSelectedCustomer(null)
  }

  const closeTx = () => {
    setIsTxModalOpen(false)
    setSelectedCustomer(null)
  }

  const handleAdjust = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCustomer) return
    if (!adjustReason.trim()) return
    if (adjustPoints <= 0) return

    const delta = adjustType === 'ADD' ? adjustPoints : -adjustPoints
    const nextCustomers = customers.map((c) => {
      if (c.customerId !== selectedCustomer.customerId) return c
      const nextPoints = Math.max(0, c.points + delta)
      return {
        ...c,
        points: nextPoints,
        lifetimePoints: delta > 0 ? c.lifetimePoints + delta : c.lifetimePoints,
        tier: calcTier(nextPoints),
        lastActivityAt: new Date().toISOString(),
      }
    })
    syncCustomers(nextCustomers)

    const tx: LoyaltyTransaction = {
      id: `tx-${Date.now()}`,
      customerId: selectedCustomer.customerId,
      customerName: selectedCustomer.fullName,
      type: 'ADJUST',
      pointsChange: delta,
      reason: adjustReason,
      createdBy: 'Admin',
      createdAt: new Date().toISOString(),
    }
    syncTransactions([tx, ...transactions])

    closeAdjust()
  }

  const txForSelected = useMemo(() => {
    if (!selectedCustomer) return []
    return transactions
      .filter((t) => t.customerId === selectedCustomer.customerId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [transactions, selectedCustomer])

  return (
    <div className="p-6">
      <PageHeader
        title="Loyalty & Points"
        subtitle="Manage loyalty members, points balance, and point transactions"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Loyalty', href: '/admin/loyalty' },
        ]}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card p-4 border-l-4 border-blue-500">
          <div className="text-sm text-gray-600">Members</div>
          <div className="text-2xl font-bold text-blue-600">{totalCustomers}</div>
          <div className="text-xs text-gray-500">Total loyalty members</div>
        </div>
        <div className="card p-4 border-l-4 border-emerald-500">
          <div className="text-sm text-gray-600">Total Points</div>
          <div className="text-2xl font-bold text-emerald-600">{totalPoints.toLocaleString('vi-VN')}</div>
          <div className="text-xs text-gray-500">Current balance across members</div>
        </div>
        <div className="card p-4 border-l-4 border-yellow-500">
          <div className="text-sm text-gray-600">Gold+</div>
          <div className="text-2xl font-bold text-yellow-600">{goldPlus}</div>
          <div className="text-xs text-gray-500">Gold & Platinum members</div>
        </div>
        <div className="card p-4 border-l-4 border-purple-500">
          <div className="text-sm text-gray-600">Active (7d)</div>
          <div className="text-2xl font-bold text-purple-600">{active7d}</div>
          <div className="text-xs text-gray-500">Had activity in last 7 days</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name, email, phone..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-52">
            <select
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value as 'all' | LoyaltyTier)}
            >
              <option value="all">All Tiers</option>
              <option value="BRONZE">Bronze</option>
              <option value="SILVER">Silver</option>
              <option value="GOLD">Gold</option>
              <option value="PLATINUM">Platinum</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        {filteredCustomers.length === 0 ? (
          <EmptyState title="No Loyalty Members" description="No members match your filters." />
        ) : (
          <DataTable
            data={filteredCustomers}
            columns={[
              {
                key: 'fullName',
                label: 'Member',
                render: (_v, item) => {
                  const c = item as LoyaltyCustomer
                  return (
                    <div>
                      <div className="font-semibold text-gray-900">{c.fullName}</div>
                      <div className="text-xs text-gray-500">{c.email}</div>
                      <div className="text-xs text-gray-500">{c.phone}</div>
                    </div>
                  )
                },
              },
              {
                key: 'tier',
                label: 'Tier',
                render: (v) => {
                  const tier = v as LoyaltyTier
                  return (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${tierColors[tier]}`}>
                      {tierLabels[tier]}
                    </span>
                  )
                },
              },
              {
                key: 'points',
                label: 'Points',
                render: (v, item) => {
                  const c = item as LoyaltyCustomer
                  return (
                    <div>
                      <div className="font-semibold text-gray-900">{Number(v).toLocaleString('vi-VN')}</div>
                      <div className="text-xs text-gray-500">Lifetime: {c.lifetimePoints.toLocaleString('vi-VN')}</div>
                    </div>
                  )
                },
              },
              {
                key: 'lastActivityAt',
                label: 'Last Activity',
                render: (v) => new Date(v as string).toLocaleString('vi-VN'),
              },
              {
                key: 'id',
                label: 'Actions',
                render: (_v, item) => {
                  const c = item as LoyaltyCustomer
                  return (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openTx(c)}>
                        Transactions
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => openAdjust(c)}>
                        Adjust Points
                      </Button>
                    </div>
                  )
                },
              },
            ]}
          />
        )}
      </div>

      {/* Adjust Modal */}
      <Modal
        isOpen={isAdjustModalOpen}
        onClose={closeAdjust}
        title="Adjust Points"
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={closeAdjust}>
              Cancel
            </Button>
            <Button onClick={handleAdjust}>Apply</Button>
          </div>
        }
      >
        {selectedCustomer ? (
          <form className="space-y-4" onSubmit={handleAdjust}>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Member</div>
              <div className="font-semibold text-gray-900">{selectedCustomer.fullName}</div>
              <div className="text-sm text-gray-600 mt-1">
                Current Points: <span className="font-medium text-gray-900">{selectedCustomer.points.toLocaleString('vi-VN')}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Type</label>
                <select
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  value={adjustType}
                  onChange={(e) => setAdjustType(e.target.value as 'ADD' | 'SUBTRACT')}
                >
                  <option value="ADD">Add</option>
                  <option value="SUBTRACT">Subtract</option>
                </select>
              </div>
              <Input
                label="Points"
                type="number"
                value={adjustPoints}
                onChange={(e) => setAdjustPoints(Number(e.target.value))}
                required
                min={1}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Reason *</label>
              <textarea
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value)}
                placeholder="Enter reason..."
                rows={3}
                required
              />
            </div>
          </form>
        ) : null}
      </Modal>

      {/* Transactions Modal */}
      <Modal
        isOpen={isTxModalOpen}
        onClose={closeTx}
        title={`Point Transactions${selectedCustomer ? `: ${selectedCustomer.fullName}` : ''}`}
        size="lg"
        footer={
          <div className="flex justify-end">
            <Button variant="secondary" onClick={closeTx}>
              Close
            </Button>
          </div>
        }
      >
        {selectedCustomer ? (
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Current Points</div>
                  <div className="text-xl font-bold text-gray-900">{selectedCustomer.points.toLocaleString('vi-VN')}</div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${tierColors[selectedCustomer.tier]}`}>
                  {tierLabels[selectedCustomer.tier]}
                </span>
              </div>
            </div>

            {txForSelected.length === 0 ? (
              <EmptyState title="No Transactions" description="This member has no point transactions yet." />
            ) : (
              <DataTable
                data={txForSelected}
                columns={[
                  {
                    key: 'createdAt',
                    label: 'Time',
                    render: (v) => new Date(v as string).toLocaleString('vi-VN'),
                  },
                  {
                    key: 'type',
                    label: 'Type',
                    render: (v) => {
                      const t = v as TxType
                      return (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${txColors[t]}`}>
                          {txLabels[t]}
                        </span>
                      )
                    },
                  },
                  {
                    key: 'pointsChange',
                    label: 'Points',
                    render: (v) => {
                      const n = Number(v)
                      const isPos = n > 0
                      return (
                        <span className={`font-semibold ${isPos ? 'text-green-600' : 'text-red-600'}`}>
                          {isPos ? '+' : ''}
                          {n.toLocaleString('vi-VN')}
                        </span>
                      )
                    },
                  },
                  { key: 'reason', label: 'Reason' },
                  {
                    key: 'reference',
                    label: 'Ref',
                    render: (v) => <span className="text-sm text-gray-600">{(v as string) || '-'}</span>,
                  },
                  { key: 'createdBy', label: 'By' },
                ]}
              />
            )}

            <div className="text-xs text-gray-500">
              Demo data is stored in <span className="font-medium">localStorage</span> (`demo-loyalty-customers`, `demo-loyalty-transactions`).
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}


