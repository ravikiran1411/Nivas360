import React from 'react'
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
import WhyNivas from './pages/WhyNivas'

const App = () => {
  const location=useLocation();
  const hide = location.pathname.startsWith('/wishlist')

  return (
    <div className='bg-slate-200'>

      {!hide && <Navbar /> }

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chats' element={<Chat />} />
        <Route path='/whynivas' element={<WhyNivas />} />
        <Route path='/rent' element={<Rent />} />
        <Route path='/houses' element={<House />} />
        <Route path='/plots' element={<Plots />} />
        <Route path='/property/:id' element={<PropertyDetails />} />
        <Route path='/wishlist' element={<Wishlist />} />
      </Routes>
      {!hide && <Footer />}
    </div>
  )
}

export default App