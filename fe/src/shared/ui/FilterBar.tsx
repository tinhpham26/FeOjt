'use client'

import React, { ReactNode } from 'react'

interface FilterBarProps {
  children: ReactNode
  onReset?: () => void
}

export const FilterBar = ({ children, onReset }: FilterBarProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex gap-4 flex-wrap items-end">
      {children}
      {onReset && (
        <button
          onClick={onReset}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg transition-colors"
        >
          Reset
        </button>
      )}
    </div>
  )
}

export default FilterBar
