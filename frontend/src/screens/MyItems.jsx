import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'

export default function MyItems() {
  const navigate = useNavigate();
  // retrieving user id from session storage
  const user = sessionStorage.getItem("user");
  const userid = JSON.parse(user).id;

  const [myItems, setMyItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:8080/itemContract/myItems/${userid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setMyItems(data);
        } else {
          console.error('Failed to fetch items', response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, [userid]);
  const handleUpdateClick = (item) => {
    navigate(`/updateItem`, { state: { item } });
  };

  return (
    <>
      <Navbar />
      <div className='container'>
        <h1 style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>My Items</h1>
        <div className="d-flex flex-wrap"> {/* Add flex-wrap to wrap the items if necessary */}
          {myItems.map((item) => {
            return (
              <div className='d-flex' style={{ display: "flex" }} key={item.id}>
                <div className="my-2 mx-2 card" style={{ width: "18rem" }}>
                  <img src={item.imageData && item.imageType
                    ? `data:${item.imageType};base64,${item.imageData}`
                    : "/carauselPic/pic2.png"}
                    className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text-description" rows="3">{item.description}</p>
                    <p className="card-text">Category: {item.category}</p>
                    <p className="card-text">Price: {item.pricePerDay}</p>
                    <p className="card-text">Owner: {item.ownerId}</p>
                    <p className="card-text">Available: {item.available ? "Yes" : "No"}</p>

                    {/* If the logged-in user is the owner, show the Update button */}
                    {item.ownerId === userid ? (
                      <button
                        onClick={() => handleUpdateClick(item)}
                        className="btn btn-warning"
                      >
                        Update
                      </button>
                    ) : (
                      <Link to={`/itemDetails`} className="btn btn-primary">View Details</Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
