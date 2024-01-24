package com.example.Mainlandschooldatabase.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.security.core.GrantedAuthority;

@Entity
public class MainlandRoles implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int role_id;
    private String authority;

    public MainlandRoles() {
    }
    public MainlandRoles(String authority){
        this.authority = authority;
    }
    public MainlandRoles(int role_id, String authority) {
        this.role_id = role_id;
        this.authority = authority;
    }
    public void setRole_id(int role_id) {
        this.role_id = role_id;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public int getRole_id() {
        return role_id;
    }

    @Override
    public String getAuthority() {
        return this.authority;
    }

}
