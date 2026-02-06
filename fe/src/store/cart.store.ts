import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  quantity: number
  unit: string
  category?: string
  discount?: string
  badge?: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  
  // Actions
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  
  // Getters
  getTotalItems: () => number
  getTotalPrice: () => number
  getOriginalTotalPrice: () => number
  getSavings: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const existingItem = get().items.find(i => i.id === item.id)
        
        if (existingItem) {
          set((state) => ({
            items: state.items.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i
            )
          }))
        } else {
          set((state) => ({
            items: [...state.items, { ...item, quantity: item.quantity || 1 }]
          }))
        }
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== itemId)
        }))
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },

      openCart: () => {
        set({ isOpen: true })
      },

      closeCart: () => {
        set({ isOpen: false })
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      },

      getOriginalTotalPrice: () => {
        return get().items.reduce((sum, item) => {
          const price = item.originalPrice || item.price
          return sum + (price * item.quantity)
        }, 0)
      },

      getSavings: () => {
        return get().getOriginalTotalPrice() - get().getTotalPrice()
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
