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
}
