import React from 'react'

export default function Signup() {
  return (
    <div>
      <form>
        <div className="mb-3">
          <label for="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" />
          <br></br>
          <label for="number" className="form-label">Phone number</label>
          <input type="tel" className="form-control" id="number" pattern="[0-9]*" inputMode="numeric" />
          <br></br>
          <label for="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
