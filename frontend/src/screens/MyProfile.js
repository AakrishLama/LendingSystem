import React, { useContext } from "react";
import AuthContext from "../components/AuthContext"; // Import AuthContext
import Navbar from "../components/Navbar";


// use the server to get the user so only authenticated users can see their profile.
export default function MyProfile() {
  const { user } = useContext(AuthContext); // Get user from context

  if (!user) {
    return <p>Loading profile...</p>; // Prevent errors when user is null
  }
  console.log(user);
  return (
    <>
    <Navbar/>
      <div className="my-2 container">
        <h2>My Profile</h2>
        <p> name = {user.name}</p>
        <p>email = {user.email}</p>
        <p>credits = {user.credits}</p>
        <p>date = {user.date}</p>
        {user.items.map((item) => (
          <p>item = {item}</p>
        ))}
        <button>Update Profile</button>

      </div>
    </>
  );
}




// name
// "user3"
// email
// "user3@gmail.com"
// password
// "user3"
// credits
// 100
// date
// "2025-02-12 17:26:25"

// items
// Array (empty)
// _class
// "com.backend.bakend.Model.User"
