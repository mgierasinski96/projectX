package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.Service.*;
import com.zipcompany.gamex.domain.Item;
import com.zipcompany.gamex.domain.Monster;
import com.zipcompany.gamex.domain.MonsterItem;
import com.zipcompany.gamex.domain.User;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.sql.Blob;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/user")
public class ExampleController {

    @Autowired
    UserService userService;

    @Autowired
    ItemService itemService;

    @Autowired
    MonsterService monsterService;

    @Autowired
    MonsterItemService monsterItemService;

//   @Autowired
//    SchedulerService schedulerService;

    @GetMapping(value="/getRandomItemsToShop/{pcs}")
    public List<Item> getRandomItemsToShop(@PathVariable long pcs)
    {
//      return schedulerService.randomItemsToShop();
        return itemService.getRandomItemsToShop(pcs);
    }

    @PostMapping("")
    User safeUser(@RequestBody User user)
    {
        return userService.safeUser(user);
    }

    @GetMapping("")
    List<User> getUsers()
    {
        return userService.getAllUsers();
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


      //System.out.println(item.getMonsterItems().get(0).getMonster());
//      for(int i = 0; i < item.getMonsterItems().size(); i ++){
//          System.out.println(item.getMonsterItems().get(i).getMonster().getMonsterName());
//      }


//      //return item.getMonsters();
      //return monsterItemService.findByItemId(itemId);
      //return null;

}
