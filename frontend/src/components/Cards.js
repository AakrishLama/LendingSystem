import React from 'react';
import { Link } from 'react-router-dom';
import { useItemsContext } from '../components/ItemsContext';

export default function Cards({ item }) {
  const { setSelectedItem } = useItemsContext();  // Get the setSelectedItem function
  
  // Construct the Base64 image URL properly
  const imageDataURL = item.imageData && item.imageType
    ? `data:${item.imageType};base64,${item.imageData}`
    : null;

    const handleItemClick = () => {
      setSelectedItem(item);  // Set the selected item when clicked
    };
  return (
    <div>
      <div className="my-2 mx-2 card" style={{ width: "18rem" }}>
        <img src={imageDataURL ? imageDataURL : "/logo192.png"}
          className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text-description" rows="3">{item.description}</p>
          <p className="card-text"> category = {item.category}</p>
          <p className="card-text"> price = {item.pricePerDay}</p>
          <p className="card-text"> owner = {item.ownerName}</p>
          <p className="card-text"> available = {item.available? "yes" : "no"}</p>


          <Link to="/ItemDetails" className="btn btn-primary" onClick={handleItemClick} >Open view</Link>
        </div>
      </div>
    </div>
  );
}
