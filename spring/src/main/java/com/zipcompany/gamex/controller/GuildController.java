package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.Service.*;
import com.zipcompany.gamex.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/guild")
public class GuildController {

    private GuildService guildService;
    private UserService userService;
    private MessageService messageService;
    private UserItemService userItemService;
    private GuildItemService guildItemService;

    @Autowired
    public GuildController(GuildService guildService, UserService userService,MessageService messageService, UserItemService userItemService, GuildItemService guildItemService) {
        this.guildService = guildService;
        this.userService = userService;
        this.messageService = messageService;
        this.userItemService = userItemService;
        this.guildItemService = guildItemService;
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
        guild.setMainBuildingLevel(1);
        guild.setStoreLevel(1);
        user.setGuild(guild);
        return guildService.safeGuild(guild);
    }

    @GetMapping(value ="/addUserItemToGuildStore/{userItemId}/{guildSlot}")
    public void addUserItemToGuildStore(@PathVariable("userItemId") long userItemId, @PathVariable("guildSlot") String guildSlot)
    {
        UserItem userItem=userItemService.getUserItemById(userItemId);
        userItemService.transferItemToDifferentSlot(userItemId , guildSlot);

        GuildItem guildItem=new GuildItem();
        guildItem.setGuildSlot(guildSlot);
        guildItem.setOwnerUsername(userItem.getUserBackpack().getUser().getUsername());
        guildItem.setUserItem(userItem);
        guildItemService.safeGuildItem(guildItem);

        Guild guild= userItem.getUserBackpack().getUser().getGuild();
        guild.getGuildItems().add(guildItem);
        guildService.safeGuild(guild);
    }
    @GetMapping(value ="/upgradeGuildBuiling/{appUserName}/{guildName}/{buildingName}/{cost}")
    public User upgradeGuildBuiling(@PathVariable("appUserName") String username,@PathVariable("guildName") String guildName, @PathVariable("buildingName") String buildingName,@PathVariable("cost") int cost)
    {
        guildService.upgradeGuildBulding(guildName,buildingName,cost);
        return userService.findByUsername(username);
    }

    @GetMapping(value ="/removeUserItemFromGuildStoreAndAddToUser/{userItemId}/{username}/{backpackSlot}")
    public void removeUserItemFromGuildStoreAndAddToUser(@PathVariable("userItemId") long userItemId, @PathVariable("username") String username, @PathVariable("backpackSlot") String backpackSlot)
    {
        User user= userService.findByUsername(username);
        UserItem userItem= userItemService.getUserItemById(userItemId);
        userItem.setUserBackpack(user.getUserBackpack());
        userItem.setBackpackSlot(backpackSlot);
        guildItemService.deleteGuildItem(guildItemService.findByUserItem(userItem));
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

    @GetMapping(value = "/donateGuildGold/{amount}/{username}")
    public void donateGuildGold(@PathVariable("username") String username, @PathVariable("amount") int amount) {
        Guild guild=  userService.findByUsername(username).getGuild();
        guild.setGuildGold(guild.getGuildGold() + amount);
       guildService.safeGuild(guild);
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
