import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About us', path: '/about' },
  { label: 'Contact us', path: '/contact' },
]

const Navbar = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const [activeItem, setActiveItem] = useState(location.pathname)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Sync active item & auto-close menu on navigation
  useEffect(() => {
    setActiveItem(location.pathname)
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Optional: close on escape key (good accessibility)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }
    if (isMobileMenuOpen) {
      window.addEventListener('keydown', handleEsc)
    }
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isMobileMenuOpen])

  return (
    <>
      <div
        className={`w-full max-w-full sm:max-w-[640px] md:max-w-[768px] 
        lg:max-w-[1024px] xl:max-w-[1200px] mx-auto px-3 sm:px-5 
        py-3 flex justify-center z-50
        ${isHome ? 'absolute top-8 left-0 right-0 bg-transparent' : 'relative bg-white'}`}
      >
        {/* Desktop Navigation */}
        <nav className="hidden md:flex bg-[#D9D9D94D] rounded-[50px] px-3 md:px-4 
                        lg:px-5 py-2 md:py-2.5 lg:py-3 gap-1.5 md:gap-2 font-poppins">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setActiveItem(item.path)}
              className={`px-4 md:px-6 lg:px-8 py-1.5 md:py-2 rounded-[40px] 
                font-medium transition-all duration-300 ${
                  activeItem === item.path
                    ? 'text-white shadow-[0_4px_12px_rgba(30,30,175,0.3)]'
                    : 'text-[#484899] hover:bg-white/60'
                }`}
              style={
                activeItem === item.path
                  ? { background: 'linear-gradient(to right, #1E1EAF, #4040E7)' }
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ──────────────────────────────────────────────── */}
        {/* Mobile Navigation ─────── Slide from RIGHT ─────── */}
        {/* ──────────────────────────────────────────────── */}
        <div className="md:hidden w-full relative">
          <div className="bg-[#D9D9D94D] rounded-[30px] px-4 py-2.5 flex items-center justify-between">
            <span
              className="px-4 py-1 rounded-full text-white text-sm font-poppins"
              style={{ background: 'linear-gradient(to right, #1E1EAF, #4040E7)' }}
            >
              Prayacha
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsMobileMenuOpen((prev) => !prev)
              }}
              className="w-10 h-10 rounded-full bg-white/80 flex flex-col items-center justify-center"
              aria-label="Toggle menu"
            >
              <span
                className={`w-5 h-0.5 bg-[#1E1EAF] rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-[#1E1EAF] rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0 scale-0' : 'mb-1.5'
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-[#1E1EAF] rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </button>
          </div>

          {/* Backdrop (click to close) */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Sliding Menu Panel – from RIGHT, ~50–60% width */}
          <div
            className={`fixed top-0 right-0 bottom-0 z-50 w-10/12 max-w-[320px] bg-white shadow-2xl 
              transition-transform duration-300 ease-in-out
              ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex flex-col h-full">
              {/* Optional header inside drawer */}
              <div className="flex items-center justify-between px-6 py-5 border-b">
                <span className="text-lg font-semibold text-[#1E1EAF]">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => {
                      setActiveItem(item.path)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`block px-6 py-4 text-base font-medium transition
                      ${
                        activeItem === item.path
                          ? 'bg-gradient-to-r from-[#1E1EAF]/10 to-[#4040E7]/10 text-[#1E1EAF] font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar