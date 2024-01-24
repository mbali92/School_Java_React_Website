package com.example.Mainlandschooldatabase.entity;

import jakarta.persistence.*;

@Entity
public class MainlandAbout {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int about_id;
    @Column(columnDefinition = "LONGTEXT")
    private String info;
    @Column(columnDefinition = "LONGTEXT")
    private String vision;
    @Column(columnDefinition = "LONGTEXT")
    private String mission;

    public MainlandAbout() {}

    public MainlandAbout(int about_id, String info, String vision, String mission) {
        this.about_id = about_id;
        this.info = info;
        this.vision = vision;
        this.mission = mission;
    }

    public int getAbout_id() {
        return about_id;
    }

    public String getInfo() {
        return info;
    }

    public String getVision() {
        return vision;
    }

    public String getMission() {
        return mission;
    }

    public void setAbout_id(int about_id) {
        this.about_id = about_id;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public void setVision(String vision) {
        this.vision = vision;
    }

    public void setMission(String mission) {
        this.mission = mission;
    }
}
