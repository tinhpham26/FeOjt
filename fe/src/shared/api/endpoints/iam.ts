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
