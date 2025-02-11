import React from 'react'
import Hero from '../Components/Hero'
import AboutUs from '../Components/AboutUs'
import Portfolio from '../Components/Portfolio'
import Products from '../Components/Products'
import About from '../Components/About'
import Survey from '../Components/Survey'
import Testimonials from '../Components/Testimonials'
import FAQ from '../Components/FAQ'

function Home() {
  return (
    <div className='home_page'>
      <Hero />
      <AboutUs />
      <Portfolio />
      <Products/>
      <About/>
      <Survey/>
      <Testimonials/>
      <FAQ/>


    </div>
  )
}

export default Home
