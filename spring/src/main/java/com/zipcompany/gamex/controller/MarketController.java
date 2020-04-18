package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.Service.MarketItemsService;
import com.zipcompany.gamex.Service.UserItemService;
import com.zipcompany.gamex.Service.UserService;
import com.zipcompany.gamex.domain.MarketItems;
import com.zipcompany.gamex.domain.User;
import com.zipcompany.gamex.domain.UserItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/market")
public class MarketController {

    @Autowired
    MarketItemsService marketItemsService;

    @Autowired
    UserItemService userItemService;

    @Autowired
    UserService userService;


    @GetMapping(value = "/getMarketItems")
    public List<MarketItems> getAllMarketItems() {
        return marketItemsService.getAllMarketItems();
    }

    @GetMapping(value = "/addItemForSale/{price}/{userItemID}")
    public void addItemForMarket(@PathVariable("price") int price, @PathVariable("userItemID") Long userItemID) {
        UserItem userItem = userItemService.getUserItemById(userItemID);
        MarketItems marketItem = new MarketItems(price, userItem.getUserBackpack().getUser().getUsername(), userItem);
        userItem.setBackpackSlot("RYNEK");
        userItemService.saveUserItem(userItem);
        marketItemsService.saveMarketItem(marketItem);
    }

    @GetMapping(value = "/buyMarketItem/{itemID}/{userName}")
    public void buyMarketItem(@PathVariable("itemID") Long itemID, @PathVariable("userName") String userName) {
        UserItem userItem = userItemService.getUserItemById(itemID);
        User user = userService.findByUsername(userName);
        System.out.println(user);
        userItem.setBackpackSlot("userItem6");
        userItem.setUserBackpack(user.getUserBackpack());
        userService.safeUser(user);
        userItemService.saveUserItem(userItem);
    }

    @GetMapping(value = "/removeItemFromMarket/{userItemID}")
    public void removeItemFromMarket(@PathVariable("userItemID") Long userItemID) {
        MarketItems marketItem = marketItemsService.findItemByUserItemID(userItemID);
        marketItemsService.removeMarketItem(marketItem);
    }

    @GetMapping(value = "/addItemToNewOwner/{userItemID}/{userName}/{slot}")
    public void addItemToNewOwner(@PathVariable("userItemID") Long userItemID, @PathVariable("userName") String newOnwer,
                                  @PathVariable("slot") String userItemSlot) {

        UserItem userItem = userItemService.getUserItemById(userItemID);
        User user = userService.findByUsername(newOnwer);
        userItem.setUserBackpack(user.getUserBackpack());
        userItem.setBackpackSlot(userItemSlot);
        userService.safeUser(user);
        userItemService.saveUserItem(userItem);
    }
}
