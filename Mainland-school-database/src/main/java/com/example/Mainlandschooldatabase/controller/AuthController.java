package com.example.Mainlandschooldatabase.controller;

import com.example.Mainlandschooldatabase.entity.RegistrationDTO;
import com.example.Mainlandschooldatabase.services.AuthenticationService;
import com.example.Mainlandschooldatabase.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/registerUser")
    public String userRegistration(@RequestBody RegistrationDTO body){
        return authenticationService.registerUser(body.getUsername(), body.getEmail(), body.getPassword());
    }

    @PostMapping("/login")
    public String userLogin(@RequestBody RegistrationDTO body){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(body.getUsername(), body.getPassword()));
        if (authentication != null && authentication.isAuthenticated()) {
            return  jwtService.generateToken(body.getUsername());
        } else {
            throw new BadCredentialsException("Invalid username or password");
        }
    }
    @GetMapping("/getWebsiteInfo")
    public ArrayList<Object> getWebsiteText(){
       return authenticationService.getWebsiteText();
    }
}
