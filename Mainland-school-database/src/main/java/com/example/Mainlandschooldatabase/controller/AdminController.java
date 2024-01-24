package com.example.Mainlandschooldatabase.controller;

import com.example.Mainlandschooldatabase.entity.MainlandAbout;
import com.example.Mainlandschooldatabase.entity.MainlandContact;
import com.example.Mainlandschooldatabase.entity.UserDTO;
import com.example.Mainlandschooldatabase.services.ActionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {
    @Autowired
    private ActionService actionService;
    @PostMapping("/saveAboutInfo")
    public String saveAboutInfo(@RequestBody MainlandAbout about){
        Authentication authicationDetails = SecurityContextHolder.getContext().getAuthentication();
        String massageReturned = "";
        if(authicationDetails != null && authicationDetails.isAuthenticated() ){
            massageReturned = actionService.saveAboutInfo(about, authicationDetails.getName());
            return massageReturned;
        }else{return  massageReturned;}
    }
    @GetMapping("/fetchAboutInfo")
    public MainlandAbout findAboutInfo(){
        Authentication authicationDetails = SecurityContextHolder.getContext().getAuthentication();
        MainlandAbout aboutInfoHolder = null;
        if(authicationDetails != null && authicationDetails.isAuthenticated() ){
            aboutInfoHolder = actionService.getAboutInfo(authicationDetails.getName());
        }return aboutInfoHolder;
    }
    @PutMapping("/updateAboutUs")
    public String updateAboutInfo(@RequestBody MainlandAbout about){
        Authentication authicationDetails = SecurityContextHolder.getContext().getAuthentication();
        String massageReturned = "";
        if(authicationDetails != null && authicationDetails.isAuthenticated() ){
            massageReturned = actionService.updateAboutInfo(about, authicationDetails.getName());
            return massageReturned;
        }else{return  massageReturned;}
    }
    @PostMapping("/saveContactInfo")
    public String saveContactInfo(@RequestBody MainlandContact contact){
        Authentication authicationDetails = SecurityContextHolder.getContext().getAuthentication();
        String massageReturned = "";
        if(authicationDetails != null && authicationDetails.isAuthenticated() ){
            massageReturned = actionService.saveContactInfo(contact, authicationDetails.getName());
            return massageReturned;
        }else{return  massageReturned;}
    }
    @GetMapping("/fetchContactInfo")
    public MainlandContact findContactInfo(){
        Authentication authicationDetails = SecurityContextHolder.getContext().getAuthentication();
        MainlandContact contactInfoHolder = null;
        if(authicationDetails != null && authicationDetails.isAuthenticated() ){
            contactInfoHolder = actionService.getContactInfo(authicationDetails.getName());
        }return contactInfoHolder;
    }
    @PutMapping("/updateContactUs")
    public String updateContactInfo(@RequestBody MainlandContact contact){
        Authentication authicationDetails = SecurityContextHolder.getContext().getAuthentication();
        String massageReturned = "";
        if(authicationDetails != null && authicationDetails.isAuthenticated() ){
            massageReturned = actionService.updateContactInfo(contact, authicationDetails.getName());
            return massageReturned;
        }else{return  massageReturned;}
    }
    @GetMapping("/fetchUsers")
    public List<UserDTO> fetchUsers(){
         return actionService.findAllUsers();
    }
    @DeleteMapping("/deleteUser{user_id}")
    public String RemoveUser(@PathVariable int user_id){
        return actionService.deleteUser(user_id);
    }

}
