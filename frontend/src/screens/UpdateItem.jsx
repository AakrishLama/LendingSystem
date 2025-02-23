import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

//   @PutMapping("/updateItem/{itemId}")
// public ResponseEntity<Item> updateItem(@PathVariable String itemId,
//   @RequestParam("name") String name,
//   @RequestParam("description") String description,
//   @RequestParam("pricePerDay") int pricePerDay,
//   @RequestParam("category") String category,
//   @RequestParam("available") boolean available,
//   @RequestParam("image") MultipartFile image) throws IOException {
export default function UpdateItem() { 
  const navigate = useNavigate();
  const location = useLocation();
  const [item, setItem] = useState(null);
  const [outPic, setOutPic] = useState(null);

  const handleChange = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value })
  }
  const handleImage = (e) => {
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
    // sending string data as form data to backend.
    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("description", item.description);
    formData.append("pricePerDay", item.pricePerDay);
    formData.append("category", item.category);
    formData.append("available", item.available ? "true" : "false");
    formData.append("image", item.image);

    // console.log("Image File:", item.image ? item.image.name : "No image selected");
    // console.log("Image Type:", item.image ? item.image.type : "No image selected");
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }
    try {
      const response = await fetch(`http://localhost:8080/itemContract/updateItem/${item.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: formData
      })
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        alert("Item updated successfully");
        setItem({ name: "", description: "", pricePerDay: 10, category: "", available: true, image: null });
        navigate("/");
      }else{
        console.log(response.status);
        alert(" Item update failed");
      }
      
    } catch (error) {
      console.log("server error", error);
      alert("Item update failed from server");
      
    }
  }
  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1 className='text-center'>{item.name}</h1>
        <div className='container border border-gray-300 rounded-lg shadow-lg'>
        <form onSubmit={handleSubmit} >
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1" className="my-2 fs-2 fw-bold mx-3">Item Name</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" name="name" placeholder="Item Name"
              value={item.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1" className="my-2 fs-2 fw-bold mx-3">Item Description</label>
            <textarea type="textArea" rows="3" className="form-control" id="exampleFormControlInput1" name="description"
              placeholder="Description" value={item.description} onChange={handleChange} required />
          </div>
          <div className="col-auto my-1">
            <label className="my-2 fs-2 fw-bold mx-3" htmlFor="inlineFormCustomSelect">Category</label>
            <select className="custom-select mr-sm-2 " id="inlineFormCustomSelect" value={item.category}
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
            <label htmlFor="exampleFormControlInput1" className="my-2 fs-2 fw-bold mx-3">Price Per Day</label>
            <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="10" name="pricePerDay" value={item.pricePerDay} onChange={handleChange} />
          </div>

          <div className="form-check form-check-inline my-2">
            <input className="form-check-input" type="radio" id="inlineRadio1" name="available" checked={item.available === true} // Ensure it's checked properly
              value={item.available} onChange={() => setItem({ ...item, available: true })
              } />
            <label className="form-check-label " htmlFor="inlineRadio1">Available</label>
          </div>
          <div className="form-check form-check-inline my-2">
            <input className="form-check-input" type="radio" id="inlineRadio2" name="available" checked={item.available === false} // Ensure it's checked properly
              value={item.available} onChange={() => setItem({ ...item, available: false })
              } />
            <label className="form-check-label " htmlFor="inlineRadio2">Not Available</label>
          </div>
          <div className="custom-file my-2">
            <img src={outPic} style={{ height: "10rem", width: "10rem" }} type="image/png/jpeg/jpg" alt="alt..."></img>
            <input type="file" className="custom-file-input" id="validatedCustomFile" name="image" onChange={handleImage} required />
            <label className="custom-file-label" htmlFor="validatedCustomFile" >Choose an image</label>
            <div className="invalid-feedback">Example invalid custom file feedback</div>
          </div>
          <button type="submit" className="btn btn-primary my-3">update</button>
        </form>
        </div>
      </div>
    </div>
  );
}