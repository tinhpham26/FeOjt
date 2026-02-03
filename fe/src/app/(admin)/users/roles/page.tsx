'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { DataTable } from '@/shared/ui/DataTable'
import Modal from '@/shared/ui/Modal'
import { rolePermissions, modulePermissions } from '@/shared/auth/permission-map'
import type { UserRole, Permission } from '@/shared/types'

interface Role {
  id: UserRole
  name: string
  description: string
  permissions: Permission[]
  userCount: number
}

const roleLabels: Record<UserRole, string> = {
  ADMIN: 'Administrator',
  STORE_MANAGER: 'Store Manager',
  WAREHOUSE_MANAGER: 'Warehouse Manager',
  STAFF: 'Staff',
  CUSTOMER: 'Customer',
}

const roleDescriptions: Record<UserRole, string> = {
  ADMIN: 'Full system access and management',
  STORE_MANAGER: 'Manage store operations and orders',
  WAREHOUSE_MANAGER: 'Manage warehouse inventory',
  STAFF: 'Basic staff access',
  CUSTOMER: 'Customer portal access',
}

export default function RolesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<UserRole | null>(null)
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([])
  const [roles, setRoles] = useState<Role[]>([])

  // Load roles và permissions từ permission-map
  useEffect(() => {
    const loadRoles = () => {
      const roleList: Role[] = Object.keys(rolePermissions).map((roleKey) => {
        const role = roleKey as UserRole
        // Đếm số user có role này từ localStorage (demo)
        let userCount = 0
        if (typeof window !== 'undefined') {
          const raw = window.localStorage.getItem('demo-users')
          if (raw) {
            try {
              const users = JSON.parse(raw) as Array<{ role: string }>
              userCount = users.filter((u) => u.role === role).length
            } catch {
              // ignore
            }
          }
        }

        return {
          id: role,
          name: roleLabels[role],
          description: roleDescriptions[role],
          permissions: rolePermissions[role],
          userCount,
        }
      })
      setRoles(roleList)
    }

    loadRoles()
  }, [])

  const handleEditRole = (role: Role) => {
    setEditingRole(role.id)
    setSelectedPermissions([...role.permissions])
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingRole(null)
    setSelectedPermissions([])
  }

  const togglePermission = (permission: Permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    )
  }

  const handleSaveRole = () => {
    if (!editingRole) return

    // Update role permissions trong state
    setRoles((prev) =>
      prev.map((r) =>
        r.id === editingRole
          ? { ...r, permissions: selectedPermissions }
          : r
      )
    )

    // TODO: Gọi API để update permissions cho role
    // await axiosInstance.put(`/iam/roles/${editingRole}/permissions`, { permissions: selectedPermissions })

    handleCloseModal()
  }

  const allPermissions = Object.values(modulePermissions).flat()
  const uniquePermissions = Array.from(new Set(allPermissions)).sort()

  // Group permissions by module
  const permissionsByModule = Object.entries(modulePermissions).map(([module, perms]) => ({
    module,
    permissions: perms,
  }))

  return (
    <div className="p-6">
      <PageHeader
        title="Roles & Permissions"
        subtitle="Manage system roles and their access permissions"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Users', href: '/admin/users' },
          { label: 'Roles', href: '/admin/users/roles' },
        ]}
      />

      <div className="card">
        <DataTable
          data={roles}
          columns={[
            {
              key: 'name',
              label: 'Role Name',
              render: (value, item) => {
                const role = item as Role
                return (
                  <div>
                    <div className="font-semibold text-gray-900">{value}</div>
                    <div className="text-sm text-gray-500">{role.description}</div>
                  </div>
                )
              },
            },
            {
              key: 'permissions',
              label: 'Permissions',
              render: (value) => {
                const perms = value as Permission[]
                return (
                  <div className="flex flex-wrap gap-1">
                    {perms.length > 0 ? (
                      perms.slice(0, 3).map((perm) => (
                        <span
                          key={perm}
                          className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                        >
                          {perm.replace('_', ' ')}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">No permissions</span>
                    )}
                    {perms.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                        +{perms.length - 3} more
                      </span>
                    )}
                  </div>
                )
              },
            },
            {
              key: 'userCount',
              label: 'Users',
              render: (value) => (
                <span className="text-sm font-medium text-gray-700">{value as number}</span>
              ),
            },
            {
              key: 'id',
              label: 'Actions',
              render: (_value, item) => {
                const role = item as Role
                return (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditRole(role)}
                  >
                    Edit Permissions
                  </Button>
                )
              },
            },
          ]}
        />
      </div>

      {/* Edit Permissions Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Edit Permissions: ${editingRole ? roleLabels[editingRole] : ''}`}
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSaveRole}>Save Changes</Button>
          </div>
        }
      >
        {editingRole && (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Select the permissions for this role. Changes will affect all users with this role.
              </p>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {permissionsByModule.map(({ module, permissions }) => (
                <div key={module} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 capitalize">
                    {module.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="space-y-2">
                    {permissions.map((permission) => {
                      const isChecked = selectedPermissions.includes(permission)
                      return (
                        <label
                          key={permission}
                          className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => togglePermission(permission)}
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">
                            {permission.replace('_', ' ')}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Permissions:</span>
                <span className="font-semibold text-gray-900">
                  {selectedPermissions.length} / {uniquePermissions.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

