import React from 'react'
import cardImage from '../../assets/images/Card.png'

const Card = () => {
  return (
    <div className="w-[379px] h-[409px] overflow-hidden ">
      <img
        src={cardImage}
        alt="Card"
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export default Card