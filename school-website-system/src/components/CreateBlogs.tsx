import React, { useState,useEffect, useContext } from 'react'
import Sidebar from "./Sidebar";
import Topnavbar from "./Topnavigation";
import Dashboardheader from './Dashboardheader';
import {useForm, SubmitHandler} from "react-hook-form"; 
import UserProvider,{UserContext} from './UserContext';


type blogContent ={
   blog_id:number
   title: string,  
   category:string,
   post:string,
   blog_date: Date
   blog_image:any
}

function CreateBlogs() {
   const {register,handleSubmit,setValue} = useForm<blogContent>({
      shouldUseNativeValidation:true,
      defaultValues:{
         title: "",  
         category:"",
         post:"",
         blog_date:new Date()
      }
   });   
   const [edit, setEdit] = useState<boolean>(false);
   const [imageUrl, setimageUrl] = useState("");
   const [menubar,setmenubar ] = useState<number>(0);
   const [leftContentPage, setleftContentPage] = useState<number>(0);
   const [widthContentPage, setwidthContentPage] = useState<number>(100);
    
   useEffect(() => {
      const accessEditData =()=>{
         const editObject = localStorage.getItem("editData");
         if(editObject){
            setEdit(true)
            const fetchedBlogData:blogContent = JSON.parse(editObject)
            Object.entries(fetchedBlogData).forEach(([name,value]:any)=>setValue(name,value))
            setimageUrl(fetchedBlogData.blog_image)
         }
      }
      accessEditData();
      return()=>{
         if(localStorage.getItem("editData")){
            localStorage.removeItem("editData");
         }
      }
   }, []);

   const handleSidebar=()=>{
      if(window.innerWidth > 991){
         if(leftContentPage == 0){setmenubar(0); setleftContentPage(15);setwidthContentPage(85)
         }else{setmenubar(-15);setleftContentPage(0);setwidthContentPage(100)}
      }
      else{menubar == 0 ? setmenubar(-100) : setmenubar(0);}
   }

   const sendBlogPost:SubmitHandler<blogContent> =async(postData)=>{
      const updatedBlogData:blogContent = postData;
      updatedBlogData.blog_image = imageUrl;
      const userToken = sessionStorage.getItem("jwtToken");
      if(edit){
         try{ const serverResponse= await fetch(`http://localhost:8080/updateBlogPost/${updatedBlogData.blog_id}`,{
         method:"PUT",
         headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken 
         },
         body: JSON.stringify(updatedBlogData)
         })
            if(serverResponse.ok){
               window.location.href = "http://localhost:5173/blogpost";
            }
         }catch(error){console.log(error)}
      }else{
         try{ const response = await fetch("http://localhost:8080/saveBlogPost",{
         method:"POST",
         headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken 
         },
         body: JSON.stringify(updatedBlogData)
         })
            if(response.ok){
               window.location.href = "http://localhost:5173/blogpost";
            }
         }catch(error){console.log(error)}
      }
   }

   const getImageUrl=(e:any)=>{
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload =()=>{
         setimageUrl(String(fileReader.result));
      }
      fileReader.onerror=(error)=>{
         console.log(error)
      };
   }

   return (
    <>
    <div className="page-row">
        <Sidebar widthSet={menubar}/>
        <div className='dashboard-page-section dashboard-main-content'style={{left:leftContentPage +"%", width:widthContentPage+"%"}}>
            <Topnavbar width={handleSidebar}/>
            <Dashboardheader pageName={"Create blog"} pageNavNameOne={"Blog"} pageNavNameTwo={"Create blog"}/>
            <div className="create-blog-content">  
                  <form action="" onSubmit={handleSubmit(sendBlogPost)}>
                     <div className="create-blog-title create_blog_section">
                        <h6>Blog title</h6>
                        <input {...register("title", { required: "Please enter title." })}   type="text" placeholder='Please enter title' />
                     </div> 
                     <div className="create-blog-date create_blog_section">
                        <h6>Select blog date</h6>
                        <input {...register("blog_date", { required: "Please enter your first name." })} type="date" placeholder='Please enter title' />
                     </div> 
                     <div className="blog-category create_blog_section">
                        <h6>Add category</h6>
                        <select {...register("category", { required: true })} >
                           <option disabled>Select category</option>
                           <option value="matric dance">matric dance </option>
                           <option value="school awards">school awards </option>
                           <option value="school events">school events </option>
                        </select>
                     </div>
                     <div className="write-blog create_blog_section">
                        <h6>Write post</h6>
                        <textarea {...register("post", { required: "Please enter post." })} id="" placeholder='please write a post' ></textarea>
                     </div>
                     <div className="add_blog_image create_blog_section">
                        <h6>Add image</h6>
                        <div className="edit_blog_image">
                           <img style={{display: imageUrl?"block":"none"}} src={imageUrl} alt="" />
                           add image to preview
                        </div>
                        <div className="create-blog-btns">
                           <button id='upload-file'>choose image</button>
                           <input onChange={e=>getImageUrl(e)} type="file" name="" id="" />
                        </div>   
                        <button id='post-blog-btn'>post blog</button>
                     </div>
                  </form>
            </div>
        </div>
    </div>
    </>
   )
}

export default CreateBlogs