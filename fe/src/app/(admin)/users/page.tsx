'use client'

import { useEffect, useState } from 'react'
import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'
import { Input } from '@/shared/ui/Input'
import { DataTable } from '@/shared/ui/DataTable'
import Modal from '@/shared/ui/Modal'

type UserStatus = 'ACTIVE' | 'INACTIVE'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: UserStatus
  password?: string // demo only, không hiển thị ở UI
  createdAt: string
}

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mode, setMode] = useState<'create' | 'edit'>('create')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [role, setRole] = useState('STAFF')
  const [users, setUsers] = useState<User[]>([])

  // Load users demo từ localStorage khi mở trang
  useEffect(() => {
    if (typeof window === 'undefined') return
    const raw = window.localStorage.getItem('demo-users')
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as User[]
      setUsers(parsed)
    } catch {
      // ignore parse error
    }
  }, [])

  // Helper: sync state -> localStorage
  const syncUsers = (next: User[]) => {
    setUsers(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('demo-users', JSON.stringify(next))
    }
  }

  // Validate password
  const validatePassword = (pwd: string): string => {
    if (!pwd) return 'Mật khẩu là bắt buộc'
    
    if (pwd.length < 6) {
      return 'Mật khẩu phải có ít nhất 6 ký tự'
    }
    
    if (!/^[A-Z]/.test(pwd)) {
      return 'Mật khẩu phải bắt đầu bằng chữ cái viết hoa'
    }
    
    if (!/\d/.test(pwd)) {
      return 'Mật khẩu phải chứa ít nhất 1 chữ số'
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) {
      return 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt'
    }
    
    return ''
  }

  const handleOpenCreate = () => {
    setMode('create')
    setEditingId(null)
    setName('')
    setEmail('')
    setPassword('')
    setPasswordError('')
    setRole('STAFF')
    setIsModalOpen(true)
  }

  const handleCloseCreate = () => {
    setIsModalOpen(false)
    setName('')
    setEmail('')
    setPassword('')
    setPasswordError('')
    setRole('STAFF')
  }

  const handleEditClick = (user: User) => {
    setMode('edit')
    setEditingId(user.id)
    setName(user.name)
    setEmail(user.email)
    setPassword('')
    setPasswordError('')
    setRole(user.role)
    setIsModalOpen(true)
  }

  const handleStatusChange = (id: string, status: UserStatus) => {
    const next = users.map((u) => (u.id === id ? { ...u, status } : u))
    syncUsers(next)
  }

  const handleDeleteUser = (id: string) => {
    const next = users.filter((u) => u.id !== id)
    syncUsers(next)
  }

  const handleSubmitUser = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate password
    if (mode === 'create') {
      const pwdError = validatePassword(password)
      if (pwdError) {
        setPasswordError(pwdError)
        return
      }
    } else if (mode === 'edit' && password) {
      // Chỉ validate nếu có nhập password mới
      const pwdError = validatePassword(password)
      if (pwdError) {
        setPasswordError(pwdError)
        return
      }
    }

    setPasswordError('')

    if (mode === 'create') {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        status: 'ACTIVE',
        password,
        createdAt: new Date().toISOString(),
      }

      syncUsers([...users, newUser])
    } else if (mode === 'edit' && editingId) {
      const next = users.map((u) =>
        u.id === editingId
          ? {
              ...u,
              name,
              email,
              role,
              ...(password ? { password } : {}),
            }
          : u
      )
      syncUsers(next)
    }

    // TODO: tích hợp API tạo / update user, truyền password nếu có:
    // const payload = { name, email, role, ...(password ? { password } : {}) }

    handleCloseCreate()
  }

  const createUserButton = (
    <Button onClick={handleOpenCreate}>Create User</Button>
  )

  return (
    <div className="p-6">
      <PageHeader
        title="Users & Roles"
        subtitle="Manage system users and their permissions"
        actions={createUserButton}
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Users', href: '/admin/users' },
        ]}
      />

      <div className="card">
        {users.length === 0 ? (
          <EmptyState
            title="No Users"
            description="Create your first user account"
            action={createUserButton}
          />
        ) : (
          <DataTable
            data={users}
            columns={[
              {
                key: 'name',
                label: 'Name',
              },
              {
                key: 'email',
                label: 'Email',
              },
              {
                key: 'role',
                label: 'Role',
                render: (value) => {
                  const roleLabels: Record<string, string> = {
                    STORE_MANAGER: 'Store Manager',
                    WAREHOUSE_MANAGER: 'Warehouse Manager',
                    STAFF: 'Staff',
                    CUSTOMER: 'Customer',
                  }
                  return (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {roleLabels[value as string] || value}
                    </span>
                  )
                },
              },
              {
                key: 'status',
                label: 'Status',
                render: (value, item) => (
                  <select
                    className="px-2 py-1 text-xs border border-gray-300 rounded-md bg-white"
                    value={value as string}
                    onChange={(e) =>
                      handleStatusChange(
                        (item as User).id,
                        e.target.value as UserStatus
                      )
                    }
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                ),
              },
              {
                key: 'createdAt',
                label: 'Created At',
                render: (value) => {
                  return new Date(value as string).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                },
              },
              {
                key: 'id',
                label: 'Actions',
                render: (_value, item) => {
                  const user = item as User
                  return (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditClick(user)
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteUser(user.id)
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseCreate}
        title={mode === 'create' ? 'Create User' : 'Edit User'}
        size="md"
        footer={(
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseCreate}>
              Cancel
            </Button>
            <Button onClick={handleSubmitUser}>
              Save
            </Button>
          </div>
        )}
      >
        <form className="space-y-4" onSubmit={handleSubmitUser}>
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nguyễn Văn A"
            required
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            required
          />
          <div>
            <Input
              label={mode === 'create' ? 'Password' : 'New Password (optional)'}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (passwordError) {
                  setPasswordError('')
                }
              }}
              placeholder={mode === 'create' ? '••••••••' : 'Leave blank to keep current password'}
              required={mode === 'create'}
              className={passwordError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
            />
            {passwordError && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}
            {!passwordError && password && (
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <p className="font-medium">Yêu cầu mật khẩu:</p>
                <ul className="list-disc list-inside space-y-0.5 ml-2">
                  <li className={password.length >= 6 ? 'text-green-600' : 'text-gray-500'}>
                    Độ dài từ 6 ký tự trở lên {password.length >= 6 ? '✓' : ''}
                  </li>
                  <li className={/^[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-500'}>
                    Bắt đầu bằng chữ cái viết hoa {/^[A-Z]/.test(password) ? '✓' : ''}
                  </li>
                  <li className={/\d/.test(password) ? 'text-green-600' : 'text-gray-500'}>
                    Có ít nhất 1 chữ số {/\d/.test(password) ? '✓' : ''}
                  </li>
                  <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? 'text-green-600' : 'text-gray-500'}>
                    Có ít nhất 1 ký tự đặc biệt {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? '✓' : ''}
                  </li>
                </ul>
              </div>
            )}
            {!password && mode === 'create' && (
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <p className="font-medium">Yêu cầu mật khẩu:</p>
                <ul className="list-disc list-inside space-y-0.5 ml-2">
                  <li>Độ dài từ 6 ký tự trở lên</li>
                  <li>Bắt đầu bằng chữ cái viết hoa</li>
                  <li>Có ít nhất 1 chữ số</li>
                  <li>Có ít nhất 1 ký tự đặc biệt</li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="STORE_MANAGER">Store Manager</option>
              <option value="WAREHOUSE_MANAGER">Warehouse Manager</option>
              <option value="STAFF">Staff</option>
              <option value="CUSTOMER">Customer</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  )
}
