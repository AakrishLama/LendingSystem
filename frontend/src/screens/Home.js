import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Carausel from '../components/Carausel'
import Cards from '../components/Cards'


export default function Home() {
  

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
          console.log(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchItems();
  },[] ); 


  return (
    <div>
      <Navbar />
      <Carausel />
      <Cards />
      <Cards />
      <Cards />
      <Cards />
    </div>
  )
}
