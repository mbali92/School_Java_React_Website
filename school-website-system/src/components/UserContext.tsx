import React from "react";
import {PostObject} from "./WebsiteInterfaces";
import { createContext,Dispatch, useState,SetStateAction,ReactNode} from "react";

export type AuthUser= {
  email:string,
  name:string
  
}
type UserContextType={
  user:AuthUser| null
  setUser: Dispatch<SetStateAction<AuthUser | null>>
}


export const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps={
  children:ReactNode
}

export default function UserProvider({children}:UserProviderProps){
  const [user, setUser] = useState<AuthUser|null>(null);
  
  return(
    <UserContext.Provider value={{user, setUser}}>
    {children}
  </UserContext.Provider>
  )
  
}

