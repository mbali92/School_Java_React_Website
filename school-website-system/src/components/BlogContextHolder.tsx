import React from 'react'
import CreateBlogs from './CreateBlogs'
import BlogPosts from './BlogPosts'
import UserProvider from "./UserContext"

function BlogContextHolder() {
  return (
    <UserProvider>
      <CreateBlogs/>
      <BlogPosts/>
    </UserProvider>  
  )
}

export default BlogContextHolder