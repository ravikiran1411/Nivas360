import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
const Hero = () => {
    const navigate=useNavigate();

  return (
    <div className='flex bg-slate-200 border border-gray-500 mx-5 sm:mx-15 '>
        <div className='flex flex-col sm:gap-3  w-1/2 justify-center items-center pt-3'>
          <h2 className='text-orange-600 text-lg font-semibold sm:text-4xl sm:font-medium '>Find the Perfect</h2>  
          <h2 className='text-blue-600 text-lg font-semibold sm:text-4xl sm:font-medium'>Property For You</h2>
          <p className='px-8 text-sm font-light text-start hidden sm:block'>Discover your dream house, find the right rental or invest in plots with trusted listings. </p>
          <p className='px-2 text-sm sm:text-md font-semibold text-center'>Smart search—all in one place. </p>
          <button onClick={()=>navigate('/rent')} className='bg-blue-600 text-white text-[10px] sm:text-lg font-sm sm:font-medium hover:bg-blue-700 cursor-pointer px-2 py-1 sm:px-3 sm:py-3 rounded mt-3 mb-4 sm:mt-5'>Start Exploring</button>
        </div>
        <div className='w-1/2 flex justify-end'> 
            <img src={assets.hero_image} alt="" className='w-150'/>
        </div>
    </div>
  )
}

export default Hero;