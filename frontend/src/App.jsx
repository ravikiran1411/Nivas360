import React from 'react'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Route, Routes, useLocation, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Chat from './pages/Chat'
import House from './pages/House'
import Plots from './pages/Plots'
import Rent from './pages/Rent'
import PropertyDetails from './pages/PropertyDetails'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import OwnerRequestForm from './pages/OwnerRequestForm'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

/* OWNER IMPORTS */
import OwnerLayout from "./owner/layout/OwnerLayout"
import OwnerRoute from "./owner/OwnerRoute"
import AddProperty from "./owner/pages/AddProperty"
import EditProperty from "./owner/pages/EditProperty"
import ListProperties from "./owner/pages/ListProperties"
import OwnerChat from "./owner/pages/OwnerChat"

const App = () => {

  const location = useLocation()

  const hide = location.pathname.startsWith('/wishlist')

  return (

    <div className='bg-slate-200'>

      <ToastContainer position="top-right" autoClose={3000} />

      {!hide && <Navbar />}

      <Routes>

        {/* USER ROUTES */}

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

        {/* OWNER DASHBOARD ROUTES */}

        <Route
          path="/owner"
          element={
            <OwnerRoute>
              <OwnerLayout />
            </OwnerRoute>
          }
        >

          {/* redirect /owner → /owner/properties */}
          <Route index element={<Navigate to="properties" />} />

          <Route path="properties" element={<ListProperties />} />

          <Route path="add-property" element={<AddProperty />} />

          <Route path="edit-property/:id" element={<EditProperty />} />

          <Route path="chat" element={<OwnerChat />} />

        </Route>

      </Routes>

      {!hide && <Footer />}

    </div>
  )
}

export default App;