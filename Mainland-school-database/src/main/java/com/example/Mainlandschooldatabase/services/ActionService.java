package com.example.Mainlandschooldatabase.services;

import com.example.Mainlandschooldatabase.entity.*;
import com.example.Mainlandschooldatabase.repository.BlogReprository;
import com.example.Mainlandschooldatabase.repository.UserReprository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ActionService {
    @Autowired
    private UserReprository userReprository;

    @Autowired
    private BlogReprository blogReprository;

    public String searchUserRole(String username){
        MainlandUsers userInfo = userReprository.findByUsername(username).get();
        String foundRole =null;
        for (GrantedAuthority authority : userInfo.getAuthorities()){
            foundRole = authority.getAuthority();
        }
        return foundRole;
    }
    public String saveBlogPost(MainlandBlog blog,String username){
        MainlandUsers user = userReprository.findByUsername(username).get();
        List<MainlandBlog> userBlogPost = user.getBlog();
        userBlogPost.add(blog);
        user.setBlog(userBlogPost);
        if(userReprository.save(user) != null){
            return "user blog post saved";
        }else {return "blog post not send";}
    }
    public String updateBlogArtcle(int id, MainlandBlog blogArticle){
        MainlandBlog blogPoster =   blogReprository.findById(id).get();
        blogPoster.setTitle(blogArticle.getTitle());
        blogPoster.setCategory(blogPoster.getCategory());
        blogPoster.setBlog_date(blogArticle.getBlog_date());
        blogPoster.setPost(blogArticle.getPost());
        blogPoster.setBlog_image(blogArticle.getBlog_image());
        if(blogReprository.save(blogPoster) != null){
            return "blog post sent";
        };
        return "blog post could not be saved";
    }
    public List<MainlandBlog> getBlogPosts(String username){
        MainlandUsers blogWriter= userReprository.findByUsername(username).get();
        return blogWriter.getBlog();
    }
    public String saveAboutInfo(MainlandAbout about, String username){
        MainlandUsers user = userReprository.findByUsername(username).get();
        user.setAbout(about);
        if(userReprository.save(user) != null) {
            return "about info saved";
        } return "info could not be saved";
    }

    public MainlandAbout getAboutInfo(String username){
        MainlandUsers user = userReprository.findByUsername(username).get();
        return user.getAbout();
    }

    public String updateAboutInfo(MainlandAbout about, String username){
        MainlandUsers user = userReprository.findByUsername(username).get();
        MainlandAbout aboutData = user.getAbout();
        aboutData.setInfo(about.getInfo());
        aboutData.setMission(about.getMission());
        aboutData.setVision(about.getVision());
        if(userReprository.save(user) !=null){
            return "about info updated";
        }return "about could not be updated";
    }
    public String saveContactInfo(MainlandContact contact, String username){
        MainlandUsers user = userReprository.findByUsername(username).get();
        user.setContact(contact);
        if(userReprository.save(user) != null) {
            return "about info saved";
        } return "info could not be saved";
    }

    public MainlandContact getContactInfo(String username){
        MainlandUsers user = userReprository.findByUsername(username).get();
        return user.getContact();
    }

    public String updateContactInfo(MainlandContact contact, String username){
        MainlandUsers user = userReprository.findByUsername(username).get();
        MainlandContact contactData = user.getContact();
        contactData.setNumber(contact.getNumber());
        contactData.setFacebook(contact.getFacebook());
        contactData.setTicktock(contact.getTicktock());
        contact.setEmail(contact.getEmail());
        contactData.setAddress(contact.getAddress());
        contactData.setInstagram(contactData.getInstagram());

        if(userReprository.save(user) !=null){
            return "about info updated";
        }return "about could not be updated";
    }

    public List<UserDTO> findAllUsers(){

         List<UserDTO> userDeatilsList = new ArrayList<>();

         List <MainlandUsers> allUsers = userReprository.findAll();
         for (MainlandUsers singleUser:  allUsers){
             UserDTO displayedUserDetails = new UserDTO(singleUser.getUser_id(), singleUser.getEmail(), singleUser.getEmail());
             userDeatilsList.add(displayedUserDetails);
         }
         return userDeatilsList;
    }
    public String deleteUser(int user_id){
          userReprository.deleteById(user_id);
          return "user deleted";
    }

}
