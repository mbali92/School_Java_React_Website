package com.example.Mainlandschooldatabase.entity;

import java.util.ArrayList;
import java.util.List;

public class WebsiteDataDTO {
    private List<MainlandAbout> about = null;
    private List<MainlandContact> contacts = null;
    private List<MainlandBlog> blog =null;

    public WebsiteDataDTO() {
    }

    public WebsiteDataDTO(List<MainlandAbout> about, List<MainlandContact> contacts, List<MainlandBlog> blog) {
        this.about = new ArrayList<MainlandAbout>();
        this.contacts = new ArrayList<MainlandContact>();
        this.blog = new ArrayList<MainlandBlog>();
    }

    public List<MainlandAbout> getAbout() {
        return about;
    }

    public void setAbout(List<MainlandAbout> about) {
        this.about = about;
    }

    public List<MainlandContact> getContacts() {
        return contacts;
    }

    public void setContacts(List<MainlandContact> contacts) {
        this.contacts = contacts;
    }

    public List<MainlandBlog> getBlog() {
        return blog;
    }

    public void setBlog(List<MainlandBlog> blog) {
        this.blog = blog;
    }
}
