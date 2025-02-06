import React from 'react'
import { useState } from 'react'

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", number: "", password: "" })
  const submit = () => {
    console.log(credentials);
  }
  return ( 
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={credentials.name} onChange={(e) => { setCredentials({ ...credentials, name: e.target.value }) }} />
          <br></br>
          <label htmlFor="number" className="form-label">Phone number</label>
          <input type="tel" className="form-control" id="number" pattern="[0-9]*" inputMode="numeric" value={credentials.number} onChange={(e) => { setCredentials({ ...credentials, number: e.target.value }) }} />
          <br></br>
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email} onChange={(e) => { setCredentials({ ...credentials, email: e.target.value }) }} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={credentials.password} onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }) }} />
        </div>

        <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
      </form >
    </div>
  )
}
