const SERVICE_URLS = {
  IAM: process.env.NEXT_PUBLIC_IAM_URL || 'http://localhost:3002',
}

export const iamEndpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    refreshToken: '/auth/refresh',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    me: '/auth/me',
  },
  users: {
    list: '/users',
    create: '/users',
    getById: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    permissions: (id: string) => `/users/${id}/permissions`,
  },
  roles: {
    list: '/roles',
    create: '/roles',
    getById: (id: string) => `/roles/${id}`,
    update: (id: string) => `/roles/${id}`,
    delete: (id: string) => `/roles/${id}`,
  },
}

export const IAM_SERVICE_URL = SERVICE_URLS.IAM
