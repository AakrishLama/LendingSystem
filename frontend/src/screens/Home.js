import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Carausel from '../components/Carausel'
import Cards from '../components/Cards'


export default function Home() {
  const [items, setItems] = useState([]);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        
        const response = await fetch("http://localhost:8080/itemContract/items", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          // console.log(data.length);
          console.log("data[0] ",data[0])
          setItems(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchItems();
  },[] ); 
  console.log("items ", items);


  return (
    <div>
      <Navbar />
      <Carausel />
      {items.map((item) => (
        <Cards key={item.id} item={item} />
      ))}
    </div>
  )
}
