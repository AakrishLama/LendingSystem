import React from 'react';
import { Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiCircleList } from "react-icons/ci";
import { TbContract } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";
import { FcAbout } from "react-icons/fc";



export default function SideBar({ showSidebar, closeSideBar }) {
  return (
    <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
      <div className="sidebar-container">
        <div className="sidebar-header">
          <div className='fs-3  text-black border border-2 w-100 text-center' onClick={closeSideBar} >
            <IoMenu />
          </div>
          <br></br>
          <div className='fs-5  text-black border border-2 w-100 text-center'>
            <Link className="mx-5 sidebar-brand fw-bold text-center text-black" to="/"><IoMdHome />
              Home</Link>
          </div>
          <br></br>
          <div className='fs-5  text-black border border-2 w-100 text-center'>
            <Link className="mx-5 sidebar-brand fw-bold text-center text-black" to="/About"><FcAbout />
              About</Link>
          </div>
          <br></br>
          <div className='fs-5  text-black border border-2 w-100 text-center'>
            <Link className="mx-5 sidebar-brand fw-bold text-center text-black" to="/MyProfile"><CgProfile />
              My Profile</Link>
          </div>
          <br></br>
          <div className='fs-5  text-black border border-2 w-100 text-center'>
            <Link className="mx-5 sidebar-brand fw-bold text-center text-black" to="/myItems"><CiCircleList />
              My Items</Link>
          </div>
          <br></br>
          <div className='fs-5  text-black border border-2 w-100 text-center'>
            <Link className="mx-5 sidebar-brand fw-bold text-center text-black" to="/myContracts"><TbContract />
              My Contracts</Link>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
}