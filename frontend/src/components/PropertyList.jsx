import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/DataContext'

const PropertyList = ({ id, title, price, image }) => {
  const { currency } = useContext(DataContext)

  return (
    <Link to={`/property/${id}`} target='_blank' rel='noopener noreferrer' className="cursor-pointer block">

      <div className="w-full h-40 sm:h-56 overflow-hidden rounded bg-gray-100">
        <img src={image[0]} alt={title} className="w-full h-full object-cover"/>
      </div>

      <div className="flex flex-col">
        <p className="pt-3 pb-1 text-sm pl-2">{title}</p>
        <p className="text-sm font-medium pl-2"> {currency} {price}</p>
      </div>

    </Link>
  )
}


export default PropertyList