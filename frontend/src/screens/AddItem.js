import React from 'react'
import Navbar from '../components/Navbar'
import { useState, useContext } from "react"
import AuthContext from '../components/AuthContext'


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

    // check if any field is empty
    if (item.category === "" || item.name === "" || item.description === "" || item.pricePerDay === "" || item.available === "") {
      alert(" Please fill all the fields");
      return
    }
    try {
      const response = await fetch(`http://localhost:8080/itemContract/addItem/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(item)
      });
      if (response.status === 200) {
        // return the added item.
        const data = await response.json();
        console.log(JSON.stringify(data));
        alert("Item added successfully");
        // reset the form
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
            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" value={item.category} name="category" onChange={handleChange}>
              <option value="">Choose</option>
              <option value="TOOL">TOOL</option>
              <option value="SHOE">SHOE</option>
              <option value="BOOK">BOOK</option>
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
            <input className="form-check-input" type="radio" id="inlineRadio1" name="available" checked={item.available === true} // Ensure it's checked properly
              value={item.available} onChange={() => setItem({ ...item, available: true })
              } />
            <label className="form-check-label" htmlFor="inlineRadio1">Available</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id="inlineRadio2" name="available" checked={item.available === false} // Ensure it's checked properly
              value={item.available} onChange={() => setItem({ ...item, available: false })
              } />
            <label className="form-check-label" htmlFor="inlineRadio2">Not Available</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}
