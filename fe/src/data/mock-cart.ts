// Mock data for development and testing

export const MOCK_CART_ITEMS = [
  {
    id: '1',
    name: 'Cà chua bi',
    image: '🍅',
    price: 25000,
    originalPrice: 30000,
    quantity: 2,
    unit: 'kg',
    category: 'Rau củ quả',
    discount: '-17%',
    badge: 'Fresh'
  },
  {
    id: '2',
    name: 'Thịt ba chỉ heo',
    image: '🥓',
    price: 89000,
    quantity: 1,
    unit: 'kg',
    category: 'Thịt',
    badge: 'Fresh'
  },
  {
    id: '3',
    name: 'Sữa tươi Vinamilk',
    image: '🥛',
    price: 32000,
    quantity: 3,
    unit: 'Hộp 1L',
    category: 'Sữa - Đồ uống'
  }
]

// Function to populate cart with mock data (for testing)
export function populateMockCart() {
  if (typeof window === 'undefined') return
  
  const { addItem } = require('@/store/cart.store').useCartStore.getState()
  
  MOCK_CART_ITEMS.forEach(item => {
    addItem(item)
  })
}
