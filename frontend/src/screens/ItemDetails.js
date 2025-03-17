import React, { useState, useContext } from "react";
import { useItemsContext } from "../components/ItemsContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../components/AuthContext";

export default function ItemDetails() {
  const [startDate, setStartDate] = useState(""); // Store as string (YYYY-MM-DD)
  const [endDate, setEndDate] = useState(""); // Store as string (YYYY-MM-DD)
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { selectedItem } = useItemsContext();
  const [rent, setRent] = useState(false);

  if (!selectedItem) {
    return (
      <div>
        <Navbar />
        <p>No item selected</p>
      </div>
    );
  }

  // Format Date object to "YYYY-MM-DD"
  const formatDate = (date) => date?.toISOString().split("T")[0] || "";

  // Convert "YYYY-MM-DD" string back to Date object
  const parseDate = (dateString) => (dateString ? new Date(dateString) : null);

  const handleStartDateChange = (date) => {
    setStartDate(formatDate(date)); // Store as string
  };

  const handleEndDateChange = (date) => {
    setEndDate(formatDate(date)); // Store as string
  };

  const submit = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates before submitting.");
      return;
    }
    // console.log("Selected Start Date:", startDate);
    // console.log("Selected End Date:", endDate);
    // console.log("User ID:", user.id);
    // console.log("Item ID:", selectedItem.id);
    try {
      console.log("submit working");
      const response = await fetch(`http://localhost:8080/itemContract/addContract/${user.id}/${selectedItem.id}/${startDate}/${endDate}`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
      });
      const data = await response.text(); 

      if (response.status === 200) {
        console.log(data); // Successful response
        alert("Contract added successfully");
        navigate("/");
      } else {
        alert(data); // Display the error message received from the backend
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again later.");

    }
  };

  return (
    <>
      <Navbar />
      <div className="my-4 container border border-2 ">
        <img src={selectedItem.imageData && selectedItem.imageType ?
        `data:${selectedItem.imageType};base64,${selectedItem.imageData}`
        :"/carauselPic/pic2.png"}
        style={{ height: "20rem", objectFit: "fill" }}></img>
        {/* <p>Borrower ID = {user?.id || "No user logged in"}</p> */}
        <h1>Item Name = {selectedItem.name}</h1>
        {/* <h3>ID = {selectedItem.id}</h3> */}
        <h3>Description = {selectedItem.description}</h3>
        <h3>Category = {selectedItem.category}</h3>
        <h3>Price = {selectedItem.pricePerDay}</h3>
        <h3>Owner = {selectedItem.ownerId}</h3>
        <h3>Availability = {selectedItem.available ? "Yes" : "No"}</h3>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={() => setRent(!rent)}>Rent</button>

        {rent && (
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Select Dates</h2>
            <div className="flex flex-col space-y-4 w-full">
              {/* Start Date Picker */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Start Date:
                </label>
                <DatePicker
                  selected={parseDate(startDate)} // Convert string back to Date
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={parseDate(startDate)}
                  endDate={parseDate(endDate)}
                  minDate={new Date()} // Prevent past dates
                  dateFormat="yyyy-MM-dd" // Display format
                  className="p-2 border rounded w-full"
                  required
                />
              </div>

              {/* End Date Picker */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  End Date:
                </label>
                <DatePicker
                  selected={parseDate(endDate)} // Convert string back to Date
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={parseDate(startDate)}
                  endDate={parseDate(endDate)}
                  minDate={parseDate(startDate) || new Date()} // Ensure end date is after start
                  dateFormat="yyyy-MM-dd" // Display format
                  className="p-2 border rounded w-full"
                  required
                />
              </div>
              <button
                onClick={submit}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
