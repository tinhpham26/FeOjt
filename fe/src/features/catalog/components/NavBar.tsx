'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export function NavBar() {
 
  const [openCat, setOpenCat] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (!wrapRef.current) return
      if (!wrapRef.current.contains(t)) setOpenCat(false)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenCat(false)
    }

    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <div className="border-t border-green-700/30 bg-green-700">
      <div className="container mx-auto px-4">
       <nav className="flex flex-wrap items-center gap-6 min-h-12">
          {/* Category Dropdown */}
          <div className="relative" ref={wrapRef}>
            <button
              ref={btnRef}
              type="button"
              className="flex items-center gap-2 text-sm text-white hover:text-green-200 whitespace-nowrap font-medium"
              aria-haspopup="menu"
              aria-expanded={openCat}
              onClick={() => setOpenCat((v) => !v)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Danh mục
            </button>

            <div
              className={[
                'absolute left-0 top-full mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg',
                'transition duration-200 origin-top z-50',
                openCat ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none',
              ].join(' ')}
              role="menu"
            >
              <div className="py-2">
                <Link
                  href="/category/trai-cay-tuoi"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all group"
                  role="menuitem"
                  onClick={() => setOpenCat(false)}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">🍎</span>
                  <span className="group-hover:text-primary-600 transition-colors">Trái cây tươi</span>
                </Link>
                <Link
                  href="/category/rau-cu"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all group"
                  role="menuitem"
                  onClick={() => setOpenCat(false)}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">🥬</span>
                  <span className="group-hover:text-primary-600 transition-colors">Rau củ</span>
                </Link>
                <Link
                  href="/category/thit-ca"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 transition-all group"
                  role="menuitem"
                  onClick={() => setOpenCat(false)}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">🥩</span>
                  <span className="group-hover:text-primary-600 transition-colors">Thịt, cá</span>
                </Link>
                <Link
                  href="/category/gao-mi"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all group"
                  role="menuitem"
                  onClick={() => setOpenCat(false)}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">🍚</span>
                  <span className="group-hover:text-primary-600 transition-colors">Gạo, mì</span>
                </Link>
                <Link
                  href="/category/nuoc-uong"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all group"
                  role="menuitem"
                  onClick={() => setOpenCat(false)}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">🥤</span>
                  <span className="group-hover:text-primary-600 transition-colors">Nước uống</span>
                </Link>
                <Link
                  href="/category/banh-keo"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all group"
                  role="menuitem"
                  onClick={() => setOpenCat(false)}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">🍪</span>
                  <span className="group-hover:text-primary-600 transition-colors">Bánh kẹo</span>
                </Link>
                <div className="my-1 border-t border-gray-100" />
                <Link
                  href="/category/deals"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all group"
                  role="menuitem"
                  onClick={() => setOpenCat(false)}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">🔥</span>
                  <span className="group-hover:text-red-700 transition-colors">Khuyến mãi hot</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <Link 
            href="/category/trai-cay-tuoi" 
            className={`text-sm whitespace-nowrap transition-colors ${
              pathname === '/category/trai-cay-tuoi' 
                ? 'text-white font-semibold border-b-2 border-white' 
                : 'text-green-100 hover:text-white'
            }`}
          >
            Trái cây tươi
          </Link>
          <Link 
            href="/category/rau-cu" 
            className={`text-sm whitespace-nowrap transition-colors ${
              pathname === '/category/rau-cu' 
                ? 'text-white font-semibold border-b-2 border-white' 
                : 'text-green-100 hover:text-white'
            }`}
          >
            Rau củ
          </Link>
          <Link 
            href="/category/thit-ca" 
            className={`text-sm whitespace-nowrap transition-colors ${
              pathname === '/category/thit-ca' 
                ? 'text-white font-semibold border-b-2 border-white' 
                : 'text-green-100 hover:text-white'
            }`}
          >
            Thịt, cá
          </Link>
          <Link 
            href="/category/gao-mi" 
            className={`text-sm whitespace-nowrap transition-colors ${
              pathname === '/category/gao-mi' 
                ? 'text-white font-semibold border-b-2 border-white' 
                : 'text-green-100 hover:text-white'
            }`}
          >
            Gạo, mì
          </Link>
          <Link 
            href="/category/nuoc-uong" 
            className={`text-sm whitespace-nowrap transition-colors ${
              pathname === '/category/nuoc-uong' 
                ? 'text-white font-semibold border-b-2 border-white' 
                : 'text-green-100 hover:text-white'
            }`}
          >
            Nước uống
          </Link>
          <Link 
            href="/category/banh-keo" 
            className={`text-sm whitespace-nowrap transition-colors ${
              pathname === '/category/banh-keo' 
                ? 'text-white font-semibold border-b-2 border-white' 
                : 'text-green-100 hover:text-white'
            }`}
          >
            Bánh kẹo
          </Link>
          <Link 
            href="/category/khuyen-mai-hot" 
            className={`text-sm font-medium whitespace-nowrap transition-colors ${
              pathname === '/category/khuyen-mai-hot' 
                ? 'text-yellow-300 font-bold border-b-2 border-yellow-300' 
                : 'text-yellow-200 hover:text-yellow-100'
            }`}
          >
            🔥 Khuyến mãi hot
          </Link>
        </nav>
      </div>
    </div>
  )
}
