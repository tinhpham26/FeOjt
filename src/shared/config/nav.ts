import { Permission } from '@/shared/types'
import { canAccessModule } from '@/shared/auth/permission-map'

export interface NavItem {
  label: string
  href: string
  icon?: string
  requiredPermission?: Permission | Permission[]
  children?: NavItem[]
}

export const getOpsNavigation = (userPermissions: Permission[]): NavItem[] => {
  const items: NavItem[] = [
    {
      label: 'Dashboard',
      href: '/ops',
      icon: 'Home',
    },
  ]

  if (canAccessModule(userPermissions, 'orderOnline') || canAccessModule(userPermissions, 'orderPos')) {
    items.push({
      label: 'Orders',
      href: '/ops/orders',
      icon: 'ShoppingCart',
      children: [],
    })
  }

  if (canAccessModule(userPermissions, 'inventory')) {
    items.push({
      label: 'Inventory',
      href: '/ops/inventory',
      icon: 'Package',
    })
  }

  if (canAccessModule(userPermissions, 'shifts')) {
    items.push({
      label: 'Shifts',
      href: '/ops/shifts',
      icon: 'Clock',
    })
  }

  if (canAccessModule(userPermissions, 'delivery')) {
    items.push({
      label: 'Delivery',
      href: '/ops/delivery',
      icon: 'Truck',
    })
  }

  if (canAccessModule(userPermissions, 'reports')) {
    items.push({
      label: 'Reports',
      href: '/ops/reports',
      icon: 'BarChart3',
    })
  }

  return items
}

export const getAdminNavigation = (): NavItem[] => {
  return [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: 'Home',
    },
    {
      label: 'Users & Roles',
      href: '/admin/users',
      icon: 'Users',
      children: [
        {
          label: 'Users',
          href: '/admin/users',
        },
        {
          label: 'Roles',
          href: '/admin/roles',
        },
      ],
    },
    {
      label: 'Catalog',
      href: '/admin/catalog',
      icon: 'Package',
      children: [
        {
          label: 'Products',
          href: '/admin/catalog/products',
        },
        {
          label: 'Categories',
          href: '/admin/catalog/categories',
        },
      ],
    },
    {
      label: 'Inventory',
      href: '/admin/inventory',
      icon: 'Package',
    },
    {
      label: 'Orders',
      href: '/admin/orders',
      icon: 'ShoppingCart',
    },
    {
      label: 'Promotions',
      href: '/admin/promotions',
      icon: 'Gift',
    },
    {
      label: 'Loyalty',
      href: '/admin/loyalty',
      icon: 'Heart',
    },
    {
      label: 'Customers',
      href: '/admin/customers',
      icon: 'Users',
    },
    {
      label: 'Delivery',
      href: '/admin/delivery',
      icon: 'Truck',
    },
    {
      label: 'Reports',
      href: '/admin/reports',
      icon: 'BarChart3',
    },
  ]
}

export const getCustomerNavigation = (): NavItem[] => {
  return [
    {
      label: 'Dashboard',
      href: '/customer',
      icon: 'Home',
    },
    {
      label: 'Orders',
      href: '/customer/orders',
      icon: 'ShoppingCart',
    },
    {
      label: 'Loyalty',
      href: '/customer/loyalty',
      icon: 'Heart',
    },
    {
      label: 'Profile',
      href: '/customer/profile',
      icon: 'User',
    },
  ]
}
