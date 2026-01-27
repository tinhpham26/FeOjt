'use client'

import React, { InputHTMLAttributes } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helperText, className = '', ...props }, ref) => {
    return (
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          type="checkbox"
          className={`
            mt-1 w-4 h-4 accent-emerald-600 rounded
            border border-gray-300 cursor-pointer
            focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
            transition-colors
            ${className}
          `}
          {...props}
        />
        <div>
          {label && (
            <label className="text-sm font-medium text-gray-700 cursor-pointer">
              {label}
            </label>
          )}
          {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
        </div>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
