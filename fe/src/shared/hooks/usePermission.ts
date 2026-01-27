import { useAuth } from './useAuth'
import { Permission } from '@/shared/types'

/**
 * Custom hook to check if current user has specific permission(s)
 * @param permission - Single permission or array of permissions to check
 * @param requireAll - If true, user must have all permissions. If false (default), user needs at least one.
 * @returns boolean indicating if user has required permission(s)
 */
export function usePermission(
  permission: Permission | Permission[],
  requireAll = false
): boolean {
  const { hasPermission } = useAuth()

  if (Array.isArray(permission)) {
    if (requireAll) {
      return permission.every((perm) => hasPermission(perm))
    }
    return permission.some((perm) => hasPermission(perm))
  }

  return hasPermission(permission)
}
