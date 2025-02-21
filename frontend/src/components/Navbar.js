import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from "../components/AuthContext"

export default function Navbar() {

  const { logout } = useContext(AuthContext);

  const [toggle, setToggle] = useState(() => {
    return localStorage.getItem("darkMode") === "enabled";
  });

  // Apply dark mode class when toggled
  useEffect(() => {
    if (toggle) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [toggle]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "lightblue" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Lending System</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/About">About</Link>
              </li>
            </ul>
            {(sessionStorage.getItem("token")) ? <>
              <Link className="btn btn-outline-success me-2 border-2 fw-bold text-black" type="submit" to="/AddItem"
                style={{ backgroundColor: "lightblue", textAlign: "center", textDecorationColor: "black" }}>Add Item</Link>
              <Link className="btn btn-outline-success me-2 border-2 fw-bold text-black" type="submit" to="/"
                style={{ backgroundColor: "lightblue", textAlign: "center", textDecorationColor: "black" }}
                onClick={logout}>Log out</Link>
              <Link className="btn btn-outline-success me-2 border-2 fw-bold text-black" type="submit" to="/myProfile"
                style={{ backgroundColor: "lightblue", textAlign: "center", textDecorationColor: "black" }}>{JSON.parse(sessionStorage.getItem("user")).name}</Link>
            </>
              : <>
                <Link className="btn btn-outline-success me-2 border-2 fw-bold text-black" type="submit" to="/Login"
                  style={{ backgroundColor: "lightblue", textAlign: "center", textDecorationColor: "black" }}>Log in</Link>
                <Link className="btn btn-outline-success me-2 border-2 fw-bold text-black" type="submit" to="/Signup"
                  style={{ backgroundColor: "lightblue", textAlign: "center" }}>Sign up</Link>
              </>
            }
            <button className={`toggle-btn ${toggle ? "toggle" : ""}`} onClick={() => setToggle(!toggle)}>
            <div className="thumb">{toggle ?  "☀️":"🌘" }</div>
            </button>
          </div>
        </div>
      </nav>

    </div>
  )
}
