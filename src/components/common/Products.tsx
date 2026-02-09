import React, { useState, useEffect, useRef } from "react";
import CategoryTabs from "./CategoryTabs";
import Card from "./Card";

interface Products {
    categoryId: string;
    name: string;
    description: string;
    images: string[];
    imageHighlight: string[];
    tags: string[];
}

const Products = () => {
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
            className="w-full bg-white 
                       py-6 px-3
                       xs:py-7 xs:px-4
                       sm:py-12 sm:px-6 
                       md:py-14 md:px-8 
                       lg:py-16 lg:px-24"
            style={{ 
                paddingTop: "clamp(40px, 8vw, 60px)", 
                paddingBottom: "clamp(40px, 8vw, 60px)" 
            }}
        >
            <div className="max-w-[100%] mx-auto 
                           space-y-4 
                           xs:space-y-5
                           sm:space-y-8 
                           md:space-y-10 
                           lg:space-y-10">
                
                {/* Header Section - Fully Responsive */}
                <div className="space-y-3
                               xs:space-y-4
                               sm:space-y-6 
                               md:space-y-8 
                               lg:space-y-10 
                               mb-6
                               xs:mb-8
                               sm:mb-14 
                               md:mb-16 
                               lg:mb-20
                               px-2
                               xs:px-3
                               sm:px-0">
                    
                    {/* Badge - Fully Responsive with reveal animation */}
                    <span
                        className={`relative inline-flex items-center justify-center 
                                   px-3 py-0.5
                                   xs:px-3.5 xs:py-1
                                   sm:px-4 sm:py-1
                                   md:px-4 md:py-1
                                   rounded-full overflow-hidden button-shimmer-pulse text-white 
                                   text-[12px]
                                   xs:text-[13px]
                                   sm:text-base 
                                   md:text-[16px] 
                                   lg:text-[17.5px] 
                                   font-poppins font-normal
                                   shadow-sm
                                   reveal-animation
                                   ${isVisible ? 'reveal-active' : ''}`}
                        style={{
                            background: 'linear-gradient(to right, #1E1EAF, #4040E7)',
                            animationDelay: '0.1s'
                        }}
                    >
                        <span className="relative z-10">Prayacha</span>
                    </span>

                    {/* Main Heading - Fully Responsive with staggered reveal */}
                    <h2 className="font-semibold font-poppins 
                                  text-[24px] leading-[1.3]
                                  xs:text-[28px] xs:leading-[1.35]
                                  sm:text-3xl sm:leading-[1.4]
                                  md:text-4xl md:leading-relaxed
                                  lg:text-6xl 
                                  xl:text-6xl">
                        <span className={`text-black/30 block 
                                       mb-2
                                       xs:mb-2.5
                                       sm:mb-5 
                                       md:mb-6
                                       reveal-text
                                       ${isVisible ? 'reveal-text-active' : ''}`}
                              style={{animationDelay: '0.2s'}}>
                            An Indian brand with global
                        </span>
                        <span className={`text-black/30 block
                                       mb-2
                                       xs:mb-2.5
                                       sm:mb-5 
                                       md:mb-6
                                       reveal-text
                                       ${isVisible ? 'reveal-text-active' : ''}`}
                              style={{animationDelay: '0.4s'}}>
                            intent, powered by
                        <span className={`text-black/70 
                                       mb-2
                                       xs:mb-2.5
                                       sm:mb-5 
                                       md:mb-6
                                       reveal-text
                                       ${isVisible ? 'reveal-text-active' : ''}`}
                              style={{animationDelay: '0.6s'}}>
                           {' '} truth
                        </span>
                        </span>
                        <span className={`text-black/70 block 
                                       mt-2
                                       xs:mt-2.5
                                       sm:mt-5 
                                       md:mt-6
                                       mb-2
                                       xs:mb-2.5
                                       sm:mb-5 
                                       md:mb-6
                                       reveal-text
                                       ${isVisible ? 'reveal-text-active' : ''}`}
                              style={{animationDelay: '0.8s'}}>
                            happy homes
                        </span>
                    </h2>
                </div>

                {/* Cards Section - Fully Responsive Horizontal Scroll */}
                <div className={`overflow-x-auto overflow-y-hidden 
                               -mx-3
                               xs:-mx-4
                               sm:-mx-6 
                               md:-mx-8 
                               lg:-mx-0
                               scrollbar-hide
                               [&::-webkit-scrollbar]:hidden
                               [-ms-overflow-style:none]
                               [scrollbar-width:none]
                               reveal-animation
                               ${isVisible ? 'reveal-active' : ''}`}
                     style={{animationDelay: '1s'}}>
                    <div className="flex 
                                   gap-3
                                   xs:gap-4
                                   sm:gap-5
                                   md:gap-6
                                   lg:gap-6
                                   pb-2
                                   xs:pb-3
                                   sm:pb-2 
                                   min-w-max w-full
                                   px-3
                                   xs:px-4
                                   sm:px-6
                                   md:px-8
                                   lg:px-0
                                   snap-x snap-mandatory
                                   scroll-smooth">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div 
                                key={i} 
                                className={`snap-start
                                          min-w-[260px]
                                          xs:min-w-[280px]
                                          sm:min-w-[320px]
                                          md:min-w-auto
                                          flex-shrink-0
                                          card-reveal
                                          ${isVisible ? 'card-reveal-active' : ''}`}
                                style={{animationDelay: `${1 + (i * 0.1)}s`}}>
                                <Card />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Optional: Scroll indicator for mobile - Shows there's more content */}
                <div className={`flex justify-center gap-1.5 mt-4 sm:hidden reveal-animation ${isVisible ? 'reveal-active' : ''}`}
                     style={{animationDelay: '1.8s'}}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div 
                            key={i} 
                            className="w-1.5 h-1.5 rounded-full bg-black/20"
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                /* Hide scrollbar for all browsers */
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }

                /* Smooth scroll behavior */
                @media (prefers-reduced-motion: no-preference) {
                    .scroll-smooth {
                        scroll-behavior: smooth;
                    }
                }

                /* Additional mobile optimizations */
                @media (max-width: 374px) {
                    h2 {
                        font-size: 22px;
                        line-height: 1.3;
                    }
                }

                /* Touch-friendly scroll area */
                @media (hover: none) and (pointer: coarse) {
                    .overflow-x-auto {
                        -webkit-overflow-scrolling: touch;
                    }
                }

                /* === REVEAL ANIMATIONS === */

                /* Badge and general reveal animation */
                .reveal-animation {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                                transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .reveal-animation.reveal-active {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* Text reveal animation - slide up with clip-path */
                .reveal-text {
                    opacity: 0;
                    transform: translateY(40px);
                    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
                    transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .reveal-text.reveal-text-active {
                    opacity: 1;
                    transform: translateY(0);
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                }

                /* Card reveal animation - fade + scale */
                .card-reveal {
                    opacity: 0;
                    transform: translateY(40px) scale(0.95);
                    transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                                transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .card-reveal.card-reveal-active {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }

                /* Alternative: Curtain reveal effect for text */
                @keyframes curtainReveal {
                    0% {
                        clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
                    }
                    100% {
                        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                    }
                }

                /* Alternative: Typewriter/character reveal */
                @keyframes characterReveal {
                    0% {
                        width: 0;
                        opacity: 0;
                    }
                    1% {
                        opacity: 1;
                    }
                    100% {
                        width: 100%;
                        opacity: 1;
                    }
                }

                /* Shimmer effect on badge */
                .button-shimmer-pulse::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.3),
                        transparent
                    );
                    animation: shimmer 3s infinite;
                }

                @keyframes shimmer {
                    0% {
                        left: -100%;
                    }
                    100% {
                        left: 100%;
                    }
                }

                /* Reduced motion support */
                @media (prefers-reduced-motion: reduce) {
                    .reveal-animation,
                    .reveal-text,
                    .card-reveal {
                        transition: none;
                        animation: none;
                    }
                    
                    .reveal-animation.reveal-active,
                    .reveal-text.reveal-text-active,
                    .card-reveal.card-reveal-active {
                        opacity: 1;
                        transform: none;
                        clip-path: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default Products;