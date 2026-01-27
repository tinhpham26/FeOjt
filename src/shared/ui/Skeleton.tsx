'use client'

import React from 'react'

interface SkeletonProps {
  count?: number
  height?: string
  circle?: boolean
  className?: string
}

export const Skeleton = ({ count = 1, height = 'h-4', circle = false, className = '' }: SkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`
            bg-gray-200 animate-pulse rounded
            ${circle ? 'w-8 h-8 rounded-full' : height}
            ${className}
            ${i < count - 1 ? 'mb-3' : ''}
          `}
        />
      ))}
    </>
  )
}

export default Skeleton
