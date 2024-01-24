package com.example.Mainlandschooldatabase.controller;

import com.example.Mainlandschooldatabase.entity.MainlandBlog;
import com.example.Mainlandschooldatabase.entity.RegistrationDTO;
import com.example.Mainlandschooldatabase.services.ActionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ActionController {
    @Autowired
    private ActionService actionService;

    @PostMapping("/getUserRole")
    public String findUserRole(@RequestBody RegistrationDTO body){
        return (actionService.searchUserRole(body.getUsername()));
    }
    @PostMapping("/saveBlogPost")
    public String postBlogs(@RequestBody MainlandBlog blog){
        Authentication authicationDetails = SecurityContextHolder.getContext().getAuthentication();
        if(authicationDetails != null && authicationDetails.isAuthenticated() ){
            return actionService.saveBlogPost(blog, authicationDetails.getName());
        }else{return  "user was not found";}
    }
    @GetMapping("/getBlogPost")
    public List<MainlandBlog> findBlogPost(){
        Authentication authicationDetails = SecurityContextHolder.getContext().getAuthentication();
        List<MainlandBlog> blogPostList = null;
        if(authicationDetails != null && authicationDetails.isAuthenticated() ){
            blogPostList = actionService.getBlogPosts(authicationDetails.getName());
        }
        return  blogPostList;
    }
    @PutMapping("/updateBlogPost/{post_id}")
    public String updateBlogPost(@PathVariable int post_id, @RequestBody MainlandBlog blogArticle){
        return actionService.updateBlogArtcle(post_id, blogArticle);
    }

}
