'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Checkbox } from '@/shared/ui/Checkbox'
import { useAuth } from '@/shared/hooks/useAuth'
import { rolePermissions } from '@/shared/auth/permission-map'
import type { User } from '@/shared/types'

export default function LoginPage() {
  const router = useRouter()
  const { user, isAuthenticated, login } = useAuth()

  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace('/customer')
    }
  }, [isAuthenticated, router, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!emailOrPhone || !password) {
      setError('Vui lòng nhập đầy đủ thông tin')
      setLoading(false)
      return
    }

    // TODO: Replace with actual API call
    // Example: const response = await authService.login({ emailOrPhone, password })
    
    // Mock login for customer
    setTimeout(() => {
      const mockUser: User = {
        id: 'demo-customer',
        name: 'Khách hàng',
        email: emailOrPhone,
        role: 'CUSTOMER',
        permissions: rolePermissions.CUSTOMER,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      login(mockUser, 'mock-token-customer')
      router.push('/customer')
      setLoading(false)
    }, 800)
  }

  const handleOTPLogin = () => {
    // TODO: Implement OTP login flow
    alert('Tính năng đăng nhập bằng OTP đang được phát triển')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0F8A5F] via-[#0B6B4B] to-[#0A5A3E]">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Floating Circles */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-[#F9D84A] rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-white rounded-full opacity-10 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#F9D84A] rounded-full opacity-15 blur-2xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 py-12 text-white w-full">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-white/90 text-sm font-medium mb-8">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
              BÁCH HÓA XANH
            </div>

            <h1 className="text-5xl font-bold leading-tight">
              Chào mừng<br />quay lại
            </h1>
            
            <p className="text-xl text-white/90 max-w-md">
              Mua sắm thực phẩm tươi mỗi ngày
            </p>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-6 pt-12 max-w-md">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#F9D84A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-sm text-white/80">Thực phẩm<br />tươi sống</p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#F9D84A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm text-white/80">Giao hàng<br />2 giờ</p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#F9D84A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-white/80">Giá cả<br />hợp lý</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50 lg:px-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <div className="inline-flex items-center gap-2 text-[#0F8A5F] text-lg font-bold mb-2">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
              BÁCH HÓA XANH
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Đăng nhập khách hàng
              </h2>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#0F8A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Giao hàng nhanh trong 2 giờ
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Số điện thoại hoặc Email"
                type="text"
                placeholder="0901234567 hoặc email@example.com"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
                className="focus:border-[#0F8A5F] focus:ring-[#0F8A5F]"
              />

              <Input
                label="Mật khẩu"
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:border-[#0F8A5F] focus:ring-[#0F8A5F]"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer">
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#0F8A5F] hover:text-[#0B6B4B] font-medium transition-colors"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#0F8A5F] hover:bg-[#0B6B4B] text-white" 
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Đang đăng nhập...
                  </span>
                ) : (
                  'Đăng nhập'
                )}
              </Button>

              <button
                type="button"
                onClick={handleOTPLogin}
                className="w-full py-3 px-4 border-2 border-[#0F8A5F] text-[#0F8A5F] rounded-xl font-medium hover:bg-[#0F8A5F] hover:text-white transition-all duration-200"
              >
                Đăng nhập bằng OTP
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Chưa có tài khoản?{' '}
                <Link 
                  href="/register" 
                  className="text-[#0F8A5F] hover:text-[#0B6B4B] font-semibold transition-colors"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Bằng việc đăng nhập, bạn đồng ý với</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <a href="#" className="text-[#0F8A5F] hover:underline">
                Điều khoản sử dụng
              </a>
              <span>và</span>
              <a href="#" className="text-[#0F8A5F] hover:underline">
                Chính sách bảo mật
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
