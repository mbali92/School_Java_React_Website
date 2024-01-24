import React,{useState} from 'react'

export interface PostObject{
   blog_id:number,
   title: string, 
   category:string,
   post:string,
   blog_date: Date,
   blog_image:any
}
export type aboutInfo={
   about_id:number,
    info: string,
    mission:string,
    vision:string
}
export type contactInfo={
   number:string;
   email:string;
   ticktock:string;
   facebook:string;
   instagram:string;
   address:string;
}