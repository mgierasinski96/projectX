package com.zipcompany.gamex.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Guild {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String guildName;

    private String guildTag;

    @OneToMany(mappedBy = "guild")
    @JsonIgnore
    private List<User> guildUsers = new ArrayList<>();

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "guildLeader")
    private User guildLeader;

    private int guildGold;

    private int mainBuildingLevel;

    private int storeLevel;

    private int mineLevel;

    private int orcLevel;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name ="guild_items")
    private List<GuildItem> guildItems= new ArrayList<>();

    public List<GuildItem> getGuildItems() {
        return guildItems;
    }

    public void setGuildItems(List<GuildItem> guildItems) {
        this.guildItems = guildItems;
    }

    public int getMainBuildingLevel() {
        return mainBuildingLevel;
    }

    public void setMainBuildingLevel(int mainBuildingLevel) {
        this.mainBuildingLevel = mainBuildingLevel;
    }

    public int getStoreLevel() {
        return storeLevel;
    }

    public void setStoreLevel(int storeLevel) {
        this.storeLevel = storeLevel;
    }

    public int getGuildGold() {
        return guildGold;
    }

    public void setGuildGold(int guildGold) {
        this.guildGold = guildGold;
    }

    public User getGuildLeader() {
        return guildLeader;
    }

    public void setGuildLeader(User guildLeader) {
        this.guildLeader = guildLeader;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGuildName() {
        return guildName;
    }

    public void setGuildName(String guildName) {
        this.guildName = guildName;
    }

    public List<User> getGuildUsers() {
        return guildUsers;
    }

    public void setGuildUsers(List<User> guildUsers) {
        this.guildUsers = guildUsers;
    }

    public String getGuildTag() {
        return guildTag;
    }

    public void setGuildTag(String guildTag) {
        this.guildTag = guildTag;
    }

    public int getMineLevel() {
        return mineLevel;
    }

    public void setMineLevel(int mineLevel) {
        this.mineLevel = mineLevel;
    }

    public int getOrcLevel() {
        return orcLevel;
    }

    public void setOrcLevel(int orcLevel) {
        this.orcLevel = orcLevel;
    }
}
