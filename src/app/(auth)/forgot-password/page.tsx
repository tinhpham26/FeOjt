'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import axiosInstance from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'
import { getErrorMessage } from '@/shared/api/errors'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordForm) => {
    setLoading(true)
    setError('')

    try {
      await axiosInstance.post(endpoints.auth.forgotPassword, data)
      setSuccess(true)
    } catch (err) {
      setError(getErrorMessage(err) || 'Failed to send reset email.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4 text-4xl">✉️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
        <p className="text-gray-600 mb-6">
          We have sent a password reset link to your email address. Please check your inbox and
          follow the instructions.
        </p>
        <Link href="/login">
          <Button fullWidth>Back to Sign In</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
        <p className="text-gray-600 mt-2">Enter your email to receive a password reset link</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          error={errors.email?.message}
        />

        <Button type="submit" fullWidth loading={loading}>
          Send Reset Link
        </Button>
      </form>

      <div className="text-center mt-6">
        <Link href="/login" className="text-blue-600 hover:text-blue-700 text-sm">
          Back to Sign In
        </Link>
      </div>
    </div>
  )
}
