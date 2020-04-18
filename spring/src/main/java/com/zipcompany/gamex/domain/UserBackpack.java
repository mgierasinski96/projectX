package com.zipcompany.gamex.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "USER_BACKPACK")
public class UserBackpack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String kolor;


    @JsonIgnore
    @OneToMany(mappedBy = "userBackpack",
                cascade = CascadeType.ALL)
    private List<UserItem> userItemList;

    @JsonIgnore
    @OneToOne(mappedBy = "userBackpack", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private User user;


    public List<UserItem> getUserItemList() {
        return userItemList;
    }

    public void addItem(UserItem userItem){
        userItemList.add(userItem);
        userItem.setUserBackpack(this);
    }

    public void removeItem(UserItem userItem){
        userItemList.remove(userItem);
        userItem.setUserBackpack(null);
    }

    public UserBackpack(){

    }

    public UserBackpack(String kolor){
        this.kolor = kolor;
    }

    public User getUser() {
        return user;
    }


    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKolor() {
        return kolor;
    }

    public void setKolor(String kolor) {
        this.kolor = kolor;
    }
}
