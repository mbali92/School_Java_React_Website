package com.example.Mainlandschooldatabase.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class MainlandBlog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int blog_id;
    private String title;
    private String category;
    @Column(columnDefinition = "LONGTEXT")
    private String post;
    private Date blog_date;
    @Column(columnDefinition = "LONGTEXT")
    private String blog_image;

    public MainlandBlog() {
    }

    public MainlandBlog(int blog_id, String title, String category, String post, Date blog_date, String blog_image) {
        this.blog_id = blog_id;
        this.title = title;
        this.category = category;
        this.post = post;
        this.blog_date = blog_date;
        this.blog_image = blog_image;
    }

    public int getBlog_id() {
        return blog_id;
    }

    public void setBlog_id(int blog_id) {
        this.blog_id = blog_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPost() {
        return post;
    }

    public void setPost(String post) {
        this.post = post;
    }

    public Date getBlog_date() {
        return blog_date;
    }

    public void setBlog_date(Date blog_date) {
        this.blog_date = blog_date;
    }

    public String getBlog_image() {
        return blog_image;
    }

    public void setBlog_image(String blog_image) {
        this.blog_image = blog_image;
    }
}
