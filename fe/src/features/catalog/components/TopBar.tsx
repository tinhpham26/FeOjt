'use client'

import Link from 'next/link'

export function TopBar() {
  return (
    <div className="bg-primary-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-10 text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-primary-100">Trang chủ</Link>
            <span>|</span>
            <Link href="/about" className="hover:text-primary-100">Giới thiệu</Link>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-medium">1900 xxxx</span>
          </div>
        </div>
      </div>
    </div>
  )
}
