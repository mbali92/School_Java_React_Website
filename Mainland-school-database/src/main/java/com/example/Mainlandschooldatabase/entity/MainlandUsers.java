package com.example.Mainlandschooldatabase.entity;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
public class MainlandUsers implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int user_id;
    private String username;
    private String password;
    private String email;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name ="mailanduser_role_junction",
            joinColumns = {@JoinColumn( name ="user_id" )},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    private Set<MainlandRoles> authorities;
    @OneToMany(cascade = CascadeType.ALL)
    private List<MainlandBlog> blog;

    @OneToOne(cascade = CascadeType.ALL)
    private MainlandAbout about;
    @OneToOne(cascade = CascadeType.ALL)
    private MainlandContact contact;

    public MainlandUsers() {
    }
    public MainlandUsers(int user_id, String username, String password, String email, Set<MainlandRoles> authorities, List<MainlandBlog> blog, MainlandAbout about, MainlandContact contact) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.authorities = authorities;
        this.blog = blog;
        this.about = about;
        this.contact = contact;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<MainlandBlog> getBlog() {
        return blog;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAbout(MainlandAbout about) {
        this.about = about;
    }

    public void setContact(MainlandContact contact) {
        this.contact = contact;
    }

    public void setAuthorities(Set<MainlandRoles> authorities) {
        this.authorities = authorities;
    }

    public void setBlog(List<MainlandBlog> blog) {this.blog = blog;}

    public int getUser_id() {
        return user_id;
    }

    public MainlandAbout getAbout() {
        return about;
    }

    public MainlandContact getContact() {
        return contact;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
