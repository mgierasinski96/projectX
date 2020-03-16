package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.Service.*;
import com.zipcompany.gamex.domain.*;
import com.zipcompany.gamex.repository.UserBackpackRepository;
import com.zipcompany.gamex.repository.UserItemRepository;
import com.zipcompany.gamex.repository.UserRepository;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.sql.Blob;
import java.util.Collections;
import java.util.Comparator;
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

    @Autowired
    UserBackpackRepository userBackpackRepository;

    @Autowired
    UserItemRepository userItemRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserItemService userItemService;

    @GetMapping(value = "/userRankingLvlDesc")
    List<User> getUserRankingList()
    {
        return userService.getAllUsersByLvlDesc();
    }


    @GetMapping(value = "/transferItemToDifferentSlot/{itemId}/{newSlotName}")
    void transferItemToDifferentSlot(@PathVariable("itemId") long itemId, @PathVariable("newSlotName") String newSlotName) {
        userItemService.transferItemToDifferentSlot(itemId, newSlotName);
    }

    @PostMapping(value = "/additemtouser/{id}/{itemId}/{newSlot}")
    public void addItemToUserBackpack(@PathVariable("id") Long userID,
                                      @PathVariable("itemId") Long itemID, @PathVariable("newSlot") String newSlot) {

        Item item = itemService.getItemById(itemID);
        UserBackpack userBackpack = userService.getUser(userID).getUserBackpack();

        UserItem userItem = new UserItem(
                item.getItemLevel(),
                item.getItemPrice(),
                item.getItemValue(),
                item.getItemName(),
                item.getItemType(),
                item.getItemDamage(),
                item.getItemDefense(),
                item.getItemStrength(),
                item.getItemWidsdom(),
                item.getItemPicture(),
                newSlot,
                userBackpack
                );
             userBackpack.addItem(userItem);
            userBackpackRepository.save(userBackpack);

    }

    @GetMapping(value = "/removeitemfromuser/{id}/{previousSlot}")
    public void removeItemFromuserBackpack(@PathVariable("id") Long userID,
                                           @PathVariable("previousSlot") String previousSlot){
        userBackpackRepository.deleteItemForUser(userID,previousSlot);

//        User user = userService.getUser(userID);
//        System.out.println("Liczba przedmiotow w plecaku uzytkownika: " +user.getUserBackpack().getUserItemList().size());
//        System.out.println("Usuwam przedmiot: " + userItemRepository.findUserItemById(itemID).getItemName());
//        user.getUserBackpack().removeItem(userItemRepository.findUserItemById(itemID));
//        //userBackpackRepository.save(user.getUserBackpack());
//        userItemRepository.delete(userItemRepository.findUserItemById(itemID));
//        System.out.println("Liczba przedmiotow w plecaku uzytkownika: " +user.getUserBackpack().getUserItemList().size());

//        User usr = userService.getUser(userID);
//
//
//        usr.getUserBackpack().removeItemFrombackpack(itemID);
//        userBackpackRepository.save(usr.getUserBackpack());
//        System.out.println("Usuwam przedmiot");
//        System.out.println("Liczba przedmiotow w plecaku uzytkownika: " +usr.getUserBackpack().getUserItemList().size());

    }


    @GetMapping(value = "/test/{id}")
    public void testFunction(@PathVariable("id") Long userID){

//        User user = userService.getUser(userID);
//        System.out.println("Uzytkownik o nazwie " + user.getUsername() +
//                " ma plecak w kolorze " + user.getUserBackpack().getKolor() +
//                " w ktorym znajduje sie " + user.getUserBackpack().getUserItemList().size() +
//                " przedmiotow.");
//
//        UserBackpack userBackpack = userBackpackRepository.findUserBackpackById(userID);
//        System.out.println("Plecak o kolorze" +userBackpack.getKolor() +
//                " przypiany jest do uzytkownika o ID " + userBackpack.getUser().getId() +
//                " i przechowuje aktualnie " + userBackpack.getUserItemList().size() +
//                " przedmiotow"
//                );

        //Zwracanie uzykownika na pdostawie podanego ID itemu.
        User user = userRepository.findUserByUserItemID(userID);
        System.out.println("" +
                "");
       // User user = userItemRepository.findUserByUserItemID(userID);
        //System.out.println(userItemRepository.findUserByUserItemID(userID));
        System.out.println(user.getUsername());
        //User user = userItemRepository.findUserByUserItemID(userID);
        //System.out.println(user.getUsername());
        System.out.print("DZIALAM?");



    }



    @RequestMapping(value = "getuserItemImage/{id}")
    public void getItemPhoto(HttpServletResponse response, @PathVariable("id") long id) throws Exception {
        response.setContentType("image/jpeg");
        Blob ph = userItemService.getPhotoById(id);
        byte[] bytes = ph.getBytes(1, (int) ph.length());
        InputStream inputStream = new ByteArrayInputStream(bytes);
        IOUtils.copy(inputStream, response.getOutputStream());

        // System.out.println(itemService.getItemById(id).getItemName());
    }
    @GetMapping(value = "/getUserItemsByUsername/{username}")
    List<UserItem> getUserItemsByUsername(@PathVariable("username") String username) {
        try {
            return userService.findByUsername(username).getUserBackpack().getUserItemList();
        } catch (NullPointerException e) {
            System.out.println("\n\n\n\nTEN UŻYTKOWNIK NIE MA PRZYPISANEGO PLECAKA");
        }
        return Collections.emptyList();
    }

    @GetMapping(value = "/itemyusera/{id}")
    public List<UserItem> getUserItems(@PathVariable("id") Long id){
        User user = userService.getUser(id);

        return user.getUserBackpack().getUserItemList();
    }

    @GetMapping(value = "/getRandomItemsToShop/{userId}")
    public List<Item> getRandomItemsToShop(@PathVariable long userId) {
//
        return userService.getUser(userId).getShopItems();
    }
    @GetMapping(value = "/itemBought/{userId}/{itemId}")
    public void itemBoughtGenerateNewItem(@PathVariable long userId,@PathVariable long itemId) {
        itemService.itemBoughtGenerateNewItem(userId,itemId);
    }


    @PostMapping("")
    User safeUser(@RequestBody User user) {
        return userService.safeUser(user);
    }

    @GetMapping("")
    List<User> getUsers() {
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
