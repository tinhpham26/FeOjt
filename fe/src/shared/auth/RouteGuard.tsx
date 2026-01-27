'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import { UserRole } from '@/shared/types'
import Link from 'next/link'

interface RouteGuardProps {
  children: ReactNode
  allowedRoles: UserRole[]
  fallback?: ReactNode
}

export function RouteGuard({ children, allowedRoles, fallback }: RouteGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuthStore()
  const [isChecking, setIsChecking] = useState(true)
  const [showRoleMismatch, setShowRoleMismatch] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.replace('/login')
      return
    }

    if (!allowedRoles.includes(user.role)) {
      setShowRoleMismatch(true)
      setIsChecking(false)
      return
    }

    setIsChecking(false)
  }, [isAuthenticated, user, allowedRoles, router])

  if (isChecking) {
    return fallback || <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isAuthenticated || !user) {
    return fallback || null
  }

  if (showRoleMismatch && user) {
    // Determine the correct portal based on user role
    const isInternalUser = ['STAFF', 'STORE_MANAGER', 'WAREHOUSE_MANAGER', 'ADMIN'].includes(user.role)
    const isCustomerUser = user.role === 'CUSTOMER'
    const isOnCustomerPortal = pathname?.startsWith('/customer')
    const isOnOpsPortal = pathname?.startsWith('/ops')
    const isOnAdminPortal = pathname?.startsWith('/admin')

    let suggestedPortal = '/login'
    let portalName = 'trang chính'
    let message = 'Bạn không có quyền truy cập trang này.'

    if (isCustomerUser && (isOnOpsPortal || isOnAdminPortal)) {
      suggestedPortal = '/customer'
      portalName = 'Cổng khách hàng'
      message = 'Tài khoản của bạn là tài khoản khách hàng. Vui lòng chuyển sang cổng khách hàng để tiếp tục.'
    } else if (isInternalUser && isOnCustomerPortal) {
      suggestedPortal = user.role === 'ADMIN' ? '/admin' : '/ops'
      portalName = user.role === 'ADMIN' ? 'Cổng quản trị' : 'Cổng vận hành'
      message = 'Tài khoản của bạn là tài khoản nội bộ. Vui lòng chuyển sang cổng vận hành để tiếp tục.'
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white border border-amber-200 rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Truy cập bị hạn chế</h2>
            <p className="text-gray-600 text-sm">{message}</p>
          </div>

          <div className="space-y-3">
            <Link
              href={suggestedPortal}
              className="block w-full px-4 py-3 bg-emerald-600 text-white text-center rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Chuyển đến {portalName}
            </Link>
            <Link
              href="/login"
              className="block w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 text-center rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Đăng xuất và đăng nhập lại
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
            <p>Nếu bạn cần trợ giúp, vui lòng liên hệ quản trị viên hệ thống.</p>
          </div>
        </div>
      </div>
    )
  }

  if (!allowedRoles.includes(user.role)) {
    return fallback || null
  }

  return <>{children}</>
}

export default RouteGuard
