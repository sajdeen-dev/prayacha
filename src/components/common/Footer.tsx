import React from 'react'

const Footer = () => {
  return (
    <footer className="relative z-10 bg-[#3C3CDF] py-1 sm:py-5 px-3 sm:px-5 flex justify-center items-center gap-2 sm:gap-6 md:gap-[60px] flex-wrap md:flex-row flex-col font-poppins">
      <a
        href="#"
        className="text-white no-underline flex items-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-sm hover:opacity-80 transition-opacity"
      >
        <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
        <span className="text-center sm:text-left leading-tight">Connect us on Instagram</span>
      </a>
      <a
        href="mailto:swapdots@gmail.com"
        className="text-white no-underline flex items-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-sm hover:opacity-80 transition-opacity"
      >
        <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        <span className="text-center sm:text-left break-all sm:break-normal leading-tight">Email us at swapdots@gmail.com</span>
      </a>
    </footer>
  )
}

export default Footer