import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function UpdateItem() {
  const location = useLocation();
  const [item, setItem] = useState(null);
  const [outPic, setOutPic] = useState(null);

  const user = sessionStorage.getItem("user");
  const userid = JSON.parse(user).id;

  const handleChange = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value })
  }
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
  // useEffect to update the item state when the location changes.
  useEffect(() => {
    // console.log("Location Object:", location); // Log the entire location object
    // console.log("Location State:", location.state); // Log the state specifically
    if (location.state?.item) {
      setItem(location.state.item);
    }
  }, [location]);

  if (!item) {
    return <div>No item data available</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("description", item.description);
    formData.append("pricePerDay", item.pricePerDay);
    formData.append("category", item.category);
    // form data converts boolean to string however some browser might send it as "on" or "".
    // so we need to convert it to "true" or "false" manually.
    formData.append("available", item.available ? "true" : "false");
    formData.append("image", item.image);
    formData.append("ownerId", userid);

    // console.log("Form Data:")
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }
    console.log("Image File:", item.image ? item.image.name : "No image selected");
    console.log("Image Type:", item.image ? item.image.type : "No image selected");
    for (var pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  }
  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1>Update Item</h1>
        <form onSubmit={handleSubmit} >
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
          <button type="submit" className="btn btn-primary">update</button>
        </form>
      </div>
    </div>
  );
}