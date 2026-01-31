'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

interface CategoryBreadcrumbProps {
  categoryName: string
}

export function CategoryBreadcrumb({ categoryName }: CategoryBreadcrumbProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === '/' || pathname === '/customer'

  const handleBack = () => {
    router.back()
  }

  return (
    <nav className="flex items-center gap-3 text-sm text-gray-600 mb-4">
      {!isHomePage && (
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Quay lại"
        >
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}
      <Link href="/" className="hover:text-primary-600 transition-colors">
        Trang chủ
      </Link>
      <span>/</span>
      <span className="text-gray-900 font-medium">{categoryName}</span>
    </nav>
  )
}

