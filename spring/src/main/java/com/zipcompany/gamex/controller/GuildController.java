package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.Service.GuildService;
import com.zipcompany.gamex.domain.Guild;
import com.zipcompany.gamex.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/guild")
public class GuildController {

    private GuildService guildService;

    @Autowired
    public GuildController(GuildService guildService) {
        this.guildService = guildService;
    }

    @GetMapping(value = "")
    List<Guild> getAll() {
        return guildService.getAllGuilds();
    }
    @GetMapping(value = "/getGuildByGuildName/{guildName}")
    Guild getGuildByGuildName(@PathVariable("guildName") String guildName) {
        return guildService.findByGuildName(guildName);
    }

    @GetMapping(value = "/getGuildMembersByGuildName/{guildName}")
    List<User> getGuildMembersByGuildName(@PathVariable("guildName") String guildName) {
        return guildService.findByGuildName(guildName).getGuildUsers();
    }
}
