import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { DataContext } from '../context/DataContext'
import PropertyStyle from '../components/PropertyStyle'

const House = () => {
  const {properties, selectedLocation} = useContext(DataContext)

  const [showFilter, setShowFilter] = useState(false)
  const [houseData, setHouseData] = useState([])
  const [bhkType, setBhkType] = useState([])
  const [priceRange, setPriceRange] = useState('')

  const togglebhktype = (e) => {
    if (bhkType.includes(e.target.value)) {
      setBhkType(prev => prev.filter(item => item !== e.target.value))
    } 
    else {
      setBhkType(prev => [...prev, e.target.value])
    }
  }

  const togglepricerange = (e) => {setPriceRange(e.target.value)}

  const propertydata = () => {
    let pcopy = properties.slice()
    pcopy = pcopy.filter(property => property.purpose === 'sell' && property.propertyType !== 'plot')

    if (selectedLocation !== '') {
      pcopy = pcopy.filter( p => p.location.city === selectedLocation)
    }

    if (bhkType.length > 0) {
      pcopy = pcopy.filter( p => bhkType.includes(p.bhk + "BHK") )
    }

    if (priceRange !== '') {

      if (priceRange === 'below40') {
        pcopy = pcopy.filter(p => p.price < 4000000)
      }
      else if (priceRange === '40-60') {
        pcopy = pcopy.filter(p => p.price >= 4000000 && p.price < 6000000)
      }
      else if (priceRange === '60-80') {
        pcopy = pcopy.filter(p => p.price >= 6000000 && p.price < 8000000)
      }
      else {
        pcopy = pcopy.filter(p => p.price >= 8000000)
      }
    }

    setHouseData(pcopy)
  }

  useEffect(() => {
    propertydata()
  }, [selectedLocation, properties, bhkType, priceRange])

  return (
    <div className='px-3 sm:px-10 flex flex-col sm:flex-row gap-2 sm:gap-10'>

      <div className='min-w-60'>
        <p className='text-xl my-3 flex items-center gap-2'
          onClick={() => setShowFilter(!showFilter)}>
          Filters
          <img src={assets.dropdown_icon}
            className={`sm:hidden w-3 h-4 ${showFilter ? ' rotate-90' : ''}`} />
        </p>

        <div className={`border border-slate-300 bg-slate-100 pl-5 py-5 mt-6 ${showFilter ? '' : 'hidden'} sm:block rounded`}>

          <p className='text-lg mb-3 font-medium'>BHK Type</p>

          <div className='flex flex-col gap-2 text-sm font-light'>
            <p><input type='checkbox' value='1BHK' onChange={togglebhktype} />1BHK</p>
            <p><input type='checkbox' value='2BHK' onChange={togglebhktype} />2BHK</p>
            <p><input type='checkbox' value='3BHK' onChange={togglebhktype} />3BHK</p>
            <p><input type='checkbox' value='4BHK' onChange={togglebhktype} />4BHK</p>
          </div>

        </div>

        <div className={`border border-slate-300 bg-slate-100 sm:block pl-5 py-5 mt-6 ${showFilter ? '' : 'hidden'}`}>

          <p className='text-lg font-medium mb-3'>Price Range</p>

          <div className='flex flex-col gap-2 text-sm font-light'>
            <p><input type='radio' value='below40' name='price' onChange={togglepricerange} /> Below 40L</p>
            <p><input type='radio' value='40-60' name='price' onChange={togglepricerange} /> 40L-60L</p>
            <p><input type='radio' value='60-80' name='price' onChange={togglepricerange} /> 60L-80L</p>
            <p><input type='radio' value='above80' name='price' onChange={togglepricerange} /> Above 80L</p>
          </div>

        </div>
      </div>

      <div className='flex flex-col gap-2 sm:ml-5 sm:mt-10 p-4 rounded'>

        {houseData.map((item) => (
          <PropertyStyle
            key={item._id}
            _id={item._id}
            images={item.images}
            location={item.location.city + ", " + item.location.area}
            price={item.price}
            title={item.title}
            SqYards={item.SqYards}
            bhk={item.bhk}
            purpose={item.purpose}
          />
        ))}

      </div>
    </div>
  )
}

export default House;