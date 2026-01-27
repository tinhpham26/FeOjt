'use client'

import React, { ReactNode } from 'react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  side?: 'left' | 'right'
}

export const Drawer = ({ isOpen, onClose, title, children, side = 'right' }: DrawerProps) => {
  if (!isOpen) return null

  const sideClass = side === 'left' ? 'left-0' : 'right-0'

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div
        className={`fixed top-0 ${sideClass} h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full'
        }`}
      >
        {title && (
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              ×
            </button>
          </div>
        )}
        <div className="px-6 py-4 overflow-y-auto h-[calc(100%-60px)]">{children}</div>
      </div>
    </>
  )
}

export default Drawer
