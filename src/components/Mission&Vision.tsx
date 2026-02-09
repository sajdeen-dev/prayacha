import React, { useState, useEffect, useRef } from 'react'

// ✅ Correct & unique icon imports
import givingPurity from '../assets/icons/Giving Purity.png'
import givingValue from '../assets/icons/Giving Value.png'
import givingTrust from '../assets/icons/Giving Trust.png'

const MissionVision = () => {
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

  const cards = [
    {
      id: 1,
      title: 'Giving Purity',
      description: 'Offering food that is free from chemicals and preservatives',
      icon: givingPurity,
    },
    {
      id: 2,
      title: 'Giving Value',
      description: 'Offering a platform (Swapdots) where items find new life instead of landfills',
      icon: givingValue,
    },
    {
      id: 3,
      title: 'Giving Trust',
      description: 'Offering a brand that is transparent, ethical, and honest',
      icon: givingTrust,
    },
  ]

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full bg-white py-8 px-3 xs:py-10 xs:px-4 sm:py-16 sm:px-6 
                   md:py-20 md:px-8 lg:px-24 mt-8 xs:mt-10 sm:mt-12"
      >
        <div className="max-w-7xl mx-auto text-center">
          {/* Heading */}
          <h2
            className={`text-[26px] leading-[1.3] xs:text-[28px] sm:text-3xl md:text-4xl 
                       lg:text-5xl font-semibold text-black font-poppins mb-6 sm:mb-10
                       reveal-text ${isVisible ? 'reveal-text-active' : ''}`}
            style={{animationDelay: '0.1s'}}
          >
            Our Vision & Mission
          </h2>

          {/* Description */}
          <div
            className="text-black font-poppins text-[13px] xs:text-[14px] sm:text-base 
                       md:text-[18px] leading-relaxed max-w-4xl mx-auto"
          >
            <p className={`mb-4 reveal-text ${isVisible ? 'reveal-text-active' : ''}`}
               style={{animationDelay: '0.2s'}}>
              The journey of Prayacha Ventures did not begin in a boardroom; it began with a divine calling.
            </p>

            <p className={`mb-4 reveal-text ${isVisible ? 'reveal-text-active' : ''}`}
               style={{animationDelay: '0.3s'}}>
              Three years ago, our founder stood at a crossroads. After years of witnessing the adulteration
              in the food we eat and the lack of trust in the online world, a vision began to take shape.
            </p>

            <p className={`mb-4 reveal-text ${isVisible ? 'reveal-text-active' : ''}`}
               style={{animationDelay: '0.4s'}}>
              One night, in a vivid and powerful dream, Lord Sri Tirumala Venkateshwara Swamy appeared.
              The divine message was clear: Move forward. The path is blessed.
            </p>

            <p className={`reveal-text ${isVisible ? 'reveal-text-active' : ''}`}
               style={{animationDelay: '0.5s'}}>
              Thus, Prayacha was born—not just as a business, but as a duty (Seva) to restore purity and
              trust in society.
            </p>
          </div>

          {/* Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 
                       mt-12 sm:mt-16 md:mt-20"
          >
            {cards.map((card, index) => (
              <div
                key={card.id} // ✅ Proper unique key
                className={`mission-card bg-white border border-[#288A2F4D] rounded-2xl 
                           p-6 md:py-8 lg:py-12 flex flex-col items-center text-center 
                           transition-all duration-300 hover:shadow-lg hover:-translate-y-1
                           card-reveal ${isVisible ? 'card-reveal-active' : ''}`}
                style={{animationDelay: `${0.6 + (index * 0.15)}s`}}
              >
                {/* Icon */}
                <div
                  className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 
                             rounded-full bg-gray-100 flex items-center justify-center mb-4"
                >
                  <img
                    src={card.icon}
                    alt={card.title}  
                    className="w-[80%] h-[80%] object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-lg md:text-xl font-semibold text-[#00000099] 
                             font-poppins mb-3"
                >
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm md:text-base text-[#00000080] font-poppins px-4"
                >
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Styles */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .mission-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
        }

        /* === REVEAL ANIMATIONS === */

        /* Text reveal animation - slide up with fade */
        .reveal-text {
          opacity: 0;
          transform: translateY(30px);
          clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
          transition: all 2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-text.reveal-text-active {
          opacity: 1;
          transform: translateY(0);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        /* Card reveal animation - fade + scale + slide */
        .card-reveal {
          opacity: 0;
          transform: translateY(50px) scale(0.9);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-reveal.card-reveal-active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .reveal-text,
          .card-reveal {
            transition: none;
            animation: none;
          }
          
          .reveal-text.reveal-text-active,
          .card-reveal.card-reveal-active {
            opacity: 1;
            transform: none;
            clip-path: none;
          }
        }
      `}</style>
    </>
  )
}

export default MissionVision