import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Carausel from '../components/Carausel'
import Cards from '../components/Cards'


export default function Home() {
  const [items, setItems] = useState([]);
  const [itemsCat, setItemsCat] = useState([]);


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
          setItems(data);
          // setting unique categories.
          const uniqueCat = [];
          for (let i = 0; i < data.length; i++) {
            if (!uniqueCat.includes(data[i].category)) {
              uniqueCat.push(data[i].category);
            }
          }
          setItemsCat(uniqueCat);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchItems();
    items.map((item) => setItemsCat(item.category));
  }, []);
  // console.log("items ", items);
  // console.log("itemsCat ", itemsCat);




  return (
    <>
      <div>
        <Navbar />
        <Carausel />
        {itemsCat.map((category) => (
          <div>
            <h2 className='text-center'>{category}</h2>
            <hr></hr>
            <div className="row">
              {items.filter((item) => item.category === category).map((item) => (
                <div className="col-12 col-md-6 col-lg-3" >
                  <Cards key={item.id} item={item} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
