// Re-export all endpoints from individual modules
export * from './iam'
export * from './orders'
export * from './inventory'
export * from './catalog'
export * from './promotion'
export * from './loyalty'
export * from './delivery'
export * from './shift'
export * from './customer'
export * from './reporting'

// For backward compatibility, re-export as single endpoints object
import { iamEndpoints } from './iam'
import { ordersEndpoints } from './orders'
import { inventoryEndpoints } from './inventory'
import { catalogEndpoints } from './catalog'
import { promotionEndpoints } from './promotion'
import { loyaltyEndpoints } from './loyalty'
import { deliveryEndpoints } from './delivery'
import { shiftEndpoints } from './shift'
import { customerEndpoints } from './customer'
import { reportingEndpoints } from './reporting'

export const endpoints = {
  ...iamEndpoints,
  ...ordersEndpoints,
  ...inventoryEndpoints,
  ...catalogEndpoints,
  ...promotionEndpoints,
  ...loyaltyEndpoints,
  ...deliveryEndpoints,
  ...shiftEndpoints,
  ...customerEndpoints,
  ...reportingEndpoints,
}

// Export SERVICE_URLS object for backward compatibility
export const SERVICE_URLS = {
  IAM: process.env.NEXT_PUBLIC_IAM_URL || 'http://localhost:3002',
  ORDER: process.env.NEXT_PUBLIC_ORDER_URL || 'http://localhost:3003',
  INVENTORY: process.env.NEXT_PUBLIC_INVENTORY_URL || 'http://localhost:3004',
  CATALOG: process.env.NEXT_PUBLIC_CATALOG_URL || 'http://localhost:3005',
  PROMOTION: process.env.NEXT_PUBLIC_PROMOTION_URL || 'http://localhost:3006',
  LOYALTY: process.env.NEXT_PUBLIC_LOYALTY_URL || 'http://localhost:3007',
  DELIVERY: process.env.NEXT_PUBLIC_DELIVERY_URL || 'http://localhost:3008',
  SHIFT: process.env.NEXT_PUBLIC_SHIFT_URL || 'http://localhost:3009',
  CUSTOMER: process.env.NEXT_PUBLIC_CUSTOMER_URL || 'http://localhost:3010',
  REPORTING: process.env.NEXT_PUBLIC_REPORTING_URL || 'http://localhost:3011',
}

export default SERVICE_URLS
