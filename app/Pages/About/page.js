import React from 'react'
import AboutCard from 'app/Components/AboutCard'
import Footer from 'app/Components/Footer'
import AboutDevs from 'app/Components/AboutDevs'

export default function About() {
  return (
    <div className='mt-4 bg-white dark:bg-gray-900 text-black dark:text-white'>
      <AboutCard></AboutCard>
      <h1 className="text-2xl text-center font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">About the Developers</h1>
      <br />
      <br />
      <br />
      <AboutDevs></AboutDevs>
      <Footer></Footer>
    </div>
  )
}
