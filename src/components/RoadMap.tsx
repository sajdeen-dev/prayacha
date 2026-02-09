import React, { useState, useEffect, useRef } from "react";

export default () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6"
      style={{
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');
        
        .phase-circle {
          position: relative;
          width: 80px;
          height: 80px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          z-index: 10;
        }
        
        @media (min-width: 640px) {
          .phase-circle {
            width: 100px;
            height: 100px;
          }
        }
        
        @media (min-width: 768px) {
          .phase-circle {
            width: 120px;
            height: 120px;
          }
        }
        
        @media (min-width: 1024px) {
          .phase-circle {
            width: 140px;
            height: 140px;
          }
        }
        
        .phase-number {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
        }
        
        @media (min-width: 640px) {
          .phase-number {
            font-size: 3rem;
          }
        }
        
        @media (min-width: 768px) {
          .phase-number {
            font-size: 3.5rem;
          }
        }
        
        @media (min-width: 1024px) {
          .phase-number {
            font-size: 4rem;
          }
        }
        
        .arc-left {
          position: absolute;
          width: 90px;
          height: 90px;
          border: 3px solid;
          border-radius: 50%;
          border-right-color: transparent !important;
          border-bottom-color: transparent !important;
          transform: rotate(-45deg);
          left: -5px;
          top: -5px;
        }
        
        @media (min-width: 640px) {
          .arc-left {
            width: 110px;
            height: 110px;
          }
        }
        
        @media (min-width: 768px) {
          .arc-left {
            width: 130px;
            height: 130px;
            border-width: 4px;
          }
        }
        
        @media (min-width: 1024px) {
          .arc-left {
            width: 150px;
            height: 150px;
          }
        }
        
        .arc-right {
          position: absolute;
          width: 90px;
          height: 90px;
          border: 3px solid;
          border-radius: 50%;
          border-left-color: transparent !important;
          border-top-color: transparent !important;
          transform: rotate(-45deg);
          right: -5px;
          top: -5px;
        }
        
        @media (min-width: 640px) {
          .arc-right {
            width: 110px;
            height: 110px;
          }
        }
        
        @media (min-width: 768px) {
          .arc-right {
            width: 130px;
            height: 130px;
            border-width: 4px;
          }
        }
        
        @media (min-width: 1024px) {
          .arc-right {
            width: 150px;
            height: 150px;
          }
        }
        
        .arrow-line {
          height: 2px;
          border-top: 2px dotted currentColor;
          flex-grow: 1;
        }
        
        @media (min-width: 768px) {
          .arrow-line {
            border-top-width: 3px;
          }
        }
        
        .arrow-chevron {
          font-size: 1.25rem;
          font-weight: bold;
          line-height: 1;
        }
        
        @media (min-width: 640px) {
          .arrow-chevron {
            font-size: 1.5rem;
          }
        }
        
        @media (min-width: 768px) {
          .arrow-chevron {
            font-size: 2rem;
          }
        }
        
        .dots-line {
          display: flex;
          gap: 4px;
          margin-top: 12px;
          flex-wrap: wrap;
        }
        
        @media (min-width: 640px) {
          .dots-line {
            gap: 6px;
            margin-top: 14px;
          }
        }
        
        @media (min-width: 768px) {
          .dots-line {
            gap: 8px;
            margin-top: 16px;
          }
        }
        
        .dot {
          width: 4px;
          height: 4px;
          background: #d1d5db;
          border-radius: 50%;
        }
        
        @media (min-width: 640px) {
          .dot {
            width: 5px;
            height: 5px;
          }
        }
        
        @media (min-width: 768px) {
          .dot {
            width: 6px;
            height: 6px;
          }
        }
        
        .icon-container {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        @media (min-width: 640px) {
          .icon-container {
            width: 50px;
            height: 50px;
          }
        }
        
        @media (min-width: 768px) {
          .icon-container {
            width: 60px;
            height: 60px;
          }
        }
        
        /* === REVEAL ANIMATIONS === */
        
        /* Heading reveal animation */
        .reveal-heading {
          opacity: 0;
          transform: translateY(30px);
          clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-heading.reveal-active {
          opacity: 1;
          transform: translateY(0);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        /* Text reveal animation */
        .reveal-text {

          transform: translateY(25px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-text.reveal-active {

          transform: translateY(0);
        }

        /* Phase item reveal */
        .phase-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.9s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .phase-reveal.phase-reveal-active {
          opacity: 1;
          transform: translateY(0);
        }

        /* Circle reveal with scale */
        .circle-reveal {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .circle-reveal.circle-reveal-active {
          opacity: 1;
          transform: scale(1);
        }

        /* Arc reveal with rotation */
        .arc-reveal {
          opacity: 0;
          transform: rotate(-45deg) scale(0.8);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .arc-reveal.arc-reveal-active {
          opacity: 1;
          transform: rotate(-45deg) scale(1);
        }

        /* Content reveal */
        .content-reveal {
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .content-reveal.content-reveal-active {
          opacity: 1;
          transform: translateX(0);
        }

        .content-reveal-right {
          opacity: 0;
          transform: translateX(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .content-reveal-right.content-reveal-active {
          opacity: 1;
          transform: translateX(0);
        }

        /* Icon reveal */
        .icon-reveal {
          opacity: 0;
          transform: scale(0.5) rotate(-180deg);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .icon-reveal.icon-reveal-active {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        
        /* Mobile specific adjustments */
        @media (max-width: 639px) {
          .phase-item {
            flex-direction: column !important;
            text-align: center;
          }
          
          .phase-item > div:first-child {
            margin-bottom: 1.5rem;
          }
          
          .arrow-line {
            display: none;
          }
          
          .dots-line {
            justify-content: center;
          }
          
          .text-left, .text-right {
            text-align: center !important;
          }
          
          .pl-8, .pr-8 {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          .content-reveal,
          .content-reveal-right {
            transform: translateY(20px) !important;
          }

          .content-reveal.content-reveal-active,
          .content-reveal-right.content-reveal-active {
            transform: translateY(0) !important;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .reveal-heading,
          .reveal-text,
          .phase-reveal,
          .circle-reveal,
          .arc-reveal,
          .content-reveal,
          .content-reveal-right,
          .icon-reveal {
            transition: none;
            animation: none;
          }
          
          .reveal-heading.reveal-active,
          .reveal-text.reveal-active,
          .phase-reveal.phase-reveal-active,
          .circle-reveal.circle-reveal-active,
          .arc-reveal.arc-reveal-active,
          .content-reveal.content-reveal-active,
          .content-reveal-right.content-reveal-active,
          .icon-reveal.icon-reveal-active {
            opacity: 1;
            transform: none;
            clip-path: none;
          }
        }
      `}</style>

      {/* Header */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <div className="w-full bg-white py-6 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8 lg:py-14 lg:px-16 xl:py-16 xl:px-24 rounded-xl">
          <div className="space-y-4 sm:space-y-6 mb-4 sm:mb-6">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] font-semibold font-poppins leading-tight sm:leading-relaxed reveal-heading ${isVisible ? 'reveal-active' : ''}`}
                style={{animationDelay: '0.1s'}}>
              <span className="text-black/30">Our 5 years </span>
              <span className="text-black/70">Roadmap</span>
            </h2>
          <p className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[28px] text-[#000000] max-w-5xl leading-relaxed  ${isVisible ? 'reveal-active' : ''}`}
             style={{animationDelay: '0.2s'}}>
            From strong foundations today to global impact tomorrow — our
            <br className="hidden sm:block" />
            journey has only begun
          </p>
          </div>
        </div>
      </div>

      <div className="max-w-full px-24 mx-auto space-y-8 sm:space-y-10 md:space-y-12">
        {/* PHASE 1 */}
        <div
          className={`phase-item flex items-center justify-between phase-reveal ${isVisible ? 'phase-reveal-active' : ''}`}
          style={{ color: "#000", animationDelay: '0.3s' }}
        >
          {/* Left: Circle with Arc */}
          <div className="relative flex-shrink-0">
            <div className={`arc-left arc-reveal ${isVisible ? 'arc-reveal-active' : ''}`} 
                 style={{ borderColor: "#4FC3F7", animationDelay: '0.4s' }}></div>
            <div className={`phase-circle circle-reveal ${isVisible ? 'circle-reveal-active' : ''}`}
                 style={{animationDelay: '0.45s'}}>
              <span className="phase-number" style={{ color: "#4FC3F7" }}>
                1
              </span>
            </div>
          </div>

          {/* Center: Content */}
          <div className="flex-grow mx-3 sm:mx-4 md:mx-6 lg:mx-8">
            {/* Arrow Top */}
            <div
              className="hidden sm:flex items-center mb-4 md:mb-6"
              style={{ color: "#000" }}
            >
              <div className="arrow-line"></div>
              <span className="arrow-chevron mx-2">››</span>
              <div className="arrow-line"></div>
            </div>

            {/* Text Content */}
            <div className={`text-left pl-0 sm:pl-4 md:pl-6 lg:pl-8 content-reveal ${isVisible ? 'content-reveal-active' : ''}`}
                 style={{animationDelay: '0.5s'}}>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3"> 
                Foundation & Launch
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed">
                Launch Swapdots in Bangalore and establish Prayacha Foods supply
                chain to create a sustainable marketplace ecosystem.
              </p>
            </div>

            {/* Dots */}
            <div className="dots-line pl-0 sm:pl-4 md:pl-6 lg:pl-8">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="dot"></div>
              ))}
            </div>
          </div>

          {/* Right: Icon */}
          <div className={`icon-container icon-reveal ${isVisible ? 'icon-reveal-active' : ''}`}
               style={{animationDelay: '0.6s'}}>
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              style={{ color: "#4FC3F7" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* PHASE 2 */}
        <div
          className={`phase-item flex items-center justify-between flex-row-reverse phase-reveal ${isVisible ? 'phase-reveal-active' : ''}`}
          style={{ color: "#42A5F5", animationDelay: '0.7s' }}
        >
          {/* Right: Circle with Arc */}
          <div className="relative flex-shrink-0">
            <div className={`arc-right arc-reveal ${isVisible ? 'arc-reveal-active' : ''}`} 
                 style={{ borderColor: "#42A5F5", animationDelay: '0.8s' }}></div>
            <div className={`phase-circle circle-reveal ${isVisible ? 'circle-reveal-active' : ''}`}
                 style={{animationDelay: '0.85s'}}>
              <span className="phase-number" style={{ color: "#42A5F5" }}>
                2
              </span>
            </div>
          </div>

          {/* Center: Content */}
          <div className="flex-grow mx-3 sm:mx-4 md:mx-6 lg:mx-8">
            {/* Arrow Top */}
            <div
              className="hidden sm:flex items-center mb-4 md:mb-6 flex-row-reverse"
              style={{ color: "#000" }}
            >
              <div className="arrow-line"></div>
              <span className="arrow-chevron mx-2">‹‹</span>
              <div className="arrow-line"></div>
            </div>

            {/* Text Content */}
            <div className={`text-right pr-0 sm:pr-4 md:pr-6 lg:pr-8 content-reveal-right ${isVisible ? 'content-reveal-active' : ''}`}
                 style={{animationDelay: '0.9s'}}>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">
                Regional Expansion
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed">
                Expand to South India (Tamil Nadu, Andhra, Telangana) and launch
                "Prayacha Lifestyle" eco-fashion brand.
              </p>
            </div>

            {/* Dots */}
            <div className="dots-line justify-end pr-0 sm:pr-4 md:pr-6 lg:pr-8">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="dot"></div>
              ))}
            </div>
          </div>

          {/* Left: Icon */}
          <div className={`icon-container icon-reveal ${isVisible ? 'icon-reveal-active' : ''}`}
               style={{animationDelay: '1s'}}>
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              style={{ color: "#42A5F5" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
        </div>

        {/* PHASE 3 */}
        <div
          className={`phase-item flex items-center justify-between phase-reveal ${isVisible ? 'phase-reveal-active' : ''}`}
          style={{ color: "#000", animationDelay: '1.1s' }}
        >
          {/* Left: Circle with Arc */}
          <div className="relative flex-shrink-0">
            <div className={`arc-left arc-reveal ${isVisible ? 'arc-reveal-active' : ''}`} 
                 style={{ borderColor: "#7E57C2", animationDelay: '1.2s' }}></div>
            <div className={`phase-circle circle-reveal ${isVisible ? 'circle-reveal-active' : ''}`}
                 style={{animationDelay: '1.25s'}}>
              <span className="phase-number" style={{ color: "#7E57C2" }}>
                3
              </span>
            </div>
          </div>

          {/* Center: Content */}
          <div className="flex-grow mx-3 sm:mx-4 md:mx-6 lg:mx-8">
            {/* Arrow Top */}
            <div
              className="hidden sm:flex items-center mb-4 md:mb-6 dotted"
              style={{ color: "#000" }}
            >
              <div className="arrow-line"></div>
              <span className="arrow-chevron mx-2">››</span>
              <div className="arrow-line"></div>
            </div>

            {/* Text Content */}
            <div className={`text-left pl-0 sm:pl-4 md:pl-6 lg:pl-8 content-reveal ${isVisible ? 'content-reveal-active' : ''}`}
                 style={{animationDelay: '1.3s'}}>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">
                Global Impact & Scale
              </h3>
              <div className="text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed space-y-1 sm:space-y-2">
                <p>• Global Expansion: Take Swapdots to South Asian markets</p>
                <p>
                  • Offline Presence: Open "Prayacha Experience Stores" and
                  "Swap Spots"
                </p>
                <p>
                  • Social Impact: Partner with 1000+ NGOs to channel Giveaways
                </p>
              </div>
            </div>

            {/* Dots */}
            <div className="dots-line pl-0 sm:pl-4 md:pl-6 lg:pl-8">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="dot"></div>
              ))}
            </div>
          </div>

          {/* Right: Icon */}
          <div className={`icon-container icon-reveal ${isVisible ? 'icon-reveal-active' : ''}`}
               style={{animationDelay: '1.4s'}}>
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              style={{ color: "#7E57C2" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};