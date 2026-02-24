import React from 'react'
import Hero from '../components/Hero'
import HaveProperty from '../components/HaveProperty';
import RentalHouses from '../components/RentalHouses';
import HouseForSale from '../components/HouseForSale';
import PlotsForSale from '../components/PlotsForSale';

const Home = () => {
  return (
    <div>
      <Hero />
      <RentalHouses />
      <HaveProperty />
      <HouseForSale />
      <PlotsForSale />
      

    </div>
  )
}

export default Home;