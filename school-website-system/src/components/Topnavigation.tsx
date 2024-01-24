import React, { useState } from 'react'
import navImageOne from "./assets/topnav-image2.jpg";
import navImageTwo from "../assets/topnav-image4.png";

type toogleSidebar ={
  width : ()=> void; 
}

const Topnavigation =(props: toogleSidebar)=> {  

  return (
    <>
      <div className='topnav'>
        <div className="page-row">
          <div className="dashboard-menu" onClick={props.width}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className="topnav_right-column">
            <div className="topnav-social-icons">
                <i className="lni lni-facebook-line"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-whatsapp"></i>
            </div>
            <div className="topnav_user_profile">
                <img src={navImageTwo} alt="" />
                <p>
                    <span>jane Doe</span>
                    <span>math teacher</span>
                </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Topnavigation