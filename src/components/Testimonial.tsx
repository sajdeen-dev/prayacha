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
        <div className="flex flex-col items-center justify-center text-left">
            <span className="text-[60px] font-medium text-black text-left font-poppins block">
                {displayValue} <br />
                {label}
            </span>
            <span className="text-[20px] font-bold text-black text-left font-poppins mt-1">
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
            className="w-full bg-white py-12 sm:py-16 md:py-20 mt-12 mb-12"
        >
            <div className="max-w-full mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-22">
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
        </section>
    )
}

export default Testimonial
