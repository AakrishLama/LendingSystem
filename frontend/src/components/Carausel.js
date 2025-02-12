import React from 'react'

export default function Carausel() {
  return (
    <div>
      {/* Replacing  data-ride="carousel" and data-slide="prev"  with data-bs-ride="carousel" and data-bs-slide="prev"
      to make it compatible with bootstrap 5*/}
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner" style={{ height: "400px"}}>
          <div className="carousel-item active">
            <img className="d-block w-100" src="/carauselPic/lending2.jpg" alt="First slide" style={{height: "400px", objectFit: "cover", objectPosition: "center"}}/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/carauselPic/lending3.jpeg" alt="Second slide" style={{height: "400px", objectFit: "cover", objectPosition: "center"}}/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/carauselPic/lending1.jpeg" alt="Third slide" style={{height: "400px", objectFit: "cover", objectPosition: "center"}}/>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  )
}
