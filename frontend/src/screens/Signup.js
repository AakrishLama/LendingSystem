import React from 'react'
import { useState } from 'react'

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      })
      if (response.status === 201) {
        const data = await response.json();
        console.log("success", data);
        alert("User registered successfully");
        setCredentials({ name: "", email: "", password: "" })
      } else {
        console.log(response.status);
        alert("Registration Failed");
      }

    } catch (error) {
      console.error("Error:", error);
    }

    // console.log(credentials);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">User Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={credentials.name} onChange={(e) => { setCredentials({ ...credentials, name: e.target.value }) }} />
          <br></br>
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email} onChange={(e) => { setCredentials({ ...credentials, email: e.target.value }) }} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={credentials.password} onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }) }} />
        </div>

        <button type="submit" className="btn btn-primary" >Submit</button>
      </form >
    </div>
  )
}
