import React, { useState,useEffect} from 'react'
import Sidebar from "./Sidebar";
import Topnavbar from "./Topnavigation";
import Dashboardheader from './Dashboardheader';
import {useForm, SubmitHandler} from "react-hook-form"; 

type contactDetails={number:string,email:string,ticktock:string, facebook:string,instagram:string,address:string}

function Contact() {
    const [editContact, seteditContact] = useState<boolean>(false);
    const {register,handleSubmit,setValue}=useForm<contactDetails>({defaultValues:{email:"",number:"",ticktock:"",facebook:"",instagram:"",address:""}})
    const [leftContentPage, setleftContentPage] = useState<number>(0);
    const [widthContentPage, setwidthContentPage] = useState<number>(100);
    const [menubar,setmenubar ] = useState<number>(0);


    useEffect(() => {
        const getContactData =async()=>{
            const userToken = sessionStorage.getItem("jwtToken");
            try{ const response = await fetch("http://localhost:8080/admin/fetchContactInfo",{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userToken 
            },
            })
            if(response.ok){
               const contactObject:contactDetails = await response.json();
               if(contactObject.email !== ""){
                    Object.entries(contactObject).forEach(([name,value]:any)=>setValue(name,value)) 
                    seteditContact(true);
               }else{console.log("contact data was not found")}
            }
            }catch(error){console.log(error)}
        } 
        getContactData();
        return () => {
            seteditContact(false);
        }
    }, []);
    const sendContactInfo:SubmitHandler<contactDetails>= async(sentContactData) =>{
        const userToken = sessionStorage.getItem("jwtToken");
        if(editContact){
            try{ const response = await fetch("http://localhost:8080/admin/updateContactUs",{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userToken 
            },
            body: JSON.stringify(sentContactData)
            })
            if(response.ok){
               window.location.href = "http://localhost:5173";
            }
            }catch(error){console.log(error)}
        }else{
            try{const response = await fetch("http://localhost:8080/admin/saveContactInfo",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userToken 
            },
            body: JSON.stringify(sentContactData)
            })
            if(response.ok){ window.location.href = "http://localhost:5173";}
            }catch(error){console.log(error)}
        }
    }
    const handleSidebar=()=>{
      if(window.innerWidth > 1200){
         if(leftContentPage == 0){setmenubar(0); setleftContentPage(15);setwidthContentPage(85)
         }else{setmenubar(-15);setleftContentPage(0);setwidthContentPage(100)}
      }
      else{menubar == 0 ? setmenubar(-100) : setmenubar(0);}
    }
  return (
    <>
    <div className="page-row">
        <Sidebar widthSet={menubar}/>
        <div className="dashboard-main-content" style={{left:leftContentPage+'%', width: widthContentPage+'%'}}>
            <Topnavbar width={handleSidebar}/>
            <Dashboardheader pageName={"Enter contact"} pageNavNameOne={"contact"} pageNavNameTwo={""}/>
            <div className="contact-page">
                <form action="" onSubmit={handleSubmit(sendContactInfo)}>
                    <div className='contact_details'>
                        <div>
                            <h6>Email</h6>
                            <input {...register("email",{required:true})} type="text"  id="" />
                        </div>
                        <div>
                            <h6>Mobile</h6>
                            <input {...register("number",{required:true})} type="text"  id="" />
                        </div>
                    </div>
                    <div className="address">
                        <h6>Address</h6>
                        <textarea {...register("address",{required:true})} id="" ></textarea>
                    </div>
                    <div className="socials">
                        <div>
                            <h6>facebook link</h6>
                            <input {...register("facebook",{required:true})} type="text"  id="" />
                        </div>
                        <div>
                            <h6>ticktock link</h6>
                            <input {...register("ticktock",{required:true})} type="text" id="" />
                        </div>
                        <div>
                            <h6>instagram link</h6>
                            <input {...register("instagram",{required:true})} type="text"  id="" />
                        </div>
                    </div>
                    <button>Send Contact</button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Contact