import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../context/DataContext'

const HaveProperty = () => {

  const navigate = useNavigate()
  const { user, token } = useContext(DataContext)

  const handlePostProperty = () => {

    // Not logged in
    if (!token) {
      navigate("/login")
      return
    }

    // Logged in but not owner
    if (user?.role !== "owner") {
      navigate("/owner-request")
      return
    }

    // If owner → open owner dashboard
    window.location.href = "http://localhost:5174"

  }

  return (
    <div className='flex items-center justify-center gap-5 sm:gap-25 sm:mx-15 bg-slate-100 rounded-md my-3 sm:my-15 py-2 sm:py-9'>

      <div>
        <img src={assets.post_property} alt='' className='w-30 sm:w-70' />
      </div>

      <div className='flex flex-col gap- sm:gap-5'>

        <h2 className='text-md font-bold sm:text-4xl text-slate-900 py-4'>
          Looking to Sell or Rent Your Property?
        </h2>

        <p className='font-light text-[10px] sm:text-lg sm:font-normal'>
          List your house, rental property, or plot on Nivas360 and reach genuine buyers and tenants faster.
        </p>

        <div className='flex justify-center mt-2'>
          <button
            onClick={handlePostProperty}
            className='bg-orange-500 text-[15px] text-white px-3 sm:px-6 py-1 sm:py-3 sm:font-bold rounded sm:rounded-xl hover:bg-orange-600'
          >
            Post Your Property
          </button>
        </div>

      </div>

    </div>
  )
}

export default HaveProperty