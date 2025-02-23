import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Cards from '../components/Cards'

// @GetMapping("/myItems/{ownerId}")

export default function MyItems() {
  const user = sessionStorage.getItem("user");
  const userid = JSON.parse(user).id;
  console.log("userid", userid);
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
  }, [userid]); // Dependency array to make sure it runs again if the user changes

console.log("myItems", myItems);
  return (
    <>
      <Navbar /> 
      <div className='container'>
        <h1>  MyItems</h1>
        <div className="d-flex flex-wrap"> {/* Add flex-wrap to wrap the items if necessary */}
        {myItems.map((item)=>{
          return <>
          <div className='d-flex' style={{display:"flex"}}>
           <Cards key={item.id} item={item} />
          </div>
          </>
        })}
        </div>
      </div>
    </>
  )
}
