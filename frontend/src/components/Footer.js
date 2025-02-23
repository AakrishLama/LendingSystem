import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <div class="container">
        <footer class="py-3 my-4">
          <ul class="nav justify-content-center border-bottom pb-3 mb-3">
            <li class="nav-item"><Link to="/" class="nav-link px-2 text-body-secondary text-white">Home</Link></li>
            <li class="nav-item"><Link to="/About" class="nav-link px-2 text-body-secondar text-white">About</Link></li>
            <li class="nav-item"><a href="https://github.com/AakrishLama/LendingSystem/tree/main" target="_blank"
              class="nav-link px-2 text-body-secondar text-white"><FaGithub /> Git</a></li>
          </ul>
          <p class="text-center text-body-secondary text-white">Developed by Aakrish Lama</p>
        </footer>
      </div>
    </div>
  )
}
