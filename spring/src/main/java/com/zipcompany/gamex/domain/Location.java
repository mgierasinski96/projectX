package com.zipcompany.gamex.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String locationName;

    private String locationDescription;

    @Lob
    private byte[] locationPicture;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "location")
    @OrderBy("monsterLevel ASC")
    List<Monster> monsters = new ArrayList<Monster>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocationDescription() {
        return locationDescription;
    }

    public void setLocationDescription(String locationDescription) {
        this.locationDescription = locationDescription;
    }

    public byte[] getLocationPicture() {
        return locationPicture;
    }

    public void setLocationPicture(byte[] locationPicture) {
        this.locationPicture = locationPicture;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public List<Monster> getMonsters() {
        return monsters;
    }

    public void setMonsters(List<Monster> monsters) {
        this.monsters = monsters;
    }
}
