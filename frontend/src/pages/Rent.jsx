import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { DataContext } from '../context/DataContext'
import PropertyStyle from '../components/PropertyStyle'

const Rent = () => {
  const {properties, selectedLocation, currency} = useContext(DataContext)

  const [showFilter, setShowFilter] = useState(false)
  const [rentalData, setRentalData] = useState([])
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

  const togglepricerange = (e) => {
    setPriceRange(e.target.value)
  }

  const propertydata = () => {
    let pcopy = properties.slice()
    pcopy = pcopy.filter(property => property.purpose === 'rent')

    if (selectedLocation !== '') {
      pcopy = pcopy.filter(p => p.location.city === selectedLocation)
    }

    if (bhkType.length > 0) {
      pcopy = pcopy.filter(p => bhkType.includes(p.bhk + "BHK"))
    }

    if (priceRange !== '') {

      if (priceRange === 'below10k') {
        pcopy = pcopy.filter(p => p.price < 10000)
      }
      else if (priceRange === '10-15') {
        pcopy = pcopy.filter(p => p.price >= 10000 && p.price < 15000)
      }
      else if (priceRange === '15-20') {
        pcopy = pcopy.filter(p => p.price >= 15000 && p.price < 20000)
      }
      else {
        pcopy = pcopy.filter(p => p.price >= 20000)
      }
    }

    setRentalData(pcopy)
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

        <div className={`shadow-md border border-slate-300 bg-slate-100 pl-5 py-5 mt-6 ${showFilter ? '' : 'hidden'} sm:block rounded`}>

          <p className='text-lg mb-3 font-medium'>BHK Type</p>

          <div className='flex flex-col gap-2 text-sm font-light'>
            <p className='flex gap-2'><input type='checkbox' value='1BHK' onChange={togglebhktype} />1BHK</p>
            <p className='flex gap-2'><input type='checkbox' value='2BHK' onChange={togglebhktype} />2BHK</p>
            <p className='flex gap-2'><input type='checkbox' value='3BHK' onChange={togglebhktype} />3BHK</p>
            <p className='flex gap-2'><input type='checkbox' value='4BHK' onChange={togglebhktype} />4BHK</p>
          </div>

        </div>

        <div className={`shadow-md border border-slate-300 bg-slate-100 sm:block pl-5 py-5 mt-6 ${showFilter ? '' : 'hidden'}`}>

          <p className='text-lg font-medium mb-3'>Price Range</p>

          <div className='flex flex-col gap-2 text-sm font-light'>
            <p className='flex gap-2'><input type='radio' value='below10k' name='price' onChange={togglepricerange} /> Below {currency}10,000</p>
            <p className='flex gap-2'><input type='radio' value='10-15' name='price' onChange={togglepricerange} />{currency}10,000-{currency}15,000</p>
            <p className='flex gap-2'><input type='radio' value='15-20' name='price' onChange={togglepricerange} />{currency}15,000-{currency}20,000</p>
            <p className='flex gap-2'><input type='radio' value='above20' name='price' onChange={togglepricerange} />Above {currency}20,000</p>
          </div>

        </div>
      </div>

      <div className='sm:w-full lg:mr-15 flex flex-col gap-2 sm:ml-5 sm:mt-10 p-4 rounded'>

        {rentalData.map((item) => (
          <PropertyStyle
            key={item._id}
            _id={item._id}
            images={item.images}
            location={item.location.city + " " + item.location.area} 
            price={item.price}
            title={item.title}
            SqYards={item.SqYards}
            bhk={item.bhk}
            purpose={item.purpose}
            propertyType={item.propertyType}
            ownerId={item.ownerId?._id}
          />
        ))}

      </div>
    </div>
  )
}

export default Rent;