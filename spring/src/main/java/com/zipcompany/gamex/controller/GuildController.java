package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.Service.GuildService;
import com.zipcompany.gamex.Service.MessageService;
import com.zipcompany.gamex.Service.UserService;
import com.zipcompany.gamex.domain.Guild;
import com.zipcompany.gamex.domain.Message;
import com.zipcompany.gamex.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/guild")
public class GuildController {

    private GuildService guildService;
    private UserService userService;
    private MessageService messageService;

    @Autowired
    public GuildController(GuildService guildService, UserService userService,MessageService messageService) {
        this.guildService = guildService;
        this.userService = userService;
        this.messageService = messageService;
    }


    @GetMapping(value = "")
    List<Guild> getAll() {
        return guildService.getAllGuilds();
    }

    @PostMapping(value = "/{leaderUsername}")
    Guild safeGuild(@RequestBody Guild guild, @PathVariable("leaderUsername") String leaderUsername) {
        User user=userService.findByUsername(leaderUsername);
        guild.setGuildLeader(user);
        guild.getGuildUsers().add(user);
        user.setGuild(guild);
        return guildService.safeGuild(guild);
    }

    @GetMapping(value = "/sendInvitation/{invitedUsername}/{ivitingUsername}/{guildName}")
    public Message invitePlayerToGuild(@PathVariable("invitedUsername") String invitedUsername, @PathVariable("ivitingUsername") String ivitingUsername
    ,@PathVariable("guildName") String guildName) {
        Message message=new Message();
        message.setSender(userService.findByUsername(ivitingUsername));
        message.setReceiver(userService.findByUsername(invitedUsername));
        message.setMessageContent("Witaj właśnie zostałeś zaproszony do gildii <a class=\"guildInvitation\" _ngcontent-gnl-c150=\"\" ng-reflect-router-link=\"/ranking/guild/,"+guildName+"\" href=\"/ranking/guild/"+guildName+"\">"+guildName+"</a>");
        return messageService.safeMessage(message);
    }

    @GetMapping(value = "/removeFromGuild/{username}")
    public void removePlayerFromGuild(@PathVariable("username") String username) {
            User user=userService.findByUsername(username);
            user.setGuild(null);
            userService.safeUser(user);
    }

    @GetMapping(value = "/getGuildByGuildName/{guildName}")
    Guild getGuildByGuildName(@PathVariable("guildName") String guildName) {
        return guildService.findByGuildName(guildName);
    }

    @GetMapping(value = "/getGuildLeaderByGuildName/{guildName}")
    User getGuildLeaderByGuildName(@PathVariable("guildName") String guildName) {
        return guildService.findByGuildName(guildName).getGuildLeader();
    }

    @GetMapping(value = "/getGuildMembersByGuildName/{guildName}")
    List<User> getGuildMembersByGuildName(@PathVariable("guildName") String guildName) {
        return guildService.findByGuildName(guildName).getGuildUsers();
    }


}
