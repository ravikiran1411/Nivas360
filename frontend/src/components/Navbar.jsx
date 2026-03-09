import React, { useState, useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import LocationSelector from './LocationSelector'
import { DataContext } from '../context/DataContext'

const Navbar = () => {
  const [visible, setvisible] = useState(false)
  const navigate = useNavigate()
  const {token, logout} = useContext(DataContext)

  return (
    <div className="bg-slate-200 pb-10">
      <div>
        <div className="flex justify-around items-center py-2 sm:py-6 font-normal sm:font-medium bg-blue-800">
          <Link to="/">
            <img src={assets.nivas_logo} alt="logo" className="w-20 sm:w-40" />
          </Link>

          <LocationSelector />

          <NavLink to="/rent" className={({ isActive }) =>
            `hidden sm:block text-xl font-medium cursor-pointer ${isActive ? "text-orange-400" : "text-white"}`
          }> Rent</NavLink>

          <NavLink to="/houses" className={({ isActive }) =>
            `hidden sm:block text-xl font-medium cursor-pointer ${isActive ? "text-orange-400" : "text-white"}`
          }> House</NavLink>

          <NavLink to="/plots" className={({ isActive }) =>
            `hidden sm:block text-xl font-medium cursor-pointer ${isActive ? "text-orange-400" : "text-white"}`
          }> Plots</NavLink>

          <NavLink to="/whynivas" className={({ isActive }) =>
            `hidden sm:block text-xl font-medium cursor-pointer ${isActive ? "text-orange-400" : "text-white"}`
          }> Why Nivas ?</NavLink>

        
          <NavLink to="/chats" className={({ isActive }) =>
            `text-xl font-medium cursor-pointer ${isActive ? "text-orange-400" : "text-white"}`
          }>
            <img src={assets.chat} className='w-5 h-5 sm:w-8 sm:h-8' alt="chat" />
          </NavLink>

          <div className="flex items-center gap-4 sm:gap-15">

            <Link to='/wishlist' className='flex flex-col items-center'>
              <img src={assets.wishlist_icon} alt='' className="w-5 sm:w-6 md:w-8" />
              <p className='text-[10px] sm:text-sm text-white text-center'>wishlist</p>
            </Link>

            <div className="group relative">
              <img src={assets.profile_icon} alt="profile-icon"
                className="w-8 h-8 cursor-pointer rounded-full border-2 border-slate-100 p-1" />
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-3 bg-blue-200 rounded border-2">
                  {token && (
                    <p className="cursor-pointer hover:text-orange-500 text-orange-600 text-lg"
                      onClick={() => navigate('/profile')} >
                      My Profile
                    </p>
                  )}

                  {!token && (
                    <p onClick={() => navigate('/login')}
                      className="cursor-pointer hover:text-orange-500 text-orange-600 text-lg">
                      Login
                    </p>
                  )}

                  {token && (
                    <p onClick={logout}
                      className="cursor-pointer hover:text-orange-500 text-orange-600 text-lg">
                      Logout
                    </p>
                  )}

                </div>
              </div>
            </div>

            <img onClick={() => setvisible(true)} src={assets.menu_icon} alt='menu icon'
              className='w-8 h-10 cursor-pointer sm:hidden'
            />

            <div className={`fixed top-0 right-0 h-full w-75 z-50 transform ${visible ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 sm:hidden bg-blue-900`}>

              <div className="flex justify-end p-5">
                <button onClick={() => setvisible(false)}
                  className="text-2xl font-bold text-white hover:text-orange-400">
                  ✕
                </button>
              </div>

              <ul className="flex flex-col gap-6 px-6 font-medium text-slate-200">
                <NavLink onClick={() => setvisible(false)} to="/">HOME</NavLink>
                <NavLink onClick={() => setvisible(false)} to="/chats">CHATS</NavLink>
                <NavLink onClick={() => setvisible(false)} to="/rent">RENT</NavLink>
                <NavLink onClick={() => setvisible(false)} to="/houses">HOUSE</NavLink>
                <NavLink onClick={() => setvisible(false)} to="/plots">PLOTS</NavLink>
              </ul>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;