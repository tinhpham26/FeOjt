'use client'

import React, { useState, forwardRef, InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  showStrength?: boolean
  fullWidth?: boolean
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, showStrength = false, fullWidth = true, className = '', value, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
      if (!password) return { strength: 0, label: '', color: '' }

      let strength = 0
      // Length check
      if (password.length >= 8) strength += 1
      if (password.length >= 12) strength += 1
      // Complexity checks
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1
      if (/\d/.test(password)) strength += 1
      if (/[^a-zA-Z0-9]/.test(password)) strength += 1

      const strengthMap = {
        0: { label: '', color: '' },
        1: { label: 'Rất yếu', color: 'bg-red-500' },
        2: { label: 'Yếu', color: 'bg-orange-500' },
        3: { label: 'Trung bình', color: 'bg-yellow-500' },
        4: { label: 'Mạnh', color: 'bg-green-500' },
        5: { label: 'Rất mạnh', color: 'bg-green-600' },
      }

      return { strength, ...strengthMap[strength as keyof typeof strengthMap] }
    }

    const passwordStrength = showStrength && value ? getPasswordStrength(value as string) : null

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            value={value}
            className={`
              w-full px-4 py-2 pr-12 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
              ${className}
            `}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {passwordStrength && passwordStrength.strength > 0 && (
          <div className="mt-2">
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    level <= passwordStrength.strength ? passwordStrength.color : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className={`text-xs font-medium ${
              passwordStrength.strength <= 2 ? 'text-orange-600' : 'text-green-600'
            }`}>
              {passwordStrength.label}
            </p>
          </div>
        )}

        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'
