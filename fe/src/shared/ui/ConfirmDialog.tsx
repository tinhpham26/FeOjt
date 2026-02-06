'use client'

import React from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { Button } from './Button'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'warning' | 'info'
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

export const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  type = 'warning',
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDialogProps) => {
  if (!isOpen) return null

  const iconColorMap = {
    danger: 'bg-red-100 text-red-600',
    warning: 'bg-yellow-100 text-yellow-600',
    info: 'bg-blue-100 text-blue-600',
  }

  const buttonVariantMap = {
    danger: 'danger' as const,
    warning: 'primary' as const,
    info: 'primary' as const,
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-in fade-in duration-200"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-in zoom-in-95 fade-in duration-200">
          {/* Header */}
          <div className="flex items-start gap-4 p-6 pb-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${iconColorMap[type]}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{message}</p>
            </div>
            <button
              onClick={onCancel}
              disabled={loading}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              {cancelText}
            </Button>
            <Button
              variant={buttonVariantMap[type]}
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : confirmText}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
