import React, { createContext, useState, useEffect, useContext } from "react";

// Create a context for items and selected item
const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [itemsCat, setItemsCat] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);  // State for selected item

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
          setItems(data);

          // Setting unique categories
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
  }, []);

  return (
    <ItemsContext.Provider value={{ items, itemsCat, selectedItem, setSelectedItem }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItemsContext = () => useContext(ItemsContext);

export default ItemsContext;
