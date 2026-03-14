import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { DataContext } from '../context/DataContext'
import PropertyStyle from '../components/PropertyStyle'

const Plots = () => {

  const {properties, selectedLocation} = useContext(DataContext)

  const [showFilter, setShowFilter] = useState(false)
  const [plotData, setPlotData] = useState([])
  const [priceRange, setPriceRange] = useState('')

  const togglepricerange = (e) => {
    setPriceRange(e.target.value)
  }

  const propertydata = () => {
    let pcopy = properties.slice()
    pcopy = pcopy.filter(property => property.purpose === 'sell' && property.propertyType === 'plot')

    if (selectedLocation !== '') {
      pcopy = pcopy.filter( p => p.location.city === selectedLocation)
    }

    if (priceRange !== '') {
      if (priceRange === 'below20') {
        pcopy = pcopy.filter(p => p.price < 2000000)
      }
      else if (priceRange === '20-30') {
        pcopy = pcopy.filter(p => p.price >= 2000000 && p.price < 3000000)
      }
      else if (priceRange === '30-40') {
        pcopy = pcopy.filter(p => p.price >= 3000000 && p.price < 4000000)
      }
      else {
        pcopy = pcopy.filter(p => p.price >= 4000000)
      }
    }

    setPlotData(pcopy)
  }

  useEffect(() => {
    propertydata()
  }, [selectedLocation, properties, priceRange])

  return (
    <div className='px-3 sm:px-10 flex flex-col sm:flex-row gap-2 sm:gap-10'>
      <div className='min-w-60'>
        <p className='text-xl my-3 flex items-center gap-2'
          onClick={() => setShowFilter(!showFilter)}>
          Filters
          <img src={assets.dropdown_icon} className={`sm:hidden w-3 h-4 ${showFilter ? ' rotate-90' : ''}`} />
        </p>

        <div className={`border border-slate-300 bg-slate-100 sm:block pl-5 py-5 mt-6 ${showFilter ? '' : 'hidden'}`}>

          <p className='text-lg font-medium mb-3'>Price Range</p>

          <div className='flex flex-col gap-2 text-sm font-light'>
            <p className='flex gap-2'><input type='radio' value='below20' name='price' onChange={togglepricerange} /> Below 20L</p>
            <p className='flex gap-2'><input type='radio' value='20-30' name='price' onChange={togglepricerange} /> 20L-30L</p>
            <p className='flex gap-2'><input type='radio' value='30-40' name='price' onChange={togglepricerange} /> 30L-40L</p>
            <p className='flex gap-2'><input type='radio' value='above40' name='price' onChange={togglepricerange} /> Above 40L</p>
          </div>

        </div>
      </div>

      <div className='sm:w-full lg:mr-15 flex flex-col gap-2 sm:ml-5 sm:mt-10 p-4 rounded'>

        {plotData.map((item) => (
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

export default Plots;