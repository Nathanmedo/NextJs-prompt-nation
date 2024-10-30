import React from 'react'
import { Poppins, Montserrat } from 'next/font/google'

const poppins = Poppins({
  weight: ['700'],
  subsets: ['latin']
})

const montserrat = Montserrat({
  weight: ['700'],
  subsets: ['latin']
})

const HomeDirectory = () => {
  return (
    <div className="hero bg-bgImageOne bg-cover h-screen bg-center ">
      <div className='flex justify-center items-center flex-col pt-5 h-[400px] w-full'>
      <span className={`${montserrat.className} font-bold description text-white capitalize lg:text-[50px] sm:text-3xl opacity-[200%]`}>Discover &</span>
      <div className={`main_head ${montserrat.className}`}>Share AI Related Prompts</div>
      <div className={`${poppins.className} text-center px-6 description text-white font-bold`}>
      Explore, create, and share innovative prompts with a vibrant community of AI enthusiasts. Fuel your creativity, exchange ideas, and discover endless possibilities through collaborative prompt engineering.
      </div>
      </div>
    </div>
  )
}

export default HomeDirectory;