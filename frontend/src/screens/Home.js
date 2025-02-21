import React from 'react'
import Navbar from '../components/Navbar'
import Carausel from '../components/Carausel'
import Cards from '../components/Cards'
import { useItemsContext } from '../components/ItemsContext';

export default function Home() {
  const { items, itemsCat } = useItemsContext();
  console.log(items);
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
