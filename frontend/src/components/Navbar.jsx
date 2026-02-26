import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom' 
import { assets } from '../assets/assets'
import LocationSelector from './LocationSelector'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const [visible,setvisible]=useState(false)
  const navigate=useNavigate();

  return (
    <div className="bg-slate-200 pb-10">
      <div className="">
        <div className="flex justify-around items-center py-2 sm:py-6 font-normal sm:font-medium bg-blue-800"> 
          <Link to= "/"> 
          <img src={assets.nivas_logo} alt="logo" className="w-20 sm:w-40" />
          </Link>

          <LocationSelector />

          <NavLink to="/rent" className={({ isActive }) =>`hidden sm:block text-xl font-medium cursor-pointer ${isActive ? "text-orange-400" : "text-white"}`}> Rent</NavLink>

          <NavLink to="/houses" className={({ isActive }) =>`hidden sm:block text-xl font-medium cursor-pointer ${isActive ? "text-orange-400" : "text-white"}`}> House</NavLink>

          <NavLink to="/plots" className={({ isActive }) =>`hidden sm:block text-xl font-medium cursor-pointer ${isActive ? "text-orange-400" : "text-white"}`}> Plots</NavLink>
         
          <NavLink to="/whynivas" className={({ isActive }) =>`hidden sm:block text-xl font-medium cursor-pointer ${isActive ? "text-orange-400" : "text-white"}`}>Why Nivas ?</NavLink>

          <div className="flex gap-4 sm:gap-15 items-center">
            <Link to='/wishlist' className=''>
              <img src={assets.wishlist_icon} alt='' className="w-5 sm:w-6 md:w-8" />
            </Link>

           {/*  <img className="w-3 md:w-8" src={assets.profile_icon} alt="profile" /> */}

                <div className="group relative">
                <img  src={assets.profile_icon} 
                className="w-8 h-8 cursor-pointer rounded-full border-2 border-slate-100 p-1 " alt="profile-icon"/>
                 
                <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 "> 
                    <div className="flex flex-col gap-2 w-36 py-3 px-3 bg-blue-200 rounded rounded border-2 ">
                        <p onClick={()=>navigate('/profile')} className="cursor-pointer hover:text-orange-500 text-orange-600 text-lg ">My Profile</p>
                        <p  className="cursor-pointer hover:text-orange-500 text-orange-600 text-lg ">Sell property</p>
                        <p className="cursor-pointer hover:text-orange-500 text-orange-600 text-lg ">Logout</p>
                    </div>
                </div> 
            </div>

            <img onClick={()=>setvisible(true)} src={assets.menu_icon} alt='' className='w-8 h-10 cursor-pointer sm:hidden' />

            <div className={`fixed top-0 right-0 h-full w-75 z-50 transform ${visible ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 sm:hidden bg-blue-900`} >
              <div className="flex justify-end p-5">
                <button onClick={() => setvisible(false)}className="text-2xl font-bold text-white hover:text-orange-400">✕</button>
              </div>
              <ul className="flex flex-col gap-6 px-6 font-medium text-slate-200">
                <NavLink onClick={() => setvisible(false)} to="/" className="hover:text-white">HOME</NavLink>
                <NavLink onClick={() => setvisible(false)} to="/chats" className="hover:text-white">CHATS</NavLink>
                <NavLink onClick={() => setvisible(false)} to="/rent" className="hover:text-white">RENT</NavLink>
                <NavLink onClick={() => setvisible(false)} to="/houses" className="hover:text-white">HOUSE</NavLink>
                <NavLink onClick={() => setvisible(false)} to="/plots" className="hover:text-white">PLOTS</NavLink>
              </ul>
            </div>
          </div>
        </div>
      </div>
    


</div>

  )
}

export default Navbar;
