'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import { useUIStore } from '@/store/ui.store'
import { getOpsNavigation } from '@/shared/config/nav'
import { RouteGuard } from '@/shared/auth/RouteGuard'

function OpsShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const { sidebarOpen, toggleSidebar } = useUIStore()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const navItems = user ? getOpsNavigation(user.permissions) : []

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 text-white transition-all duration-300 overflow-y-auto`}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-xl font-bold">Ops Console</h2>}
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
            ☰
          </button>
        </div>

        <nav className="mt-8 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <span className="text-xl">{item.icon || '📄'}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Operations Dashboard</h1>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 text-gray-700 hover:text-gray-900"
            >
              <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                {user?.name?.[0]?.toUpperCase()}
              </span>
              <span>{user?.name}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="px-4 py-2 border-b border-gray-200 text-sm text-gray-600">
                  {user?.role}
                </div>
                <Link href="/ops/profile" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  )
}

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard allowedRoles={['STAFF', 'STORE_MANAGER', 'WAREHOUSE_MANAGER', 'ADMIN']}>
      <OpsShell>{children}</OpsShell>
    </RouteGuard>
  )
}
