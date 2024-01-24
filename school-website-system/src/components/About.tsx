import React, { useState,useEffect } from 'react'
import Sidebar from "./Sidebar";
import Topnavbar from "./Topnavigation";
import {PostObject, aboutInfo} from "./WebsiteInterfaces";
import Dashboardheader from './Dashboardheader';
import {useForm, SubmitHandler} from "react-hook-form"; 

function About() {
    const {register,handleSubmit,setValue}=useForm<aboutInfo>({defaultValues:{info: "",mission:"",vision:""}})
    const [menubar,setmenubar ] = useState<number>(15);
    const handleSidebar=()=>{
        menubar == 0 ? setmenubar(15) : setmenubar(0);
    }
    const [editInfo, setEditInfo] = useState<boolean>(false);

    useEffect(() => {
        const getAboutData =async()=>{
            const userToken = sessionStorage.getItem("jwtToken");
            try{ const response = await fetch("http://localhost:8080/admin/fetchAboutInfo",{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userToken 
            },
            })
            if(response.ok){
               const aboutObject:aboutInfo = await response.json();
               if(aboutObject.info !== ""){
                    Object.entries(aboutObject).forEach(([name,value]:any)=>setValue(name,value)) 
                    setEditInfo(true);
               }
            }
            }catch(error){console.log(error)}
        } 
        getAboutData();
        return() => {   
          setEditInfo(false);
        }
    }, []);
    const sendAboutInfo:SubmitHandler<aboutInfo>= async(sentAboutData) =>{
        const userToken = sessionStorage.getItem("jwtToken");
        if(editInfo){
            try{ const response = await fetch("http://localhost:8080/admin/updateAboutUs",{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userToken 
            },
            body: JSON.stringify(sentAboutData)
            })
            if(response.ok){
               window.location.href = "http://localhost:5173";
            }
            }catch(error){console.log(error)}
        }else{
            try{const response = await fetch("http://localhost:8080/admin/saveAboutInfo",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userToken 
            },
            body: JSON.stringify(sentAboutData)
            })
            if(response.ok){ window.location.href = "http://localhost:5173";}
            }catch(error){console.log(error)}
        }
    }
    return (
        <>
            <div className="page-row">
                <Sidebar widthSet={menubar}/>
                <div className="dashboard-main-content" style={{left:menubar+'%', width: menubar == 15 ? 85+'%': 100+'%'}}>
                    <Topnavbar width={handleSidebar}/>
                    <Dashboardheader pageName={"About us"} pageNavNameOne={"About"} pageNavNameTwo={""}/>
                    <div className="about_edit_container">
                        <form action="" onSubmit={handleSubmit(sendAboutInfo)}>
                            <h6><i className="lni lni-information"></i> About us: </h6>
                            <textarea {...register("info",{required:true})}  id="" placeholder='Please enter text'></textarea>
                            <div className="about_edit_statements page-row">
                                <div>
                                    <h6><i className="lni lni-eye"></i>Vision:</h6>
                                    <textarea {...register("vision",{required:true})} id="" placeholder='Please enter text'></textarea>
                                </div>
                                <div>
                                    <h6><i className="lni lni-briefcase-alt"></i>Mission:</h6>
                                    <textarea {...register("mission",{required:true})}  id="" placeholder='Please enter text'></textarea>
                                </div>
                            </div>
                            <button>Send info</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About