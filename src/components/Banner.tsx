import React from 'react'
import cta2 from '../assets/images/banner.png'

const Banner: React.FC = () => {
  return (
    <div className="relative w-full h-64 md:h-80 bg-black overflow-hidden group">
      <div 
        className="absolute inset-0 z-0 transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out" 
        style={{
          backgroundImage: `url(${cta2})`,
          backgroundSize: 'contain',
          // backgroundPosition: 'bottom'
        }}
      ></div>
      
      <div className="absolute inset-0 z-[5] bg-black opacity-60"></div>

      <div className="relative z-10 flex items-center justify-center h-full px-6 md:px-10">
        <h2 className="text-2xl md:text-3xl lg:text-[35px] font-semibold text-white text-center leading-tight max-w-6xl mx-auto ">
        Guided by Faith, Built for the Future.
          <br className="hidden md:block" /> 
          <span className="text-white text-center leading-tight max-w-4xl mx-auto text-[20px] font-poppins font-light mt-12">

          A clear, purpose-driven plan to scale impact, expand reach, and 
          <br className="hidden md:block" /> 
           build a lasting legacy.
          </span>
        </h2>
      </div>
    </div>
  )
}

export default Banner