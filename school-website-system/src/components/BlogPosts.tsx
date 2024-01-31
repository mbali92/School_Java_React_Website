import React, { useState,useEffect,useContext} from 'react'
import Sidebar from "./Sidebar";
import Topnavbar from "./Topnavigation";
import Dashboardheader from './Dashboardheader';
import {PostObject} from "./WebsiteInterfaces";
import blogImageOne from "../assets/gallery-image1.jpg";
import blogImageTwo from "../assets/gallery-image2.jpg";
import blogImageThree from "../assets/gallery-image3.jpg";
import UserProvider,{UserContext} from './UserContext';

function BlogPosts() {
    const [blogPosts, setblogPosts] = useState<PostObject[]>([]);
    const [leftContentPage, setleftContentPage] = useState<number>(0);
    const [widthContentPage, setwidthContentPage] = useState<number>(100);
    const [menubar,setmenubar ] = useState<number>(0);

    const handleEditData=(dataToEdit:PostObject)=>{
        localStorage.setItem("editData",JSON.stringify(dataToEdit))
        window.location.href="http://localhost:5173/createblog"
    }
    
    useEffect(() => {
        localStorage.removeItem("editData");
        const blogToken = sessionStorage.getItem("jwtToken");
        const getBlogPost=async ()=>{
            try{ const response = await fetch("http://localhost:8080/getBlogPost",{
                method:"GET",
                headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + blogToken }
                })
                if(response.ok){
                    const responseJson = await response.json();
                    setblogPosts(responseJson)
                }
            }catch(error){console.log(error)}
        }
        getBlogPost()
        return() => {
            console.log("data sent");
        }
    }, []);
    const handleSidebar=()=>{
      if(window.innerWidth > 991){
         if(leftContentPage == 0){setmenubar(0); setleftContentPage(15);setwidthContentPage(85)
         }else{setmenubar(-15);setleftContentPage(0);setwidthContentPage(100)}
      }
      else{menubar == 0 ? setmenubar(-100) : setmenubar(0);}
    }
    return (
        <>
            <div className="page-row">
                <Sidebar widthSet={menubar}/>
                <div className='dashboard-main-content' style={{left:leftContentPage +"%", width:widthContentPage + "%"}}>
                    <Topnavbar width={handleSidebar}/>
                    <Dashboardheader pageName={"Blog posts"} pageNavNameOne={"Blog"} pageNavNameTwo={"Blog posts"}/>
                    <div className="posts-container">
                        <div className="page-row">
                            {blogPosts.map((item:any)=>(
                                <div key={item.blog_id} className="blog-post-card">
                                    <img src={item.blog_image} alt="" />
                                    <div className="blog-post-text">
                                        <span className='blog-category'>{item.category}</span>
                                        <h6>{item.title}</h6>
                                        <span className='blog-post-date'><i className="fa-solid fa-calendar-days"></i> {item.blog_date}</span>
                                        <p>{item.post}</p>
                                        <button id='edit-btn' onClick={()=>handleEditData(item)}>edit</button>
                                        <button id='delete-btn'>delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}
export default BlogPosts