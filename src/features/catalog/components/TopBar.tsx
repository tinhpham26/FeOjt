'use client'

import Link from 'next/link'

export function TopBar() {
  return (
    <div className="bg-emerald-600 text-white text-xs">
      <div className="max-w-7xl mx-auto px-4 h-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Giao hàng toàn quốc
          </span>
          <span className="hidden md:inline">Miễn phí vận chuyển với đơn từ 200.000đ</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Hotline: 1900-xxxx
          </span>
          <Link href="/support" className="hover:underline hidden md:inline">
            Hỗ trợ
          </Link>
        </div>
      </div>
    </div>
  )
}
