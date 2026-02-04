import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, AuthState, Permission, UserRole } from '@/shared/types'

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setIsLoading: (isLoading: boolean) => void
  login: (user: User, token: string) => void
  logout: () => void
  resetAuth: () => void
  hasPermission: (permission: Permission) => boolean
  hasRole: (role: UserRole) => boolean
  hydrated: boolean
  setHydrated: () => void
}

// Helper to get initial state from localStorage (for SSR safety)
const getInitialState = () => {
  if (typeof window === 'undefined') {
    return { user: null, token: null, isAuthenticated: false }
  }
  
  try {
    const stored = localStorage.getItem('auth-storage')
    if (stored) {
      const parsed = JSON.parse(stored)
      return {
        user: parsed.state?.user || null,
        token: parsed.state?.token || null,
        isAuthenticated: !!(parsed.state?.user && parsed.state?.token),
      }
    }
  } catch (error) {
    console.error('Error loading auth from localStorage:', error)
  }
  
  return { user: null, token: null, isAuthenticated: false }
}

const initialState = getInitialState()

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: initialState.user,
      token: initialState.token,
      isAuthenticated: initialState.isAuthenticated,
      isLoading: false,
      hydrated: false,

      setHydrated: () => {
        set({ hydrated: true })
      },

      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
        })
      },

      setToken: (token) => {
        set({ token })
      },

      setIsLoading: (isLoading) => {
        set({ isLoading })
      },

      login: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        })
        
        // Also set cookies for middleware
        if (typeof window !== 'undefined') {
          document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
          document.cookie = `user_role=${user.role}; path=/; max-age=${60 * 60 * 24 * 7}`
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        
        // Clear localStorage and cookies
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('refresh_token')
          
          // Clear cookies
          document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
          document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        }
      },

      resetAuth: () => {
        // Only use resetAuth when intentionally clearing everything
        // This should NOT run on every page load
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        })
        
        if (typeof window !== 'undefined') {
          // Clear all possible auth-related storage
          const keysToRemove = [
            'auth_token',
            'refresh_token',
            'access_token',
            'user',
            'token'
          ]
          keysToRemove.forEach(key => {
            localStorage.removeItem(key)
            sessionStorage.removeItem(key)
          })
          
          // Clear all cookies
          document.cookie.split(";").forEach((c) => {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
          })
        }
      },

      hasPermission: (permission: Permission) => {
        const { user } = get()
        return user?.permissions.includes(permission) ?? false
      },

      hasRole: (role: UserRole) => {
        const { user } = get()
        return user?.role === role
      },
    }),
    {
      name: 'auth-storage',
      // Only persist user, token, and isAuthenticated
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

export default useAuthStore
