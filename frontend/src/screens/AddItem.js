import React from 'react'
import Navbar from '../components/Navbar'
import { useState, useContext } from "react"
import AuthContext from '../components/AuthContext'


// i need current user ID, Token.

export default function AddItem() {
  const [item, setItem] = useState({ name: "", description: "", pricePerDay: 10, category: "", available: true })
  const { user, token } = useContext(AuthContext);


  const handleChange = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    // console.log(item)
    console.log("Authorization Header:", `Bearer ${token}`); // Log the token
    console.log("User ID:", user.id);
    console.log("user", user);
    console.log("item", item);
    try {
      const response = await fetch(`http://localhost:8080/itemContract/addItem/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
        body: JSON.stringify(item)
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(JSON.stringify(data));
        alert("Item added successfully");
        setItem({ name: "", description: "", pricePerDay: 10, category: "", available: true })
      }
    }
    catch (error) {
      alert("adding item failed from server")
      console.error("Error:", error);
    }
  }

  return (
    <>
      <Navbar />
      <div className='my-3 container'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Item Name</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" name="name" placeholder="Item Name" value={item.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Item Description</label>
            <textarea type="textArea" rows="3" className="form-control" id="exampleFormControlInput1" name="description" placeholder="Description" value={item.description} onChange={handleChange} />
          </div>
          <div className="col-auto my-1">
            <label className="mr-sm-2 me-2" htmlFor="inlineFormCustomSelect">Category</label>
            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" value={item.category} name="category" onChange={handleChange}>category
              <option value="TOOL">TOOL</option>
              <option value="SHOE">SHOE</option>
              <option value="Book">Book</option>
              <option value="VEHICLE">VEHICLE</option>
              <option value="TOY">TOY</option>
              <option value="SPORT">SPORT</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Price Per Day</label>
            <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="10" name="pricePerDay" value={item.pricePerDay} onChange={handleChange} />
          </div>

          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id="inlineRadio1" name="available" value={item.available = true} onChange={handleChange} />
            <label className="form-check-label" htmlFor="inlineRadio1">Available</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id="inlineRadio2" name="available" value={item.available = false} onChange={handleChange} />
            <label className="form-check-label" htmlFor="inlineRadio2">Not Available</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}
