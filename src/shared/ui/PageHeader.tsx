'use client'

import React, { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  breadcrumbs?: Array<{ label: string; href: string }>
}

export const PageHeader = ({ title, subtitle, actions, breadcrumbs }: PageHeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 mb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-sm mb-4">
          {breadcrumbs.map((bc, idx) => (
            <React.Fragment key={idx}>
              <a href={bc.href} className="text-blue-600 hover:text-blue-700">
                {bc.label}
              </a>
              {idx < breadcrumbs.length - 1 && <span className="text-gray-400">/</span>}
            </React.Fragment>
          ))}
        </nav>
      )}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    </div>
  )
}

export default PageHeader
