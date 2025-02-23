import React, { useContext, useState } from "react";
import AuthContext from "../components/AuthContext"; // Import AuthContext
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

//   @PutMapping("/updateUser/{userId}")

export default function MyProfile() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
  const { user } = useContext(AuthContext); // Get user from context

  if (!user) {
    return <p>Loading profile...</p>; // Prevent errors when user is null
  }

  const handleChange= (e)=>{
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(credentials)

    try {
      const reponse= await fetch(`http://localhost:8080/updateUser/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(credentials)
      })
      if (reponse.status === 200) {
        const data = await reponse.json();
        console.log(data);
        alert("Profile updated successfully");
        navigate("/login");
      }else{
        console.log(reponse.status);
        alert("Profile update failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
    <Navbar/>
      <div className="my-2 container">
        <h2>My Profile</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" placeholder={user.name} name="name" value={credentials.name} onChange={handleChange}required></input><br></br>

        <label htmlFor="email">email:</label>
        <input type="email" placeholder={user.email} name="email" value={credentials.email} onChange={handleChange} required></input><br></br>

        <label>Password: </label>
        <input type="password" placeholder="...set password" name="password" value={credentials.password} onChange={handleChange} required></input> <br></br>

        <label htmlFor="credits">Current credits:</label>
        <p >{user.credits}</p>

        <p> date: {user.date}</p>

        {user.items.map((item) => (
          <p>item = {item}</p>
        ))}
        <button type="submit">Update Profile</button>
        </form>
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
