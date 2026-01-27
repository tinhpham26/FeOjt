const SERVICE_URLS = {
  CUSTOMER: process.env.NEXT_PUBLIC_CUSTOMER_URL || 'http://localhost:3010',
}

export const customerEndpoints = {
  customers: {
    list: '/customers',
    create: '/customers',
    getById: (id: string) => `/customers/${id}`,
    update: (id: string) => `/customers/${id}`,
    delete: (id: string) => `/customers/${id}`,
  },
}

export const CUSTOMER_SERVICE_URL = SERVICE_URLS.CUSTOMER
