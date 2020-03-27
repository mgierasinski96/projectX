package com.zipcompany.gamex.domain;

import javax.persistence.*;

@Entity
public class GuildItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String guildSlot;

    private String ownerUsername;

    @OneToOne
    @JoinColumn(name = "useritem_id")
    private UserItem userItem;

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getGuildSlot() {
        return guildSlot;
    }

    public void setGuildSlot(String guildSlot) {
        this.guildSlot = guildSlot;
    }

    public UserItem getUserItem() {
        return userItem;
    }

    public void setUserItem(UserItem userItem) {
        this.userItem = userItem;
    }
}
