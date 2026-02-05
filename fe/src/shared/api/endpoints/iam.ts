const SERVICE_URLS = {
  IAM: process.env.NEXT_PUBLIC_IAM_URL || 'http://localhost:3002',
}

export const iamEndpoints = {
  auth: {
    login: '/api/Auth/login',
    logout: '/api/Auth/logout',
    register: '/api/Auth/register',
    refreshToken: '/api/Auth/refresh',
    forgotPassword: '/api/Auth/forgot-password',
    resetPassword: '/api/Auth/reset-password',
    me: '/api/Auth/me',
  },
  users: {
    list: '/api/users',
    create: '/api/users',
    getById: (id: string) => `/api/users/${id}`,
    update: (id: string) => `/api/users/${id}`,
    delete: (id: string) => `/api/users/${id}`,
    permissions: (id: string) => `/api/users/${id}/permissions`,
  },
  roles: {
    list: '/api/roles',
    create: '/api/roles',
    getById: (id: string) => `/api/roles/${id}`,
    update: (id: string) => `/api/roles/${id}`,
    delete: (id: string) => `/api/roles/${id}`,
  },
}

export const IAM_SERVICE_URL = SERVICE_URLS.IAM
