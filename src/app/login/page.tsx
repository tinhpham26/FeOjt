'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace('/customer')
    }
  }, [isAuthenticated, router, user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Vui lòng nhập email và mật khẩu')
      return
    }

    // Mock login for customer
    const mockUser: User = {
      id: 'demo-customer',
      name: 'Khách hàng',
      email,
      role: 'CUSTOMER',
      permissions: rolePermissions.CUSTOMER,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    login(mockUser, 'mock-token-customer')
    router.push('/customer')
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center px-4 py-12 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(52,211,153,0.12),transparent_40%)]"
        aria-hidden="true"
      />
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl p-10 shadow-xl relative z-10">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden mb-4">
            <Image
              src="/logo.jpg"
              alt="Bách Hóa XANH"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-xl font-bold text-gray-900">BÁCH HÓA XANH</h1>
          <p className="text-sm text-gray-600 mt-1">Đăng nhập khách hàng</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Mật khẩu"
            type={showPassword ? 'text' : 'password'}
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">Hiện mật khẩu</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Quên mật khẩu?
            </Link>
          </div>

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

          <Button type="submit" className="w-full" size="lg">
            Đăng nhập
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="text-emerald-600 hover:text-emerald-700 font-medium">
            Đăng ký ngay
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>Bằng việc đăng nhập, bạn đồng ý với</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <a href="#" className="text-emerald-600 hover:underline">
              Điều khoản sử dụng
            </a>
            <span>và</span>
            <a href="#" className="text-emerald-600 hover:underline">
              Chính sách bảo mật
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
