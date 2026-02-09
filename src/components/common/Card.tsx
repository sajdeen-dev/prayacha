import React from 'react'
import cardImage from '../../assets/images/Card.png'

const Card = () => {
  return (
    <div className="w-full
                    max-w-[260px]
                    xs:max-w-[280px]
                    sm:max-w-[320px]
                    md:max-w-[340px]
                    lg:max-w-[379px]
                    h-[280px]
                    xs:h-[300px]
                    sm:h-[345px]
                    md:h-[367px]
                    lg:h-[409px]
                    overflow-hidden 

                    shadow-sm
                    hover:shadow-lg
                    transition-all duration-300
                    flex-shrink-0">
      <img
        src={cardImage}
        alt="Card"
        className="w-full h-full object-cover
                   hover:scale-105
                   transition-transform duration-500 ease-out"
        loading="lazy"
      />
    </div>
  )
}

export default Card