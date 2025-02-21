import React from 'react'
import Navbar from '../components/Navbar'

export default function About() {
  return (
    <>
    <Navbar/>
    <div className='my-4 container border border-gray-300 rounded-lg shadow-lg fs-4' style={{borderRadius: "10px"}}>
      <h1 className='text-center'>About</h1>
      <p>This is a simple lending system built with React and spring-boot.</p>
      <p>It allows users to register, login, and borrow items.</p>
      <p>It is a work in progress, and is not yet complete.</p>
    </div>
    </>
  )
}
