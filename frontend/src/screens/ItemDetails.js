import React from 'react'
import { useItemsContext } from '../components/ItemsContext'
import Navbar from '../components/Navbar';

export default function ItemDetails() {
  const { selectedItem } = useItemsContext();
  // If no item is selected, display no item selected.
  if (!selectedItem) {
    return (
      <div>
        <Navbar/>
        <p>no item selected</p>
      </div>
    )
  }
  return (
    <>
    <Navbar />
    <div className='my-4 container'>
      <p>item Name= {selectedItem.name}</p>
      <p>description = {selectedItem.description}</p>
      <p>category = {selectedItem.category}</p>
      <p>price = {selectedItem.pricePerDay}</p>
      <p>owner = {selectedItem.ownerName}</p>
      <p>availability = {selectedItem.available? "yes" : "no"}</p>
      <button className='btn btn-primary'>rent</button>
    </div>
    </>
  )
}
