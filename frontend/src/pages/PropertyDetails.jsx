import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import { assets } from '../assets/assets'

const PropertyDetails = () => {

  const {id} = useParams()
  const { properties, currency } = useContext(DataContext)

  const [propertyData, setPropertyData] = useState(null)
  const [image, setImage] = useState(null)

  useEffect(() => {
    const property = properties.find(item => item._id === id)
    if (!property) return

    setPropertyData(property)
    setImage(property.images[0])

  }, [id, properties])

  if (!propertyData) return null

  return (
    <div className='sm:px-8 mt-5 sm:mb-10 bg-slate-50 rounded-lg'>
      <div className='sm:mx-8 rounded-lg px-2'>
        <div className='py-3 sm:pt-5 flex flex-col gap-3 sm:mb-4'>
          <div className='flex flex-col sm:flex-row justify-between sm:px-8'>
            <div className='text-sm sm:text-2xl font-medium flex gap-2 items-center'>
              <p className='flex gap-2'>
                {propertyData.title}
              </p>
            </div>

            <div className='text-lg sm:text-3xl font-bold'>
              {currency}{propertyData.price}
              {propertyData.purpose === "rent" && "/Month"}
            </div>

          </div>

          <div className='flex gap-2 items-center text-sm font-medium sm:text-2xl sm:px-8'>
            <img src={assets.location_icon} className='w-4 sm:w-7' />
            <p> {propertyData.location.city}, {propertyData.location.area} </p>
          </div>

        </div>

        <div className='flex flex-col sm:flex-row sm:gap-4'>

          <div className='sm:w-3/4 max-w-4xl pt-1'>
            <div className='w-full h-80 sm:h-155 overflow-hidden rounded relative'>
              <img src={image} alt='' className='w-full h-full object-cover' />
              <div className='absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded'>
                {propertyData.images.length} Images
              </div>
            </div>
          </div>

          <div className='flex overflow-x-scroll gap-5 py-5 sm:grid sm:grid-cols-2'>

            {propertyData.images.map((img, index) => (
              <img key={index} src={img} onClick={() => setImage(img)}
                className='w-20 h-20 sm:w-50 sm:h-50 rounded cursor-pointer' />
            ))}

          </div>

        </div>

        <div className='bg-white px-4 py-2 rounded sm:mt-10 shadow-md'>
          <p className='text-lg sm:text-3xl font-semibold text-center'>
            Property Highlights
          </p>

          <div className='flex gap-6 overflow-x-scroll pt-5'>

            {propertyData.propertyType !== "plot" && (
              <div className='flex flex-col items-center gap-5'>
                <img src={assets.bed_icon} className='w-5' />
                <p>{propertyData.bhk} BHK</p>
              </div>
            )}

            <div className='flex flex-col items-center gap-5'>
              <img src={assets.plots_icon} className='w-5' />
              <p>{propertyData.SqYards} SqYards</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default PropertyDetails;