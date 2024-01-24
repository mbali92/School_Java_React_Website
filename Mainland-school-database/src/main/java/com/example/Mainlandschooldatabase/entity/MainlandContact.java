package com.example.Mainlandschooldatabase.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MainlandContact {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int contact_id;
    private String number;
    private String email;
    private String ticktock;
    private String facebook;
    private String instagram;
    private String address;

    public MainlandContact() {
    }

    public MainlandContact(int contact_id, String number, String email, String ticktock, String facebook, String instagram, String address) {
        this.contact_id = contact_id;
        this.number = number;
        this.email = email;
        this.ticktock = ticktock;
        this.facebook = facebook;
        this.instagram = instagram;
        this.address = address;
    }

    public int getContact_id() {
        return contact_id;
    }

    public void setContact_id(int contact_id) {
        this.contact_id = contact_id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTicktock() {
        return ticktock;
    }

    public void setTicktock(String ticktock) {
        this.ticktock = ticktock;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getInstagram() {
        return instagram;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
