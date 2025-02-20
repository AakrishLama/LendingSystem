import React from 'react';

export default function Cards({ item }) {
  // Construct the Base64 image URL properly
  const imageDataURL = `data:${item.imageType};base64,${item.imageData}`;
  
  // Use a placeholder if there's no image


  return (
    <div>
      <div className="my-2 mx-2 card" style={{ width: "18rem" }}>
        <img src={imageDataURL} className="card-img-top" alt="Item image" />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          <a href="#" className="btn btn-primary">Open view</a>
        </div>
      </div>
    </div>
  );
}
