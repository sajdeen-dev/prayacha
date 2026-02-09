import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const parseValue = (value) => {
    const num = parseInt(value.replace(/\D/g, ''), 10) || 0
    const suffix = value.replace(/[\d]/g, '') || ''
    return { target: num, suffix }
}

const useCountUp = (target, suffix, isInView, duration = 2000) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isInView || target === 0) return

        let startTime
        let rafId

        const animate = (timestamp) => {
            if (startTime === undefined) startTime = timestamp
            const elapsed = timestamp - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easeOut * target))
            if (progress < 1) rafId = requestAnimationFrame(animate)
        }

        rafId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(rafId)
    }, [target, isInView, duration])

    return `${count}${suffix}`
}

const StatCard = ({ value, label, isInView }) => {
    const { target, suffix } = parseValue(value)
    const displayValue = useCountUp(target, suffix, isInView)

    return (
        <div className="flex flex-col items-center justify-center text-center
                       px-3
                       xs:px-4
                       sm:px-2
                       md:px-0
                       transition-transform duration-300
                       hover:scale-105">
            <span className="font-medium text-black font-poppins block
                           text-[36px] leading-[1.2]
                           xs:text-[42px] xs:leading-[1.2]
                           sm:text-[48px] sm:leading-[1.15]
                           md:text-[54px] md:leading-[1.1]
                           lg:text-[60px] lg:leading-[1.1]
                           mb-1
                           xs:mb-1.5
                           sm:mb-2">
                {displayValue}
            </span>
            <span className="font-bold text-black font-poppins
                           text-[16px]
                           xs:text-[17px]
                           sm:text-[18px]
                           md:text-[19px]
                           lg:text-[20px]
                           mt-0.5
                           xs:mt-1
                           sm:mt-1
                           opacity-90">
                {label}
            </span>
        </div>
    )
}

const Testimonial = () => {
    const stats = [
        { value: '100%', label: 'Purity' },
        { value: '2+', label: 'Verticals' },
        { value: '100+', label: 'Values' },
    ]

    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

    return (
        <section
            ref={sectionRef}
            className="w-full bg-white 
                       py-8
                       xs:py-10
                       sm:py-16 
                       md:py-20 
                       mt-8
                       xs:mt-10
                       sm:mt-12
                       mb-8
                       xs:mb-10
                       sm:mb-12
                       px-4
                       xs:px-5
                       sm:px-6
                       md:px-8
                       lg:px-12"
        >
            <div className="max-w-full mx-auto">
                <div className="grid 
                               grid-cols-1 
                               xs:grid-cols-1
                               sm:grid-cols-3 
                               gap-6
                               xs:gap-8
                               sm:gap-10
                               md:gap-16
                               lg:gap-22

                               mx-auto">
                    {stats.map((stat, i) => (
                        <StatCard
                            key={i}
                            value={stat.value}
                            label={stat.label}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                /* Additional mobile optimizations */
                @media (max-width: 374px) {
                    .grid > div span:first-child {
                        font-size: 32px;
                    }
                    .grid > div span:last-child {
                        font-size: 15px;
                    }
                }

                /* Add subtle animations */
                @media (prefers-reduced-motion: no-preference) {
                    .hover\\:scale-105 {
                        transition: transform 0.3s ease-out;
                    }
                }

                /* Better spacing on tablet landscape */
                @media (min-width: 640px) and (max-width: 1023px) {
                    .grid {
                        gap: 2.5rem;
                    }
                }
            `}</style>
        </section>
    )
}

export default Testimonial