import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Cards from '../components/Cards';
import { useItemsContext } from '../components/ItemsContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Home() {
  const navigate = useNavigate();
  const { items, itemsCat } = useItemsContext();
  const [myItems, setMyItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const user = sessionStorage.getItem("user");

    if (!user) {
      navigate("/login");
    } else {
      try {
        const userData = JSON.parse(user); // Parse the user data properly
        // console.log("userData", userData);

        // Check if userData.items exists and is an array
        if (userData.items && Array.isArray(userData.items)) {
          const itemIds = userData.items.map(item => item.split(" ")[0]); // Extract the ID
          setMyItems(itemIds); // Set the item IDs
        } else {
          console.error("No items found or invalid items format.");
        }
      } catch (error) {
        console.error("Error parsing user data from sessionStorage:", error);
      }
    }
  }, [navigate]);
  // console.log("myItems", myItems);


  return (
    <>
      <div>
        <Navbar />
        {/* Carousel to display the search functionality. */}
        <div className="position-relative">

          {/* Bootstrap 5 Carousel */}
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner z-index-0" style={{ height: "400px" }}>
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src="/carauselPic/lending2.jpg"
                  alt="First slide"
                  style={{
                    height: "400px",
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                  }}
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="/carauselPic/pic.jpeg"
                  alt="Second slide"
                  style={{
                    height: "400px",
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                  }}
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="/carauselPic/pic2.png"
                  alt="Third slide"
                  style={{
                    height: "400px",
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                  }}
                />
              </div>
            </div>

            {/* Carousel Controls */}
            <a
              className="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
            <input
              className="form-control position-absolute top-0 start-50 translate-middle-x  w-50"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ zIndex: 10, marginTop: "350px", padding: "5px" }}
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
            />
          </div>
        </div>
        {itemsCat.map((category) => (
          <div>
            <h2 className='text-center' key={category}>{category}</h2>
            <hr></hr>
            <div className="row">
              {items.filter((item) => item.category === category && item.name.toLowerCase().includes(search.toLowerCase())
               && !myItems.includes(item.id)).map((item) => (
                <div className="col-12 col-md-6 col-lg-3" >
                  <Cards key={item.id} item={item} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <Footer></Footer>
      </div>
    </>
  )
}
