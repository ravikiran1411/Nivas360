import React from 'react'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import Chat from './pages/Chat'
import House from './pages/House'
import Plots from './pages/Plots'
import Navbar from './components/Navbar'
import Rent from './pages/Rent'
import Footer from './components/Footer'
import PropertyDetails from './pages/PropertyDetails'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import OwnerRequestForm from './pages/OwnerRequestForm'

const App = () => {

  const location = useLocation()
  const hide = location.pathname.startsWith('/wishlist')

  return (
    <div className='bg-slate-200'>

      {/* ADD THIS */}
      <ToastContainer position="top-right" autoClose={3000} />

      {!hide && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chats' element={<Chat />} />
        <Route path='/rent' element={<Rent />} />
        <Route path='/houses' element={<House />} />
        <Route path='/plots' element={<Plots />} />
        <Route path='/property/:id' element={<PropertyDetails />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/owner-request' element={<OwnerRequestForm />} />
      </Routes>

      {!hide && <Footer />}

    </div>
  )
}

export default App;