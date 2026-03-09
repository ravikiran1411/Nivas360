import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Wishlist = () => {
  const {properties, currency, savedProperty, saveProperty} = useContext(DataContext)

  const wishlistItems = properties.filter(property => savedProperty[property._id] )

  const navigate = useNavigate()

  return (
    <div className='bg-slate-200 h-screen pt-10'>
      <div className='flex justify-between mb-5 px-3 sm:px-5'>
        <h1 className='text-xl sm:text-3xl'>Saved Properties:</h1>
        <div className='flex items-center gap-3 pr-5'
          onClick={() => navigate(-1)}>
          <button className='text-xl sm:text-3xl cursor-pointer'>
            Back
          </button>
          <img src={assets.viewAll} className='w-5 h-5' />
        </div>

      </div>

      {wishlistItems.length === 0 && (
        <div className='w-70 sm:w-full bg-slate-100 h-50 sm:h-100 flex flex-col justify-center items-center gap-5 rounded-lg'>
          <p className='text-sm sm:text-3xl font-medium'>
            No Saved Properties Yet.
          </p>
          <Link to={'/rent'}>
            <button className='text-sm sm:text-xl border p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg cursor-pointer'>
              Explore Properties.
            </button>
          </Link>
        </div>
      )}

      {wishlistItems.map((property) => (

        <div key={property._id} className='mt-5 sm:mt-10 bg-slate-50 shadow-md p-1 sm:p-3 sm:mr-15'>
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-10'>
            <div className="w-full h-44 sm:w-70 sm:h-50 overflow-hidden rounded-md">
              <img src={property.images[0]} className="w-full h-full object-cover" />
            </div>

            <div className='w-full flex justify-between items-start'>
              <div className='flex flex-col gap-3 p-2'>
                <h1 className='text-sm sm:text-2xl font-medium'>
                  {property.title}
                </h1>
                <p className='block sm:hidden text-sm font-medium'>
                  {currency}{property.price}
                </p>

                <div className='flex gap-2'>
                  <img src={assets.map_icon} className='w-4 h-4' />
                  <span className='text-sm sm:text-md font-medium'>
                    {property.location.city}
                  </span>
                </div>

                <div className='text-sm sm:text-md font-medium flex gap-4'>
                  <p>SqYards:{property.SqYards}</p>
                  {property.propertyType !== "plot" &&
                    <p>{property.bhk}BHK</p>
                  }
                </div>

                <div className='flex gap-10'>
                  <button className='border bg-blue-500 hover:bg-blue-600 p-2 text-white rounded-lg'
                    onClick={() => saveProperty(property._id)}>
                    Remove
                  </button>
                </div>

              </div>

              <div className='hidden sm:flex sm:flex-col'>
                <h1 className='text-3xl font-semibold'>
                  {currency}{property.price}
                </h1>
              </div>

            </div>
          </div>
        </div>

      ))}

    </div>
  )
}

export default Wishlist;