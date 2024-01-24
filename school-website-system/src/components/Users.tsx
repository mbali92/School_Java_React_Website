import React, { useState,useEffect } from 'react'
import Sidebar from "./Sidebar";
import Topnavbar from "./Topnavigation";
import Dashboardheader from './Dashboardheader';

interface UserDetails{
    user_id:number,
    email:string,
    username:string
}

function Users() {
    const [menubar,setmenubar ] = useState<number>(15);
    const handleSidebar=()=>{
        menubar == 0 ? setmenubar(15) : setmenubar(0);
    }
    const [users, setUsers] = useState<UserDetails[]>([]);

    useEffect(() => {
         const getUsers =async()=>{
            const userToken = sessionStorage.getItem("jwtToken");
            try{ const response = await fetch("http://localhost:8080/admin/fetchUsers",{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userToken 
            },
            })
            if(response.ok){
               const userInfo:UserDetails[] = await response.json();
               if(userInfo){
                  setUsers(userInfo)
               }
            }
            }catch(error){console.log(error)}
        } 
        getUsers()
        return () => {
            setUsers([]);
        }
    }, []);
    
     const deleteUser =async(useId:number)=>{
            const userToken = sessionStorage.getItem("jwtToken");
            try{ const response = await fetch(`http://localhost:8080/admin/deleteUser${useId}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userToken 
            },
            })
            if(response.ok){
               const deleteMsg:string = await response.text();
               console.log(deleteMsg)
               window.location.reload()
            }
            }catch(error){console.log(error)}
        } 
  return (
    <>
    <div className="page-row">
        <Sidebar widthSet={menubar}/>
        <div className="dashboard-main-content" style={{left:menubar+'%', width: menubar == 15 ? 85+'%': 100+'%'}}>
            <Topnavbar width={handleSidebar}/>
            <Dashboardheader pageName={"Users"} pageNavNameOne={"users"} pageNavNameTwo={""}/>
            <div className="users-table">
                <div className="user-table-row">
                    <div className="user_row_title page-row">
                        <h6> <i className="lni lni-users"></i> User Name</h6>
                        <h6> <i className="lni lni-phone-set"></i>User Email</h6>
                        <h6> <i className="lni lni-user"></i>Designation</h6>
                        <h6><i className="lni lni-plus"></i>Action</h6>
                    </div>
                    {
                        users.map((item,item_id)=>
                            <div key={item_id} className="user_details_row">
                                <p className='user_details_col'>{item.username}</p>
                                <p className='user_details_col'>{item.email}</p>
                                <p className='user_details_col'>Teacher</p>
                                <div className="user_action user_details_col">
                                <i onClick={()=>deleteUser(item_id)} className="lni lni-trash-can"></i>
                                <i className="lni lni-pencil"></i>
                                </div>
                            </div> 
                        )
                    }
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Users