import React from 'react'
import Hero from '../components/common/Hero'
import Products from '../components/common/Products'
import MissionVision from '../components/Mission&Vision'
import RoadMap from '../components/RoadMap'
import Testimonial from '../components/Testimonial'
import Form from '../components/Form'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
const Home = () => {
  return ( 
    <>
    <Hero />
    <Products />
    <MissionVision />
    <RoadMap /> 
    <Testimonial />
    <Form isOpen={true} onClose={() => {}} />
    <Banner />
    </>
  )
}

export default Home 