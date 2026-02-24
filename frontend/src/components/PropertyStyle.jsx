import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import { Link } from 'react-router-dom'

const PropertyStyle = ({ images, id, title, price, location,SqYards,bhk,purpose }) => {
  const { currency,saveProperty,savedProperty } = useContext(DataContext)

  return (
    <div className="w-full bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-4 cursor-pointer">
        < Link to={`/property/${id}`} target='_blank' rel='noopener noreferrer'> 
        <div className="w-full h-44 sm:w-70 sm:h-50 overflow-hidden rounded-md">
            <img src={images[0]} alt={title} className="w-full h-full object-cover"/>
        </div>
        </Link>
        <div className=" flex flex-col sm:flex-row sm:justify-between flex-1 gap-4 sm:w-175">
            <div className="flex flex-col sm:gap-10">
                <div className='flex flex-col gap-3'> 
                <p className="text-lg font-semibold text-slate-800">{title}</p>
                <p className="text-sm text-slate-500">{'\uD83D\uDCCD'} {location}</p>
                <div className='flex sm:gap-10'>
                <p className='text-lg font-medium hidden sm:block'><span className='text-gray-700 text-lg'>SqYards: </span>{SqYards}</p>
                { purpose!=='purchase' &&
                    (
                    <p className="text-lg font-medium hidden sm:inline-flex">
                    <span className="text-gray-700 text-lg font-medium">Bhk: </span>{bhk}
                    </p>
                    )
                }
                </div>

                </div>
                <div className='flex justify-center gap-10'>
                    <button onClick={()=>saveProperty(id)} className={`w-fit ${savedProperty[id]? ' bg-blue-500 text-white  hover:bg-blue-600' :  'bg-orange-500 text-white  hover:bg-orange-600' } px-4 py-2 rounded text-sm transition cursor-pointer hidden sm:block shadow-md min-w-32.5`} >
                        {savedProperty[id] ? 'Saved ': 'Save Property' }</button>
                    <button className='w-fit bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md text-sm transition cursor-pointer hidden sm:block shadow-md '>Chat with Owner</button>
                </div>
            </div>
            
            <div className="flex flex-row sm:flex-col justify-between sm:items-end items-center gap-3">    
                <p className="text-xl font-bold text-slate-900 pr-5"> {currency}{price} </p>
            </div>
        </div>
        
    </div>
  )
}

export default PropertyStyle;