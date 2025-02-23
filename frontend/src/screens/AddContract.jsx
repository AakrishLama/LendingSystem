import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../components/AuthContext";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Function to format date as YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return null;
  return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
};

export default function AddContract() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Get itemId safely
  const itemId = location.state?.itemId || "No ID provided";

  const handleStartDateChange = (date) => {
    setStartDate(date);
    console.log("Selected Start Date:", formatDate(date)); // Log formatted date
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    console.log("Selected End Date:", formatDate(date)); // Log formatted date
  };

  return (
    <div>
      <Navbar />
      <p>Item ID = {itemId}</p>
      <p>Borrower ID = {user?.id || "No user logged in"}</p>

      <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Select Dates</h2>
        <div className="flex flex-col space-y-4 w-full">
          {/* Start Date Picker */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Start Date:
            </label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()} // Prevent past dates
              dateFormat="yyyy-MM-dd" // Display format
              className="p-2 border rounded w-full"
            />
          </div>

          {/* End Date Picker */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              End Date:
            </label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()} // Ensure end date is after start
              dateFormat="yyyy-MM-dd" // Display format
              className="p-2 border rounded w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
