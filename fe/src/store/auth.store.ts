import { create } from 'zustand'
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
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

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
    // Note: tokens stored in memory only - will be cleared on reload
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    })
    // Clear any lingering localStorage/sessionStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('auth-storage')
      sessionStorage.clear()
    }
  },

  resetAuth: () => {
    // Hard reset - clears everything on app boot
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
        'auth-storage',
        'access_token',
        'user',
        'token'
      ]
      keysToRemove.forEach(key => {
        localStorage.removeItem(key)
        sessionStorage.removeItem(key)
      })
      
      // Clear all cookies related to auth
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
}))

export default useAuthStore
