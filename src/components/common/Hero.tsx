import React, { useState, useEffect } from 'react'
import Footer from './Footer'
import ContactModal from './Modal'
import AnimatedText from './AnimatedText'
import swapDotLogo from '../../assets/icons/swapDotLogo.svg'
import rightChevron from '../../assets/icons/rightChevron.svg'
import Navbar from './Navbar'

const  Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [shouldAnimateParagraph, setShouldAnimateParagraph] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(false)

  useEffect(() => {
  }, [shouldAnimateParagraph])

  const handleHeadingComplete = () => {
    const delayMs = 50
    const startTime = Date.now()


    const timerId = setTimeout(() => {
      const elapsed = Date.now() - startTime
      setShouldAnimateParagraph(true)
    }, delayMs)

  }
 
  return ( 
    <>
      <div className="min-h-screen flex flex-col relative bg-[#EFF9FF]">
        <Navbar />
        <div className="absolute w-full h-full overflow-hidden z-0">
          <div
            className="absolute rounded-full blur-[150px] w-[150px] h-[150px] sm:w-[180px] sm:h-[200px] md:w-[214px] md:h-[500px] -left-[60px] sm:-left-[70px] md:-left-[80px]"
            style={{
              background: '#D9D42E',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
          <div
            className="absolute rounded-full blur-[150px] w-[150px] h-[150px] sm:w-[180px] sm:h-[200px] md:w-[214px] md:h-[500px] -right-[60px] sm:-right-[70px] md:-right-[80px]"
            style={{
              background: '#0055E9',
              top: '50%', 
              transform: 'translateY(-50%)'
            }}
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-5 py-6 sm:py-8 md:py-10 relative z-10">
          <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] mb-6 sm:mb-8 md:mb-10 relative">
            {!logoLoaded && (
              <div className="absolute inset-0 animate-pulse rounded-lg" />
            )}

          </div>

          <div className="">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-white rounded-[30px] px-12 py-2 inline-flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <span className="w-3 h-3 bg-[#2525B9] rounded-full flex-shrink-0" />
                <span className="text-lg text-[#00000080] font-medium font-poppins">A divine energy</span>
              </div>
            </div>
            <AnimatedText
              text="Guided by Faith. Built"
              delay={300}
              stepDuration={0.3}
              animateBy="words"
              direction="top"
              startImmediately={true}
              className="text-[38px] sm:text-[46px] md:text-[52px] lg:text-[58px] font-semibold text-black text-center tracking-wide font-unbounded px-2 block"
            />
            <AnimatedText
              text=" for the Future."
              delay={600}
              stepDuration={0.3}
              animateBy="words"
              direction="top"
              startImmediately={true}
              onAnimationComplete={handleHeadingComplete}
              className="text-[38px] sm:text-[46px] md:text-[52px] lg:text-[58px] font-semibold text-black text-center tracking-wide font-unbounded px-2 block"
            />
          </div>

          <AnimatedText
            text="A purpose-driven Indian conglomerate built on purity, trust, and timeless values — creating meaningful products, ethical platforms, and a legacy that serves generations"
            delay={60}
            stepDuration={0.3}
            animateBy="words"
            direction="top"
            startImmediately={shouldAnimateParagraph}
            className="max-w-[780px] text-[14px] sm:text-[15px] md:text-[20px] text-[#000000] text-center mb-6 sm:mb-8 md:mb-10 font-light leading-relaxed px-4 sm:px-6 font-poppins"
          />

          <button
            onClick={() => setIsModalOpen(true)}
            className="relative text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full border-none text-[14px] sm:text-[15px] md:text-[16px] cursor-pointer inline-flex items-center gap-2 sm:gap-2.5 font-poppins w-full sm:w-auto max-w-[280px] sm:max-w-none justify-center overflow-hidden button-shimmer-pulse"
            style={{
              background: 'linear-gradient(to right, #1E1EAF, #4040E7)',
              animation: 'pulse 2s infinite'
            }}
          >
            <span
              className="relative z-10 inline-block"
              style={{
                background: 'linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 25%, #ffffff 50%, rgba(255, 255, 255, 0.8) 75%, #ffffff 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'text-shimmer 5s ease-in-out infinite'
              }}
            >
              Explore Products
            </span>
            <img src={rightChevron} alt="" className="relative z-10 w-2 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <style>{`
            @keyframes text-shimmer {
              0% {
                background-position: -200% 0;
              }
              100% {
                background-position: 200% 0;
              }
            }
            
          

            @keyframes pulse {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.1);
              }
              100% {
                transform: scale(1);
              }
            }

            @keyframes shimmer {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }



            .button-shimmer-pulse::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.3),
                transparent
              );
              transform: translateX(-100%);
              animation: shimmer 3s ease-in-out infinite;
              pointer-events: none;
              z-index: 1;
            }
          `}</style>
        </div>
        {/* <p className='text-center text-black/60 mb-4 text-[14px] sm:text-[15px] md:text-[16px] font-poppins'>A Prayacha Ventures Private Limited Product</p> */}
        {/* <Footer /> */}
      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Hero