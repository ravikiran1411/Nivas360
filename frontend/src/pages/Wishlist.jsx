import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const {properties,currency,savedProperty,saveProperty} =useContext(DataContext);

  const wishlistItems= properties.filter((property)=> savedProperty[property.id]);
  let navigate=useNavigate();
  return (
    <div className='bg-slate-200 h-screen pt-10'>
      <div className=''>
        <div className='flex justify-between mb-5 px-3 sm:px-5'> 
          <h1 className='text-xl sm:text-3xl'>Saved Properties:</h1>
          <div className='flex items-center gap-3 pr-5' onClick={()=>navigate(-1)}> 
            <button className='text-xl sm:text-3xl cursor-pointer'>Back</button>
             <img src={assets.viewAll} className='w-5 h-5' /> 
          </div>
        </div>

        {
          wishlistItems.length ===0 && (
            <div className='w-70 sm:w-full bg-slate-100 h-50 sm:h-100 flex flex-col justify-center items-center gap-5  rounded-lg'>
              <p className='text-sm sm:text-3xl font-medium '>No Saved Properties Yet.</p>
              <Link to={'/rent'} > 
                <button className='text-sm sm:text-xl border w-fit h-fit p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg cursor-pointer' >Explore Properties.</button>
              </Link>
            </div>

          )
        }

        {
          wishlistItems.map((property)=>(
            <div key={property.id} className='mt-5 sm:mt-10 pl=-5 bg-slate-50 shadow-md p-1 sm:p-3 sm:mr-15'>
              <div className='flex flex-col sm:flex-row  gap-2 sm:gap-10 '>

                <div className="w-full h-44 sm:w-70 sm:h-50 overflow-hidden rounded-md">
                  <img src={property.images[0]} alt='' className="w-full h-full object-cover"/>
                </div>

                <div className='w-full flex justify-between items-start'>

                  <div className='flex flex-col justify-between gap-1.5 sm:gap-5 p-2 sm:p-0'>
                    <h1 className='text-sm sm:text-2xl font-medium '>{property.title}</h1>
                    <p className='block sm:hidden text-sm font-medium'>{currency}{property.price}</p>
                    <div className='flex flex-1 gap-2'>
                      <img src={assets.map_icon} className='w-4 h-4 sm:w-5 sm:h-5 ' />
                      <span className='text-sm sm:text-md font-medium'>{property.location}</span>
                    </div>
                    <div className='text-sm sm:text-md font-medium flex gap-4'>
                      <p className=''>SqYards:{property.SqYards} </p>
                      <p>North Facing</p>
                      {
                        property.purpose!== 'purchase' && (
                          <p>{property.bhk}</p>
                        )
                      }
                    </div>
                    <div className='flex gap-10'>
                      <button className='border bg-orange-500 hover:bg-orange-600 w-fit p-1 sm:p-2 text-white text-sm sm:text-md cursor-pointer rounded-lg'>Chat With Owner</button>
                      <button className='border p-1  sm:p-2 rounded-lg w-fit bg-blue-500 hover:bg-blue-600 text-white cursor-pointer ' onClick={()=>saveProperty(property.id)} >Remove</button>

                    </div>
                  </div>

                  <div className='hidden sm:flex sm:flex-col sm:gap-15'>
                    <h1 className='text-sm font-medium md:text-3xl sm:font-semibold'>{currency}{property.price}</h1>
                  </div>
                </div>
              </div>
            </div>
          ))
        }

      </div>

    </div>
  )
}

export default Wishlist;