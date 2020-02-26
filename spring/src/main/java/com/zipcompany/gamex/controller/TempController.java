package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.Service.ItemService;
import com.zipcompany.gamex.Service.MonsterItemService;
import com.zipcompany.gamex.Service.MonsterService;
import com.zipcompany.gamex.Service.UserService;
import com.zipcompany.gamex.domain.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

public class TempController {

    @Autowired
    UserService userService;

    @Autowired
    ItemService itemService;

    @Autowired
    MonsterService monsterService;

    @Autowired
    MonsterItemService monsterItemService;

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
