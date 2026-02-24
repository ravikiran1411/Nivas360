import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DataContext } from '../context/DataContext';
import { assets } from '../assets/assets';

const PropertyDetails = () => {
    const {id} =useParams();
    const {properties,currency} = useContext(DataContext);
    const [propertyData,setPropertyData] = useState(null)
    const [image,setImage] = useState(null);
    const [icon,setIcon] =useState(null);
    const [rentMonth,setRentMonth] = useState('')
    const [bedRoom,setBedRoom]= useState(null);

    const fetchData = () =>{
        let property= properties.find((item)=>(
            item.id===id
        ))
        if(!property) return       
            
        setPropertyData(property)
        
        if(property.purpose==='purchase') {
            setIcon(assets.plots_icon)
        }
        else {
            setIcon(assets.home_icon)
        }
        
        if(property.purpose==='rent') {
            setRentMonth('/Month')
        }
        else{
            setRentMonth('')
        }

        if(property.bhk==='1BHK') {
            setBedRoom('1 BedRoom')
        }
        else if(property.bhk==='2BHK') {
            setBedRoom('2 BedRooms')
        }
        else if(property.bhk==='3BHK') {
            setBedRoom('3 BedRooms')
        }
        else{
            setBedRoom('')
        }

        setImage(property.images[0])
    }
    
    useEffect(()=>{
    fetchData();
    },[id,properties])

  return (
    <div className='sm:px-8 mt-5 sm:mb-10 bg-slate-50 rounded-lg'>
        <div className='sm:mx-8  rounded-lg px-2'>
            <div className=' py-3 sm:pt-5 flex flex-col gap-3 sm:mb-4'> 
                <div className='flex flex-col sm:flex-row justify-between sm:px-8'>
                    <div className='text-sm sm:text-2xl font-medium flex gap-2 items-center'>
                        <p className='flex gap-2'> <img src={icon} className='w-4 h-4 sm:w-8 sm:h-8 ' />
                        {propertyData?.title}</p> </div>
                    <div className='text-lg sm:text-3xl font-bold'>{currency}{propertyData?.price}{rentMonth} </div>
                </div>
                <div className='flex gap-2 items-center flex-1 text-sm font-medium sm:text-2xl sm:px-8'>
                    <img src={assets.location_icon} className='w-4  sm:w-7'/>
                    <p>{propertyData?.location}</p>
                </div>
            </div>

            <div className='w-full transition-all duration-500 opacity-100 flex flex-col sm:flex-row sm:gap-4'>
                <div className='sm:w-3/4 max-w-4xl  pt-1 relative '>
                    <div className='w-full h-80 sm:h-155 overflow-hidden rounded relative cursor-pointer' >
                        <img src={image} alt='' className='w-full sm:w-full h-full  auto-scroll'/>
                        <div className='absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded'>
                        {propertyData?.images?.length} Images
                        </div> 
                    </div> 
                </div>
                <div className='flex min-w-33% lg:min-w-0 flex-nowrap overflow-x-scroll md:overflow-hidden gap-5 sm:gap-3 py-5 sm:py-0 bg-slate-50 sm:grid grid-cols-2 '> 
                    {
                        propertyData?.images?.map((img,index)=>(
                            <img src={img} key={index} onClick={()=>setImage(img)} className='w-20 h-20 sm:w-50 sm:h-50 rounded' />
                        ))
                    } 
                </div>
            </div>

            <div>
                <div className="mt-16 bg-white shadow-md rounded-3xl overflow-hidden">
                    <div className="grid sm:grid-cols-2 gap-20 items-center mx-auto">
                        <div className="p-10 flex flex-col gap-6 mx-auto">
                            <p className="text-3xl font-semibold text-gray-800">Connect With Owner</p>
                            <p className="text-gray-500">Chat directly or request a callback to discuss property details.</p>
                            <div className="flex gap-4 flex-wrap">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition cursor-pointer">Chat Now</button>
                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition cursor-pointer">Request Callback</button>
                            </div>
                        </div>
                        <div className="hidden mx-auto sm:flex sm:flex-end">
                            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa" alt="" className="w-1/2 h-1/2 object-cover rounded-2xl opacity-80" />
                        </div>
                    </div>
                </div>

                <div className='bg-white px-4 py-2 rounded sm:mt-10 shadow-md'>
                    <p className='text-lg sm:text-3xl font-semibold text-center'>Property Highlights</p>
                    <div className='flex gap-6 md:justify-between overflow-x-scroll sm:overflow-hidden flex-nowrap sm:flex-4 pt-5 sm:pt-10'> 
                        {
                            propertyData?.purpose!=='purchase' && (
                                <div className='flex flex-col items-center gap-5 min-w-[33%] sm:min-w-0 '>
                                    <img src={assets.bed_icon} className='w-4 h-4 sm:w-7 sm:h-7 ' />
                                    <p className='text-sm font-medium'>{bedRoom}</p>
                                </div>
                            )
                        }
                        <div className='flex flex-col gap-5 items-center min-w-[33%] sm:min-w-0'>
                            <img src={assets.plots_icon} className='w-5 h-5 sm:w-7 sm:h-7' />
                            <p className='text-sm font-medium'>{propertyData?.SqYards}SqYards</p>
                        </div>

                        <div className='flex flex-col items-center gap-5 min-w-[33%] sm:min-w-0'>
                            <img src={assets.parking} className='w-4 h-4 sm:w-7 sm:h-7' />
                            <p className='text-sm font-medium'>CAR/BIKE Parking</p>
                        </div>

                        <div className='flex flex-col items-center gap-4 min-w-[33%] sm:min-w-0'>
                            <p className='border p-1 text-sm font-bold rounded-lg text-center text-slate-600'>STATUS</p>
                            <p className='text-sm font-medium'>Immediately </p>
                        </div>
                    </div>
                </div>

                <div >
                    <ul className='flex justify-around mt-5 sm:mt-10 text-sm sm:text-lg font-medium bg-white shadow-md rounded-lg sm:py-2 cursor-pointer'>
                        <li onClick={()=><a href='/propertydetails' />} className='p-2 rounded-lg hover:text-slate-700 transition-transform duration-200 hover:scale-110' >Property Details</li>
                        <li onClick={()=><a href='' />} className='p-2 rounded-lg hover:text-slate-700 transition-transform duration-200 hover:scale-110'>Description </li>
                        <li  onClick={()=><a href='' />} className='p-2 rounded-lg hover:text-slate-700 transition-transform duration-200 hover:scale-110'>NearBy places</li>
                    </ul>
                </div>

                <div className='mt-5 sm:mt-10 bg-white shadow-lg pl-2 py-2 sm:px-5' id='propertydetails'>
                    <p className='text-lg sm:text-3xl font-semibold'>Property Details</p>
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 pt-5 justify-center sm:ml-10'>

                        <div className=''>
                            <p className='text-md font-medium text-blue-600'>City</p>
                            <p className='text-xl font-medium text-gray-700'>Vishakapatnam</p>
                        </div>

                        <div>
                            <p className='text-md font-medium text-blue-600'>Area/Street</p>
                            <p className='text-xl font-medium text-gray-700'>Sheela Nagar</p>
                        </div>

                        <div>
                            <p className='text-md font-medium text-blue-600'>SqYards</p>
                            <p className='text-xl font-medium text-gray-700'>{propertyData?.SqYards} SqYards</p>
                        </div>

                        <div>
                            <p className='text-md font-medium text-blue-600'>Facing</p>
                            <p className='text-xl font-medium text-gray-700'>East</p>
                        </div>

                        {
                            propertyData?.purpose==='purchase' && (
                                <div>
                                    <p className='text-md font-medium text-blue-600'>Cent Price</p>
                                    <p className='text-xl font-medium text-gray-700'>{currency}80000</p>
                                </div>
                            )
                        }

                        {
                            propertyData?.purpose!=='purchase' && (
                                <div>
                                    <p className='text-md font-medium text-blue-600'>House Type</p>
                                    <p className='text-xl font-medium text-gray-700'>{propertyData?.bhk}</p>
                                </div>
                            )
                        }

                        {
                            propertyData?.purpose==='rent' && (
                                <div>
                                    <p className='text-md font-medium text-blue-600'>Family</p>
                                    <p className='text-xl font-medium text-gray-700'>yes</p>
                                </div>                               
                            )
                        }
                     
                        {
                            propertyData?.purpose==='rent' &&(
                                <div>
                                    <p className='text-md font-medium text-blue-600'>Bachelors</p>
                                    <p className='text-xl font-medium text-gray-700'>Yes</p>
                                </div>
                            )
                        }

                        {
                            propertyData?.purpose!=='purchase' &&(
                                <div>
                                    <p className='text-md font-medium text-blue-600'>House Type</p>
                                    <p className='text-xl font-medium text-gray-700'>Apartment</p>
                                </div>
                            )
                        }
                       
                        <div>
                            <p className='text-md font-medium text-blue-600'>Price Negotiable</p>
                            <p className='text-xl font-medium text-gray-700'>Yes</p>
                        </div>

                        {
                            propertyData?.purpose!=='purchase' && (
                                <div>
                                    <p className='text-md font-medium text-blue-600 '>Water Facility </p>
                                    <p className='text-xl font-medium text-gray-700'>Municipality water</p>
                                </div>
                            )
                        }

                       {
                            propertyData?.purpose!=='purchase' && (
                                <div>
                                    <p className='text-md font-medium text-blue-600'>Parking </p>
                                    <p className='text-xl font-medium text-gray-700'>Car & Bike</p>
                                </div>
                            )
                        }
                        
                        {
                            propertyData?.purpose!=='purchase' && (
                                <div>
                                    <p className='text-md font-medium text-blue-600'>Elevator</p>
                                    <p className='text-xl font-medium text-gray-700'>Yes</p>
                                </div>
                            )
                        }

                    </div>

                </div>

                <div className='mt-5 sm:mt-10 bg-white shadow-md pl-2 py-2 sm:px-5'>
                    <p className='text-lg sm:text-3xl font-semibold text-black/80'>Description</p>
                    <p className='text-sm font-medium py-3 text-gray-600'>This well-located property offers an excellent opportunity for both personal use and long-term investment. 
                        Situated in a peaceful and well-connected neighborhood, it provides easy access to main roads, schools, hospitals, and daily conveniences. 
                        The area is known for its safe surroundings and growing infrastructure. With clear documentation and essential utilities available, 
                        the property is ideal for immediate use or future development. Whether you are looking to build, buy, or rent, this property offers great value 
                        and flexibility.
                    </p>
                </div>
                
                <div className='my-5 sy:my-10 bg-white rounded-lg shadow-md pl-2 py-2 sm:px-5 '>
                    <p className='text-lg sm:text-3xl font-semibold text-black/80'>NearBy Places</p>
                     <div className='grid grid-cols-2 sm:grid-cols-3'>
                        <div className='flex flex-col items-center gap-4 pt-5 sm:pt-10'>
                            <img src={assets.airport} alt='hello' className='w-5 sm:w-8' />
                            <p className='text-lg font-medium text-blue-600'>20km to Airport</p>
                        </div>

                        <div className='flex flex-col items-center gap-4 pt-5 sm:pt-10'>
                            <img src={assets.bus_station} alt='hello' className='w-5 sm:w-8' />
                            <p className='text-lg font-medium text-blue-600'>1.5km to Bus Station</p>
                        </div>

                        <div className='flex flex-col items-center gap-4 pt-5 sm:pt-10'>
                            <img src={assets.railwayStation} alt='hello' className='w-5 sm:w-8' />
                            <p className='text-lg font-medium text-blue-600'>1.5km to Railway Station</p>
                        </div>

                        <div className='flex flex-col items-center gap-4 pt-5 sm:pt-10'>
                            <img src={assets.hospital} alt='hello' className='w-5 sm:w-8' />
                            <p className='text-lg font-medium text-blue-600'>500m to Hospital</p>
                        </div>

                        <div className='flex flex-col items-center gap-4 pt-5 sm:pt-10'>
                            <img src={assets.shopping} alt='hello' className='w-5 sm:w-8' />
                            <p className='text-lg font-medium text-blue-600'>600m to Shopping Mall</p>
                        </div>

                        <div className='flex flex-col items-center gap-4 pt-5 sm:pt-10'>
                            <img src={assets.petrol_bunk} alt='hello' className='w-5 sm:w-8' />
                            <p className='text-lg font-medium text-blue-600'>1km to Gas Station</p>
                        </div>

                        <div className='flex flex-col items-center gap-4 pt-5 sm:pt-10'>
                            <img src={assets.temple} alt='hello' className='w-5 sm:w-8' />
                            <p className='text-lg font-medium text-blue-600'>50m to Temple</p>
                        </div>
                        
                        <div className='flex flex-col items-center gap-4 pt-5 sm:pt-10'>
                            <img src={assets.church} alt='hello' className='w-5 sm:w-8' />
                            <p className='text-lg font-medium text-blue-600'>100m to Church</p>
                        </div>

                        <div className='flex flex-col items-center gap-4 pt-5 sm:pt-10'>
                            <img src={assets.masjid} alt='hello' className='w-5 sm:w-8' />
                            <p className='text-lg font-medium text-blue-600'>240m to Masjid</p>
                        </div>

                    </div>

                </div>

            </div>
            
        </div>
   
    </div>
  )
}

export default PropertyDetails