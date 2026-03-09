import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import PropertyList from './PropertyList'

const HouseForSale = () => {

  const { properties, selectedLocation } = useContext(DataContext)
  const [house, setHouse] = useState([])

  useEffect(() => {
    let propertyCopy = properties.slice()
    propertyCopy = propertyCopy.filter((property) => property.purpose === 'sell' && property.propertyType !== 'plot')

    if (selectedLocation !== '') {
      propertyCopy = propertyCopy.filter((p) => p.location.city === selectedLocation )
    }

    setHouse(propertyCopy.slice(0, 5))

  }, [properties, selectedLocation])

  return (
    <div className="mx-5 sm:mx-15 bg-slate-50 px-6 py-8 mt-10 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl sm:text-4xl font-semibold text-slate-800">Houses for Sale</p>

        <NavLink to="/houses" className="flex items-center gap-2">
          <button className="hidden sm:block text-base sm:text-lg font-medium text-orange-500 hover:text-orange-600 transition">
            View All
          </button>
          <img className="w-4 h-4 mt-1" src={assets.viewAll} alt="view all" />
        </NavLink>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {house.map((property, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <PropertyList
              id={property._id}
              image={property.images}
              title={property.title}
              price={property.price}
            />
          </div>
        ))}
      </div>

    </div>
  )
}

export default HouseForSale;