'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'

/**
 * AuthReset Component
 * 
 * Forces a hard logout on every app boot/reload.
 * Ensures the app always starts in unauthenticated state.
 * 
 * - Clears all auth tokens
 * - Clears localStorage/sessionStorage
 * - Clears auth cookies
 * - Resets Zustand auth state
 */
export function AuthReset() {
  const resetAuth = useAuthStore((state) => state.resetAuth)

  useEffect(() => {
    // Run only once on mount (app boot)
    resetAuth()
    
    // Optional: Log for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('🔒 Auth reset: User logged out on app boot')
    }
  }, [resetAuth])

  // This component renders nothing
  return null
}
