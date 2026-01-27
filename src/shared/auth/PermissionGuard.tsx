'use client'

import { ReactNode } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { Permission } from '@/shared/types'

interface PermissionGuardProps {
  children: ReactNode
  permission: Permission | Permission[]
  fallback?: ReactNode
  requireAll?: boolean
}

export function PermissionGuard({
  children,
  permission,
  fallback = null,
  requireAll = false,
}: PermissionGuardProps) {
  const { user } = useAuthStore()

  if (!user) {
    return fallback
  }

  const permissions = Array.isArray(permission) ? permission : [permission]

  const hasPermission = requireAll
    ? permissions.every((p) => user.permissions.includes(p))
    : permissions.some((p) => user.permissions.includes(p))

  if (!hasPermission) {
    return fallback
  }

  return <>{children}</>
}

interface ConditionalRenderProps {
  condition: boolean
  children: ReactNode
  fallback?: ReactNode
}

export function ConditionalRender({ condition, children, fallback = null }: ConditionalRenderProps) {
  return condition ? <>{children}</> : fallback
}

export default PermissionGuard
