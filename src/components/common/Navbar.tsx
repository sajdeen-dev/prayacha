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
  const [activeItem, setActiveItem] = useState(location.pathname)

  useEffect(() => {
    setActiveItem(location.pathname)
  }, [location.pathname])

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 py-4 flex-shrink-0 flex justify-center">
      <nav className="bg-[#D9D9D94D]  rounded-[50px] px-5 py-3 inline-flex gap-2 font-poppins">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            onClick={() => setActiveItem(item.path)}
            className={`px-8 py-2 rounded-[40px] text-lg font-medium transition-all duration-300 border-none cursor-pointer ${
              activeItem === item.path
                ? 'text-white shadow-[0_4px_12px_rgba(30,30,175,0.3)]'
                : 'bg-transparent text-[#484899] hover:bg-white/60 hover:text-[#3b4d8f]'
            }`}
            style={activeItem === item.path ? { background: 'linear-gradient(to right, #1E1EAF, #4040E7)' } : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

    
    </div>
  )
}

export default Navbar
