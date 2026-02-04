'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Checkbox } from '@/shared/ui/Checkbox'
import { authService } from '@/services/auth.service'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Prefetch login page để giảm độ trễ
  useEffect(() => {
    router.prefetch('/login')
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Vui lòng điền đầy đủ tất cả các trường')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu nhập lại không khớp')
      return
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }

    if (!agreeTerms) {
      setError('Vui lòng đồng ý với Điều khoản dịch vụ')
      return
    }

    setIsLoading(true)

    try {
      // Gọi backend IAM microservice thông qua authService
      const data = await authService.register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })

      setSuccess(true)
      
      // Redirect to login after 1.5 seconds (giảm thời gian chờ)
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
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
        <div className="relative z-10 flex flex-col items-center justify-center px-16 py-12 text-white w-full">
          <div className="space-y-6 flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center gap-2 text-white/90 text-sm font-medium mb-8">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
              BÁCH HÓA XANH
            </div>

            <h1 className="text-5xl font-bold leading-tight">
              Tạo tài khoản<br />mới
            </h1>
            
            <p className="text-xl text-white/90 max-w-md">
              Tham gia cùng hàng ngàn khách hàng đang mua sắm thực phẩm tươi mỗi ngày
            </p>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-6 pt-12 max-w-md w-full">
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#F9D84A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-sm text-white/80">Thực phẩm<br />tươi sống</p>
              </div>
              
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#F9D84A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm text-white/80">Giao hàng<br />2 giờ</p>
              </div>
              
              <div className="flex flex-col items-center justify-center text-center space-y-3">
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

      {/* Right Panel - Register Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50 lg:px-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 text-[#0F8A5F] text-lg font-bold mb-2">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
              BÁCH HÓA XANH
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
            <div className="mb-8 flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Đăng ký tài khoản
              </h2>
              <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-[#0F8A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Giao hàng nhanh trong 2 giờ
              </p>
            </div>

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Đăng ký thành công! Đang chuyển đến trang đăng nhập...</span>
              </div>
            )}

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
                label="Họ và tên"
                type="text"
                name="fullName"
                placeholder="Nguyễn Văn A"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="focus:border-[#0F8A5F] focus:ring-[#0F8A5F]"
              />

              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="focus:border-[#0F8A5F] focus:ring-[#0F8A5F]"
              />

              <Input
                label="Số điện thoại"
                type="tel"
                name="phone"
                placeholder="(+84) 123 456 789"
                value={formData.phone}
                onChange={handleChange}
                required
                className="focus:border-[#0F8A5F] focus:ring-[#0F8A5F]"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F8A5F] focus:border-[#0F8A5F] transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nhập lại mật khẩu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F8A5F] focus:border-[#0F8A5F] transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                  Tôi đồng ý với{' '}
                  <a href="#" className="text-[#0F8A5F] hover:underline font-medium">
                    Điều khoản dịch vụ
                  </a>
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#0F8A5F] hover:bg-[#0B6B4B] text-white" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Đang xử lý...' : 'Tạo tài khoản'}
              </Button>
            </form>

            <div className="mt-8 flex justify-center">
              <p className="text-sm text-gray-600">
                Đã có tài khoản?{' '}
                <Link 
                  href="/login" 
                  className="text-[#0F8A5F] hover:text-[#0B6B4B] font-semibold transition-colors"
                >
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>

          {/* Security Message */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-xs text-green-700 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span><strong>Bảo mật:</strong> Mật khẩu của bạn sẽ được mã hóa an toàn.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
