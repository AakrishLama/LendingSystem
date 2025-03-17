import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../components/AuthContext';

export default function Login() {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const { login } = useContext(AuthContext); // Use context to update authentication state


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
        // get the token from response and save it in localstorage for future use.
        const data = await response.json();
        login(data.user, data.token);
        // localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user);
        setCredentials({ email: "", password: "" })

        console.log("token", sessionStorage.getItem("token"))
        console.log("user", sessionStorage.getItem("user"))
        alert("Login successFull.")
        navigate("/");
      } else {
        console.log("response status", response.status);
        alert("Invalid credentials");
      }
    }
    catch (error) {
      alert("Login failed from server");
      console.error("Error:", error);
    }
  }


  return (
    <div>
      <Navbar />
      <form className='my-2 container  border border-2 p-3' onSubmit={handleSubmit}>
        <div className="mb-3">

          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control w-50 justify-content-center text-align-center" id="email" aria-describedby="emailHelp" 
          value={credentials.email} onChange={(e) => { setCredentials({ ...credentials, email: e.target.value }) }} required/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control w-50" id="exampleInputPassword1" 
          value={credentials.password} onChange={(e) => { (setCredentials({ ...credentials, password: e.target.value })) }} required />
        </div>
        <div className='container justify-content-center text-center ' >
          <button type="submit" className="btn btn-success">Submit</button>
        </div>
      </form>
    </div>
  )
}
