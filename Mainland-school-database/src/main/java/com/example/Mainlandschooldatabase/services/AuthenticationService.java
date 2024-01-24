package com.example.Mainlandschooldatabase.services;

import com.example.Mainlandschooldatabase.entity.*;
import com.example.Mainlandschooldatabase.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class AuthenticationService {
    @Autowired
    private UserReprository userReprository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RolesReprository rolesReprository;
    @Autowired
    private BlogReprository blogReprository;
    @Autowired
    private AboutReprository aboutReprository;
    @Autowired
    private ContactReprository contactReprository;

    public String registerUser(String username, String email, String password){

        Optional<MainlandRoles> availableRoles = rolesReprository.findByAuthority("ROLE_ADMIN");
        if(availableRoles.isEmpty()){
            rolesReprository.save(new MainlandRoles("ROLE_ADMIN"));
            rolesReprository.save(new MainlandRoles("ROLE_USER"));
        }

        String endocdedPassword = passwordEncoder.encode(password);

        MainlandRoles userRole = null;
        if(username.equals("admin") && password.equals("password")){
            userRole = rolesReprository.findByAuthority("ROLE_ADMIN").get();
        }else{userRole = rolesReprository.findByAuthority("ROLE_USER").get();}

        HashSet<MainlandRoles> role = new HashSet<>();
        role.add(userRole);

        MainlandUsers insertUser = new MainlandUsers(0,username, endocdedPassword, email, role, null,null,null);
        try{
            userReprository.save(insertUser);
            return "User registered successfully";
        }catch (Exception e){ return "problem with registering the user";}
    }

    public ArrayList<Object> getWebsiteText(){
        ArrayList<Object> websiteDataList = new ArrayList<>();

        websiteDataList.add(aboutReprository.findAll());
        websiteDataList.add(contactReprository.findAll());
        websiteDataList.add(blogReprository.findAll());
        return websiteDataList;
    }
}
