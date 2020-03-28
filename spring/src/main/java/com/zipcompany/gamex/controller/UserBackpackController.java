package com.zipcompany.gamex.controller;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zipcompany.gamex.Service.ItemService;
import com.zipcompany.gamex.Service.UserItemService;
import com.zipcompany.gamex.Service.UserService;
import com.zipcompany.gamex.domain.Item;
import com.zipcompany.gamex.domain.UserBackpack;
import com.zipcompany.gamex.domain.UserItem;
import com.zipcompany.gamex.repository.UserBackpackRepository;
import com.zipcompany.gamex.repository.UserItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping(value="/userbackpack")
public class UserBackpackController {

    UserItemService userItemService;
    ItemService itemService;
    UserService userService;

    private final int UPGRADE_BOOST=1; // #TODO kazdy stat przedmiotu po ulepszeniu zwiekszany o 1

    @Autowired
    UserBackpackRepository userBackpackRepository;

    @Autowired
    UserItemRepository userItemRepository;

    @Autowired
    public UserBackpackController(UserItemService userItemService,ItemService itemService,UserService userService)
    {
        this.userItemService=userItemService;
        this.itemService=itemService;
        this.userService=userService;
    }


    @GetMapping(value = "/transferItemToDifferentSlot/{itemId}/{newSlotName}")
    void transferItemToDifferentSlot(@PathVariable("itemId") long itemId, @PathVariable("newSlotName") String newSlotName) {
        userItemService.transferItemToDifferentSlot(itemId, newSlotName);
    }

    @GetMapping(value = "/itemBought/{userId}/{itemId}")
    public Item itemBoughtGenerateNewItem(@PathVariable long userId,@PathVariable long itemId) {
        Item item = itemService.itemBoughtGenerateNewItem(userId,itemId);
        return item;
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

    @GetMapping(value = "/additemtouser/{id}/{itemId}/{newSlot}")
    public UserItem addItemToUserBackpack(@PathVariable("id") Long userID,
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
      // userBackpackRepository.save(userBackpack);
       userItemRepository.save(userItem);
       return userItem;
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
    @GetMapping(value= "upgradeItem/{itemId}")
    public void upgradeItem(@PathVariable("itemId") long itemId)
    {
        userItemService.upgradeItem(itemId,this.UPGRADE_BOOST);
    }

    @GetMapping(value = "/getItem/{itemId}")
    UserItem getUserItem(@PathVariable ("itemId") Long itemId){
        return userItemService.getUserItemById(itemId);
    }

}
