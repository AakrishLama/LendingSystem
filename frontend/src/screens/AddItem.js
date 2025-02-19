import React from 'react'
import Navbar from '../components/Navbar'
import { useState, useContext } from "react"
import AuthContext from '../components/AuthContext'


export default function AddItem() {
  const [item, setItem] = useState({ name: "", description: "", pricePerDay: 10, category: "", available: true, image: null })
  const [outPic, setOutPic] = useState(null);

  const { user, token } = useContext(AuthContext);


  const handleChange = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value })
  }

  // handle submit to backend.
  const handleSubmit = async (event) => {
    event.preventDefault()
    // console.log(item)
    console.log("Authorization Header:", `Bearer ${token}`); // Log the token
    console.log("User ID:", user.id);
    console.log("user", user);

    // check if any field is empty
    if (item.available === "") {
      alert(" set the availability of the item");
      return
    }
    try {
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("description", item.description);
      formData.append("pricePerDay", item.pricePerDay);
      formData.append("category", item.category);
      // form data converts boolean to string however some browser might send it as "on" or "".
      // so we need to convert it to "true" or "false" manually.
      formData.append("available", item.available ? "true" : "false");
      formData.append("image", item.image);

      console.log("Form Data:")
      for (var pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      console.log("Image File:", item.image ? item.image.name : "No image selected");
      console.log("Image Type:", item.image ? item.image.type : "No image selected");
      console.log(formData.get("available"));

      const response = await fetch(`http://localhost:8080/itemContract/addItem/${user.id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });
      if (response.status === 200) {
        // return the added item.
        const data = await response.json();
        console.log(JSON.stringify(data));
        alert("Item added successfully");
        // reset the form
        setItem({ name: "", description: "", pricePerDay: 10, category: "", available: true, image: null });
        setOutPic(null);
      }
    }
    catch (error) {
      alert("adding item failed from server")
      console.error("Error:", error);
    }
  }
  // handling image upload
  const handleImage = (e) => {
    console.log("working")
    const file = e.target.files[0];
    setItem({ ...item, image: file });
    console.log(file);
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setOutPic(imgURL);
    }
  }

  return (
    <>
      <Navbar />
      <div className='my-3 container'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Item Name</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" name="name" placeholder="Item Name"
              value={item.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Item Description</label>
            <textarea type="textArea" rows="3" className="form-control" id="exampleFormControlInput1" name="description"
              placeholder="Description" value={item.description} onChange={handleChange} required />
          </div>
          <div className="col-auto my-1">
            <label className="mr-sm-2 me-2" htmlFor="inlineFormCustomSelect">Category</label>
            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" value={item.category}
              name="category" onChange={handleChange} required>
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
          <div className="custom-file">
            <img src={outPic} style={{ height: "10rem", width: "10rem" }} type="image/png/jpeg/jpg" alt="alt..."></img>
            <input type="file" className="custom-file-input" id="validatedCustomFile" name="image" onChange={handleImage} required />
            <label className="custom-file-label" htmlFor="validatedCustomFile" >Choose an image</label>
            <div className="invalid-feedback">Example invalid custom file feedback</div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}
