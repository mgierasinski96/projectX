package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.Service.ItemService;
import com.zipcompany.gamex.Service.MonsterItemService;
import com.zipcompany.gamex.Service.MonsterService;
import com.zipcompany.gamex.Service.UserService;
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

    @GetMapping("/hello")
    public String helloFromExampleController() {

        return "hello from example controller";
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

    @PostMapping("/addmonster")
    Monster saveMonster(@RequestBody Monster monster){
        return monsterService.saveMonster(monster);
    }

    @GetMapping("/getmonsters")
    List<Monster> getMonsters(){
        return monsterService.getAllMonsters();
    }


    @PostMapping("/additem")
    Item saveItem(@RequestBody Item item){
        return itemService.addItem(item);
    }

    @GetMapping("/getitems")
    List<Item> getItems(){
        return itemService.getAllItems();
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
  @GetMapping("/drop/{id}")
    List<MonsterItem> whatDropsThisItem(@PathVariable(value = "id") Long itemId) {
      Item item = itemService.getItemById(itemId);




      return item.getMonsterItems();



      //System.out.println(item.getMonsterItems().get(0).getMonster());
//      for(int i = 0; i < item.getMonsterItems().size(); i ++){
//          System.out.println(item.getMonsterItems().get(i).getMonster().getMonsterName());
//      }


//      //return item.getMonsters();
      //return monsterItemService.findByItemId(itemId);
      //return null;
  }


    @RequestMapping(value = "getItemImage/{id}")
    public void getItemPhoto(HttpServletResponse response, @PathVariable("id") long id) throws Exception {
        response.setContentType("image/jpeg");
        Blob ph = itemService.getPhotoById(id);
        byte[] bytes = ph.getBytes(1, (int) ph.length());
        InputStream inputStream = new ByteArrayInputStream(bytes);
        IOUtils.copy(inputStream, response.getOutputStream());

        System.out.println(itemService.getItemById(id).getItemName());
    }


    @PostMapping("/monster/{monsterId}/{dropRate}/{itemId}")
    void przypiszPrzedmiotDoPotwora(@PathVariable(value = "monsterId") Long monsterId,
                                   @PathVariable(value = "itemId") Long itemId,
                                    @PathVariable(value = "dropRate") String drop){

       Item item = itemService.getItemById(itemId);

       //System.out.println(item.getMonsterItems().size());


      System.out.println(item.getMonsterItems().get(0).getMonster().getMonsterName());
          System.out.println(item.getMonsterItems().get(0).getDropRate());
        System.out.println(item.getMonsterItems().get(1).getMonster().getMonsterName());
      System.out.println(item.getMonsterItems().get(1).getDropRate());


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
