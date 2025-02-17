import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react';

export default function Login() {

  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      })
      if (response.status === 200) {
        const token = await response.text();
        console.log("success", token);
        localStorage.setItem("token", token);
        setCredentials({ email: "", password: "" })
        alert("Login successFull.")
      }
    }
    catch (error) {
      console.error("Error:", error);
    }
  }


    return (
      <div>
        <Navbar />
        <p>Login</p>
        <form className='my-2 container' onSubmit={handleSubmit}>
          <div className="mb-3">

            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email} onChange={(e) => { setCredentials({ ...credentials, email: e.target.value }) }} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" value={credentials.password} onChange={(e) => { (setCredentials({ ...credentials, password: e.target.value })) }} />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
