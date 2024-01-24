
import React,{useState, useEffect} from 'react'
import { jwtDecode } from "jwt-decode";

type changeSidebar ={
  widthSet:number
}

function sidebar(props: changeSidebar) {
  const [userRole, setUserRole] = useState<string>();
 
  useEffect(() => {
    const storedToken =  sessionStorage.getItem("jwtToken");
    const findUserRole = async()=>{
      if(storedToken){
        const extractUsername = jwtDecode(storedToken).sub;
        try{
          const response = await fetch("http://localhost:8080/getUserRole",
            {
              method:"POST",
              headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + storedToken
              },
              body: JSON.stringify({username: extractUsername})  
            })
            if (response.ok) {
              // Handle the success response from the server
                const result = await response.text();
                setUserRole(result);
            } else {
              // Handle the error response from the server
              console.error('Failed to load user');
            }
          }catch(error){
          console.log(error);
        }
      }
    }
    findUserRole();
    return () => {
      console.log("sidebar data cleared")   
    }
  }, []);
  
  return (
    <>
    <div className="sidebar-wrapper" style={{width: props.widthSet+'%'}}>
      <div className="logo">
          <i className="fa-solid fa-school"></i> 
          <a href="http://localhost:5173">Main<span>land</span></a>
      </div>
      <div className="sidebar_links">
          <span className='links-subtitle'>Main page</span>
          <a href="http://localhost:5173/dashboard"><i className="lni lni-grid-alt"></i>Dashboard </a>
          <a style={{display: userRole == "ROLE_ADMIN"?"block":"none"}} href="http://localhost:5173/about"><i className="lni lni-quotation"></i>About</a>
          <a href=""><i className="lni lni-comments"></i>Blog<i  className="lni lni-chevron-right"></i></a>
          <div className="blog-links">
            <a href="http://localhost:5173/createblog">Create blog</a>
            <a href="http://localhost:5173/blogpost">Blog posts</a>
          </div>
          <a  style={{display: userRole == "ROLE_ADMIN"?"block":"none"}} href="http://localhost:5173/contact"><i className="fa-regular fa-address-book"></i>Contact</a>
          <a  style={{display: userRole == "ROLE_ADMIN"?"block":"none"}} href="http://localhost:5173/users"><i className="fa-solid fa-users"></i>User</a>
      </div>
    </div>
    </>
  )
}

export default sidebar