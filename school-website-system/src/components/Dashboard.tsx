import React, { useState, useEffect, FormEvent } from 'react'
import Dashboardheader from "./Dashboardheader";
import {useForm, SubmitHandler} from "react-hook-form";

interface FormData {
  username: string;
  email: string;
  password: string;
}

function Dashboard() {
  const {register, handleSubmit} = useForm<FormData>();
  const [handleRegister, setHandleRegister] = useState("none");
  
  const storeTokenToSession=(token:string)=>{
    sessionStorage.setItem("jwtToken",token)
    window.location.href ="http://localhost:5173/createblog";
  }

  const registerUser:SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/auth/registerUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
         // Handle the success response from the server
        setHandleRegister("none");
      } else {
        // Handle the error response from the server
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error occurred while adding user:', error);
    }
  };

  const userLogin:SubmitHandler<FormData> = async (data)=>{
      try{
        const response = await fetch("http://localhost:8080/auth/login",
        {
          method:"POST",
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(data)
        })
        if (response.ok) {
         // Handle the success response from the server
          const result = await response.text();
          storeTokenToSession(result);
      } else {
        // Handle the error response from the server
        console.error('Failed to load user');
        setHandleRegister("block");
      }
      }catch (error) {
      console.error('Error occurred while adding user:', error);
    }
  }
  return (
    <>
      <div className="login-container">
        <div className="page-row">
           <div className="login-left-column">
              <div className="login-title-box">
                <div className="login_logo">
                  <i className="fa-solid fa-school"></i> 
                  <p>Main<span>land</span></p>
                </div>
                 <h1>Please register to create meaningful content for our website.</h1>
                 <p className='login_subtitle'>Just register and login to start writing about your experiences 
                  that you had at our wonderful school.</p>
              </div>
           </div>
           <div className="login-right-column">
              <div className="login-form-box">
                <h2>Please log in</h2>
                <p id='register_text'onClick={()=>setHandleRegister('block')}>Not registered please <span>Register</span></p>
                <form action="" onSubmit={handleRegister == "block"? handleSubmit(registerUser):handleSubmit(userLogin)}>
                  <h6><i className="lni lni-users"></i> Full name</h6>
                  <input {...register('username')}  type="text" placeholder='enter name'/>
                  <h6  style={{display: handleRegister == 'block'? 'block':'none' }}><i className="lni lni-envelope"></i> Email</h6>
                  <input {...register("email")} style={{display: handleRegister == 'block'? 'block':'none'}} type="text" placeholder='enter email'/>
                  <h6><i className="lni lni-unlock"></i> Password</h6>
                  <input {...register("password")} type="text" placeholder='enter password'/>
                  <button style={{display:handleRegister == 'block'? 'block':'none'}}> Please register</button>
                  <button style={{display:handleRegister == 'block'? 'none':'block'}}> Please Login</button>
                </form>
              </div>
           </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard