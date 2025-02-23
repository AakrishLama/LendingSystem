import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Carausel from '../components/Carausel';
import Cards from '../components/Cards';
import { useItemsContext } from '../components/ItemsContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Home() {
  const navigate = useNavigate();
  const { items, itemsCat } = useItemsContext();
  const [myItems, setMyItems] = useState([]);

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
        <Carausel />
        {itemsCat.map((category) => (
          <div>
            <h2 className='text-center' key={category}>{category}</h2>
            <hr></hr>
            <div className="row">
              {items.filter((item) => item.category === category && !myItems.includes(item.id)).map((item) => (
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
