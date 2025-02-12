import React from 'react'
import Navbar from '../components/Navbar'
import Carausel from '../components/Carausel'
import Cards from '../components/Cards'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Carausel/>
      <Cards/>
      <Cards/>
      <Cards/>
      <Cards/>
    </div>
  )
}
