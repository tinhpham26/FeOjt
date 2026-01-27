import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  notifications: Notification[]
  loading: boolean
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

interface UIStore extends UIState {
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
  setLoading: (loading: boolean) => void
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  theme: 'light',
  notifications: [],
  loading: false,

  toggleSidebar: () => {
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    }))
  },

  setSidebarOpen: (open) => {
    set({ sidebarOpen: open })
  },

  setTheme: (theme) => {
    set({ theme })
    localStorage.setItem('ui-theme', theme)
  },

  setLoading: (loading) => {
    set({ loading })
  },

  addNotification: (notification) => {
    const id = `${Date.now()}-${Math.random()}`
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id,
        },
      ],
    }))

    if (notification.duration) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }))
      }, notification.duration)
    }
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }))
  },

  clearNotifications: () => {
    set({ notifications: [] })
  },
}))

export default useUIStore
