import React,{useEffect,useState} from 'react'
import "./stylesheet/home.css";
import galleryImgOne from "../assets/gallery-image1.jpg";
import galleryImgTwo from "../assets/gallery-image2.jpg";
import galleryImgThree from "../assets/gallery-image3.jpg";
import galleryImgFour from "../assets/gallery-image4.jpg";
import {PostObject, aboutInfo,contactInfo} from "./WebsiteInterfaces";


function Home() {
    const [contact, setContact] = useState<contactInfo[]>([{number:"",email:"",ticktock:"",facebook:"",instagram:"",address:""}]);
    const [siteAbout,setSiteAbout] = useState<aboutInfo[]>([{about_id:0,info: "",mission:"",vision:""}]);
    const [blog, setBlog] = useState<PostObject[]>([{blog_id:0,title: "", category:"",post:"",blog_date:new Date,blog_image:""}]);   
    useEffect(() => {
        const homeWebsiteData =async()=>{
            try{ const response = await fetch("http://localhost:8080/auth/getWebsiteInfo",{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            },
            })
            if(response.ok){
               const websiteInfo = await response.json();
               setSiteAbout(websiteInfo[0])
               setContact(websiteInfo[1])
               setBlog(websiteInfo[2])
            }
            }catch(error){console.log(error)}
        } 
        homeWebsiteData();
     
        return () => {
            
        }
    }, []);
  return (
    <>
    <header>
        <nav>
            <div className="small_nav">
                <div className="container">
                    <div className="page-row">
                        <div className="nav_contact_details">
                            <span className='blog-date'><i className="fa-solid fa-phone"></i>{contact[0].number} </span>
                            <span><i className="fa-solid fa-envelopes-bulk"></i> {contact[0].email}</span>
                        </div>
                        <div className="nav_btns">
                            <span onClick={()=>{location.href="http://localhost:5173/dashboard"}}><i className="fa-solid fa-users-line"></i> Portal</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="big_nav">
                <div className="container">
                    <a href="#hero_section" style={{color:"blue"}}>Home</a>
                    <a href="#about-section">about</a>
                    <span className="logo"><i className="fa-solid fa-school"></i> mainland</span>
                    <a href="#gallery-section">Gallery</a>
                    <a href="#blog-section">Blog</a>
                    <a href="">contact us </a>
                </div>
            </div>
        </nav>
        <div className="hero_section" id="hero_section">
            <div className="container">
                <div className="page-row">
                    <div className="hero_text">
                        <span id="hero-subtitle"> Home of academic excellence </span>
                        <h1>Welcome to <span>Mainland</span> Pre School.</h1>
                        <p>Welcome to Mainland pre school where the power of academic 
                            excellence begins. Please feel free to browse our site and see what we can offer. </p>
                        <button id='header-btn'>Learn more -</button>
                    </div>
                    <div className="hero_image_wrapper">
                        <div className="hero_img_box">
                            <img src={galleryImgOne} alt=""/>
                            <img src={galleryImgTwo} alt=""/>
                        </div>
                        <img id="hero-img-three" src={galleryImgThree} alt=""/>
                    </div>
                </div>
            </div>
        </div>
   </header>
   <div className="about-section" id="about-section">
        <div className="container">
            <div className="page-row">
                <div className="about_image_section">
                    <img src={galleryImgFour} id="big-about-img" alt=""/>
                    <div id="about-image-textbox">
                        <span>100+</span>
                        <p>pre school graduates</p>
                    </div>
                </div>
                <div className="about_text_section">
                    <div className="section-title">
                        <span className="subtitle">About us</span>
                        <h1>Best pre school to narture your kids skills </h1>
                        <p>{siteAbout[0].info}</p>
                    </div>
                    <div className="about_sub_textsect">
                        <div className="about_statements">
                            <i className="fa-solid fa-briefcase"></i>
                            <h6>Our Mission:</h6>
                            <p>{siteAbout[0].mission}</p>
                        </div>
                        <div className="about_statements">
                        <i className="fa-regular fa-eye"></i>
                            <h6>Our Vission:</h6>
                            <p>{siteAbout[0].vision}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
   <div className="blog-section" id="blog-section">
        <div className="container">
            <div className="section-title">
                <div className="blog-title">
                    <span className="subtitle">our blog</span>
                    <h1>Our school articles written by teachers</h1>
                </div>
            </div>
            <div className="page-row">
                {
                    blog.map((item,index)=>
                        <div key={item.blog_id} className="blog-card-col">
                            <div className="blog-card">
                                <img src={item.blog_image} alt=""/>
                                <div className="blog-text">
                                    <span className='category'>{item.category}</span>
                                    <h6>{item.title}</h6>
                                    <span className='blog-date'><i className="fa-solid fa-calendar-days"></i>{}</span>
                                    <div className='card-text'><p>{item.post}</p></div>
                                    <button>read more <i className="fa-solid fa-arrow-right"></i> </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="blog_section_btn_box">
               <button id="more-posts">More post <i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
   </div>
   <div className="gallery-section" id="gallery-section">
       <div className="container">
          <div className="gallery_title">
             <div className="section-title">
             <span className="subtitle">Our Gallery</span>
                <h1>Our school events gallery</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam sunt neque,
                     architecto incidunt alias illo repudiandae cum.</p>
             </div>
             <div className="page-row">
                    <div className="big-gallery-column">
                        <div className="big-gallery-row-one">
                           <div><img src={galleryImgOne} alt="" /> </div>
                           <div><img src={galleryImgTwo} alt="" /></div>
                        </div>
                        <div className="big-gallery-row-two">
                           <div><img src={galleryImgThree} alt=""/> </div>
                           <div><img src={galleryImgOne} alt="" /></div>
                        </div>
                    </div>
                    <div className="small-gallery-column">
                        <div><img src={galleryImgFour} alt="" /></div>
                    </div>
             </div>
          </div>
          <div className="gallery-nav-arrows">
            <i className="fa-solid fa-arrow-left"></i>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
       </div>
   </div> 
    </>
  )
}

export default Home;