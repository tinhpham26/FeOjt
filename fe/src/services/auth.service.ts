import { iamClient } from '@/shared/api/http'
import { iamEndpoints } from '@/shared/api/endpoints'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  success: boolean
  message?: string
  data?: {
    accessToken: string
    refreshToken?: string
    email: string
    fullName: string
    name?: string
    roleId: number
    userId?: string
    id?: string
    createdAt?: string
    updatedAt?: string
  }
  // Fallback properties if data is at root level
  accessToken?: string
  token?: string
  email?: string
  fullName?: string
  name?: string
  roleId?: number
  userId?: string
  id?: string
  createdAt?: string
  updatedAt?: string
}

interface RegisterRequest {
  FullName?: string
  Name?: string
  Email: string
  Phone: string // Backend require Phone
  Password: string
  ConfirmPassword?: string
  // Lowercase cho FE
  fullName?: string
  name?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
}

interface RegisterResponse {
  success: boolean
  message: string
  user: {
    id: string
    email: string
    fullName: string
    phone?: string
  }
}

interface ApiErrorResponse {
  error?: string
  message?: string
  success: boolean
}

/**
 * Auth Service - Gọi backend IAM microservice
 * Backend đang chạy trên http://localhost:5000
 */
export const authService = {
  /**
   * Login - Đăng nhập qua backend IAM service
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await iamClient.post<LoginResponse>(iamEndpoints.auth.login, data)
      return response.data
    } catch (error: any) {
      const apiError = error.response?.data as ApiErrorResponse
      throw new Error(apiError?.error || apiError?.message || 'Đăng nhập thất bại')
    }
  },

  /**
   * Register - Đăng ký tài khoản qua backend IAM service
   */
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
      // Transform camelCase to PascalCase for backend
      const payload = {
        FullName: data.fullName || data.FullName,
        Email: data.email || data.Email,
        Phone: data.phone || data.Phone,
        Password: data.password || data.Password,
        ConfirmPassword: data.confirmPassword || data.ConfirmPassword,
      }
      
      console.log('🔵 Register Request:', {
        url: iamEndpoints.auth.register,
        payload
      })
      
      const response = await iamClient.post<RegisterResponse>(iamEndpoints.auth.register, payload)
      
      console.log('✅ Register Response:', response.data)
      return response.data
    } catch (error: any) {
      console.error('❌ Register Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })
      
      const apiError = error.response?.data as ApiErrorResponse
      throw new Error(apiError?.error || apiError?.message || 'Đăng ký thất bại')
    }
  },

  /**
   * Logout - Đăng xuất
   */
  logout: async (): Promise<void> => {
    try {
      await iamClient.post(iamEndpoints.auth.logout)
    } catch (error: any) {
      console.error('Logout error:', error)
      // Silent fail - vẫn clear local state
    }
  },

  /**
   * Get current user info
   */
  me: async () => {
    try {
      const response = await iamClient.get(iamEndpoints.auth.me)
      return response.data
    } catch (error: any) {
      const apiError = error.response?.data as ApiErrorResponse
      throw new Error(apiError?.error || apiError?.message || 'Không thể lấy thông tin user')
    }
  },

  /**
   * Refresh token
   */
  refreshToken: async (refreshToken: string) => {
    try {
      const response = await iamClient.post(iamEndpoints.auth.refreshToken, { refreshToken })
      return response.data
    } catch (error: any) {
      const apiError = error.response?.data as ApiErrorResponse
      throw new Error(apiError?.error || apiError?.message || 'Refresh token thất bại')
    }
  },

  /**
   * Forgot password
   */
  forgotPassword: async (email: string) => {
    try {
      const response = await iamClient.post(iamEndpoints.auth.forgotPassword, { email })
      return response.data
    } catch (error: any) {
      const apiError = error.response?.data as ApiErrorResponse
      throw new Error(apiError?.error || apiError?.message || 'Yêu cầu reset password thất bại')
    }
  },

  /**
   * Reset password
   */
  resetPassword: async (token: string, newPassword: string) => {
    try {
      const response = await iamClient.post(iamEndpoints.auth.resetPassword, { 
        token, 
        newPassword 
      })
      return response.data
    } catch (error: any) {
      const apiError = error.response?.data as ApiErrorResponse
      throw new Error(apiError?.error || apiError?.message || 'Reset password thất bại')
    }
  },
}

export default authService
