package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.Service.*;
import com.zipcompany.gamex.domain.ChatMessage;
import com.zipcompany.gamex.domain.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    ChatService chatService;

    @GetMapping(value = "/getAllChatMessages")
    List<ChatMessage> getAllChatMessages() {
        return chatService.getAllChatMessages();
    }

    @GetMapping(value = "/safeChatMessage/{userId}/{content}")
    ChatMessage safeNewChatMessege(@PathVariable("userId") long userId,@PathVariable("content") String cotent) {
        ChatMessage chatMessage=new ChatMessage();
        chatMessage.messageContent(cotent);
        chatMessage.setUser(userService.getUser(userId));
        return chatService.safeMessage(chatMessage);
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
