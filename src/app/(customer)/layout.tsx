'use client'

import { RouteGuard } from '@/shared/auth/RouteGuard'

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard allowedRoles={['CUSTOMER']}>
      {children}
    </RouteGuard>
  )
}
