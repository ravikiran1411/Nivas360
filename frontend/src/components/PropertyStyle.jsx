import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import { Link } from 'react-router-dom'

const PropertyStyle = ({
  _id,
  images,
  title,
  price,
  location,
  SqYards,
  bhk,
  purpose,
  propertyType
}) => {

  const {currency} = useContext(DataContext)

  return ( 
    
    <Link
      to={`/property/${_id}`}
      className="w-full bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-4 cursor-pointer"
    >

      <div className="w-full h-44 sm:w-70 sm:h-50 overflow-hidden rounded-md">
        <img src={images?.[0]} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between flex-1 gap-4">
        <div className="flex flex-col gap-3">
          <p className="text-lg font-semibold text-slate-800">{title}</p>

          <p className="text-sm text-slate-500">
            📍 {location?.city}, {location?.area}
          </p>

          <div className="flex gap-6">
            <p className="text-md font-medium">
              <span className="text-gray-700">SqYards:</span> {SqYards}
            </p>

            {propertyType !== "plot" && (
              <p className="text-md font-medium">
                <span className="text-gray-700">BHK:</span> {bhk}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between items-end">
          <p className="text-xl font-bold text-slate-900">
            {currency}{price}
            {purpose === "rent" && "/Month"}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default PropertyStyle;