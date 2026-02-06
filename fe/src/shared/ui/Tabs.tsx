'use client'

import React from 'react'

export interface Tab {
  key: string
  label: string
  icon?: React.ReactNode
  badge?: string | number
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (key: string) => void
  className?: string
}

export const Tabs = ({ tabs, activeTab, onChange, className = '' }: TabsProps) => {
  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`
                group inline-flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.icon && (
                <span className={isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}>
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`
                    ml-2 py-0.5 px-2 rounded-full text-xs font-medium
                    ${
                      isActive
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                    }
                  `}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
