import React from 'react'
import givingPurity from '../assets/icons/Giving Purity.png'
import givingValue from '../assets/icons/Giving Value.png'
import givingTrust from '../assets/icons/Giving Trust.png'

const MissionVision = () => {
    const cards = [
        {
            title: 'Giving Purity',
            description: 'Offering food that is free from chemicals and preservatives',
            icon: givingPurity,
        },
        {
            title: 'Giving Value',
            description: 'Offering a platform (Swapdots) where items find new life instead of landfills',
            icon: givingValue,
        },
        {
            title: 'Giving Trust',
            description: 'Offering a brand that is transparent, ethical, and honest',
            icon: givingTrust,
        },
    ]

    return (
        <section className="w-full bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-24 mt-12">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black font-poppins mb-8 sm:mb-10 md:mb-12">
                    Our Vision & Mission
                </h2>

                <div className="space-y-6 text-black font-400 lineHeight-[20px] font-poppins text-sm sm:text-base md:text-[18px] leading-relaxed text-center  mx-auto">
                    The journey of Prayacha Ventures did not begin in a boardroom; it began with a divine calling.
                    <br />
                    Three years ago, our founder stood at a crossroads. After years of witnessing the adulteration in the food we eat
                    <br />
                    and the lack of trust in the online world, a vision began to take shape. But with big dreams came big doubts—how
                    <br />
                    could a new company compete with established giants?
                    <br />
                    One night, in a vivid and powerful dream, Lord Sri Tirumala Venkateshwara Swamy appeared. The divine message
                    <br />
                    was clear: Move forward. The path is blessed.
                    <br />
                    Events in the real world began to mirror the dream, removing every fear and replacing it with unshakeable
                    <br />
                    conviction1. Thus, Prayacha was born—not just as a business, but as a duty (Seva) to restore purity and trust in
                    <br />
                    society.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-18 sm:gap-12 mt-12 sm:mt-16 md:mt-20 h-[380px]  justify-center">
                    {cards.map((card, i) => (
                        <div
                            key={i}
                            className="bg-white  border border-[#288A2F4D] rounded-2xl   p-2 sm:py-12 flex flex-col items-center text-center"
                        >
                            <div className="w-48 h-48 sm:w-48 sm:h-48 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <img src={card.icon} alt={card.title} className="w-[80%] h-[80%] object-cover" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-[#00000099] font-poppins mt-6">
                                {card.title}
                            </h3>
                            <p className="text-sm sm:text-base text-[#00000080] px-12 font-poppins mt-6 leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MissionVision
