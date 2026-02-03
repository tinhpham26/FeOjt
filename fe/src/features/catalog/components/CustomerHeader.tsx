'use client'

import { useEffect, useState } from 'react'
import { MainHeader } from './MainHeader'
import { NavBar } from './NavBar'

export function CustomerHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 bg-gradient-to-r from-green-600 to-emerald-600 transition-shadow ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <MainHeader />
      <NavBar />
    </header>
  )
}
