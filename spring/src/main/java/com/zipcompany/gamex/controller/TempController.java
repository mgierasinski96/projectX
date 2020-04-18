package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.DTO.PrivateMessageDTO;
import com.zipcompany.gamex.Service.*;
import com.zipcompany.gamex.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@CrossOrigin
@RestController
public class TempController {

    @Autowired
    UserService userService;

    @Autowired
    ItemService itemService;

    @Autowired
    MonsterService monsterService;

    @Autowired
    MonsterItemService monsterItemService;

    @Autowired
    MessageService messageService;

    @Autowired
    LocationService locationService;

    @GetMapping(value = "/fight/{locationID}/{userName}")
    public Object giveMeFight(@PathVariable ("locationID") Long locationID, @PathVariable ("userName") String userName){
        User user = userService.findByUsername(userName);
        Location location = locationService.findLocationById(locationID);
        List<Object> data = new ArrayList<>();
        List<Monster> template = location.getMonsters();
        Random rand = new Random();
        int index = rand.nextInt(3);
        data.add(template.get(index));
        data.add(user);
        data.add(template.get(index).getMonsterItems());
        return data;
    }

    @GetMapping(value = "/endAdventure/{userName}")
    public boolean endAdventure(@PathVariable ("userName") String userName){
        User user = userService.findByUsername(userName);
        user.setOnAdventure(false);
        userService.safeUser(user);
        System.out.println("koniec wypawy");
        return user.isOnAdventure();
    }

    @GetMapping(value = "/startAdventure/{userName}")
    public User newAdventure(@PathVariable ("userName") String userName){
        User user = userService.findByUsername(userName);
        user.setLastAdventure(new Date());
        user.setOnAdventure(true);
        userService.safeUser(user);
        return user;
    }
    @GetMapping(value = "/ifOnAdventure/{userName}")
    public boolean ifOnAdventure(@PathVariable ("userName") String userName){
        User user = userService.findByUsername(userName);
        return  user.isOnAdventure();
    }
    @GetMapping(value = "/lastAdventure/{userName}")
    public Date lastAdventure(@PathVariable ("userName") String userName){
        User user = userService.findByUsername(userName);
        return  user.getLastAdventure();
    }


    @GetMapping(value = "/getAllChatMessages")
    List<Message> getAllChatMessages() {
        return messageService.getAllPublicMessages();
    }

    @PostMapping(value = "/writePrivateMessage")
    Message writePrivateMessage(@RequestBody PrivateMessageDTO privateMessageDTO) {
        Message message = new Message();
        message.setMessageContent(privateMessageDTO.getContent());
        message.setReceiver(userService.findByUsername(privateMessageDTO.getReceiver()));
        message.setSender(userService.findByUsername(privateMessageDTO.getSender()));

       return messageService.safeMessage(message);
    }

    @GetMapping(value = "/safeChatMessage/{userId}/{content}")
    Message safeNewChatMessege(@PathVariable("userId") long userId, @PathVariable("content") String cotent) {
        Message message =new Message();
        message.messageContent(cotent);
        message.setSender(userService.getUser(userId));
        return messageService.safeMessage(message);
    }
    @GetMapping(value = "/getPrivateMessages/{username}")
    List<Message> getPrivateMessages(@PathVariable("username") String username) {
        return messageService.getAllPrivateMessages(userService.findByUsername(username));
    }

    @PostMapping(value = "/safePrivateMessage")
    Message getPrivateMessage(@RequestBody Message message) {
        return messageService.safeMessage(message);
    }





    //    @PostMapping("/monsters/{monsterId}/{itemId}")
//    void addMonsterToItem(@PathVariable(value = "monsterId") Long monsterId, @PathVariable(value = "itemId") Long itemId){
//
//        Item item = itemService.getItemById(itemId);
//
//        Monster monster = monsterService.findMonsterById(monsterId);
//
//        item.addMonster(monster);
//
//        monster.addItem(item);
//        itemService.addItem(item);
//
//        monster.getItems().add(item);
//    }
//


    @PostMapping("/monster/{monsterId}/{dropRate}/{itemId}")
    void addItemToMonster(@PathVariable(value = "monsterId") Long monsterId,
                          @PathVariable(value = "itemId") Long itemId,
                          @PathVariable(value = "dropRate") String drop){

        Item item = itemService.getItemById(itemId);

        //System.out.println(item.getMonsterItems().size());

        // Monster monster = new Monster("Demon");
//        Monster monster = monsterService.findMonsterById(monsterId);
//
//        MonsterItem monsterItem = new MonsterItem();
//        monsterItem.setItem(item);
//        monsterItem.setMonster(monster);
//        monsterItem.setDropRate(drop);
//
//       // int index = monsterId.intValue();
//
//      // System.out.println(item.getMonsterItems().get(1).getDropRate());
//        monsterItemService.addMonsterItemConnection(monsterItem);

        // monsterService.saveMonster(monster);



    }
}
