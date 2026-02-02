'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'

interface LogoutButtonProps {
  variant?: 'default' | 'icon-only' | 'text-only'
  className?: string
  showIcon?: boolean
  redirectTo?: string
}

// Professional Sign-Out Icon
function SignOutIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  )
}

/**
 * LogoutButton Component
 * 
 * A professional, enterprise-grade logout button with multiple variants.
 * Features:
 * - Minimalist design with soft shadows
 * - Smooth hover effects
 * - Multiple style variants
 * - Accessible (ARIA labels, keyboard support)
 * - Security-focused (clear visual feedback)
 */
export function LogoutButton({
  variant = 'default',
  className = '',
  showIcon = true,
  redirectTo = '/login'
}: LogoutButtonProps) {
  const router = useRouter()
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push(redirectTo)
  }

  // Variant: Icon only (for compact layouts)
  if (variant === 'icon-only') {
    return (
      <button
        onClick={handleLogout}
        className={`
          p-2.5 
          bg-white text-red-600 
          border border-red-200 
          rounded-lg 
          shadow-sm 
          hover:bg-red-50 hover:border-red-300 hover:shadow-md 
          transition-all duration-200 
          group
          ${className}
        `}
        aria-label="Logout"
        title="Logout"
      >
        <SignOutIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>
    )
  }

  // Variant: Text only (for dropdown menus)
  if (variant === 'text-only') {
    return (
      <button
        onClick={handleLogout}
        className={`
          flex items-center gap-2 
          px-4 py-2 
          text-red-600 
          hover:bg-red-50 
          transition-colors duration-200 
          w-full text-left
          ${className}
        `}
        aria-label="Logout"
      >
        {showIcon && <SignOutIcon className="w-4 h-4" />}
        <span className="font-medium">Logout</span>
      </button>
    )
  }

  // Variant: Default (full button with icon and text)
  return (
    <button
      onClick={handleLogout}
      className={`
        flex items-center gap-2 
        px-5 py-2.5 
        bg-white text-red-600 
        border border-red-200 
        rounded-lg 
        font-semibold text-sm 
        shadow-sm 
        hover:bg-red-50 hover:border-red-300 hover:shadow-md 
        active:scale-95
        transition-all duration-200 
        group
        ${className}
      `}
      aria-label="Logout from admin dashboard"
    >
      {showIcon && (
        <SignOutIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
      )}
      <span>Logout</span>
    </button>
  )
}

export default LogoutButton
