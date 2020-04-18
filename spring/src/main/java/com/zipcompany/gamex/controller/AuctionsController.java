package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.Service.AuctionItemsService;
import com.zipcompany.gamex.domain.AuctionItems;
import com.zipcompany.gamex.repository.AuctionItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping(value = "/auction")
public class AuctionsController {


    @Autowired
    private AuctionItemsService auctionItemsService;


    @RequestMapping(value = "/auctionItems")
    public List<AuctionItems> getAuctionItems(){
        return auctionItemsService.findAll();
    }

    @RequestMapping(value = "/deleteItemFromAuction/{id}")
    public void deleteItemFromAuction(@PathVariable("id") Long itemID){
        AuctionItems auctionItem = auctionItemsService.findAuctionItemByItemID(itemID);
        auctionItemsService.delete(auctionItem);
    }

    @GetMapping(value = "/updateActualPrice/{price}/{itemID}/{userID}")
    public void updateAcutalPrice(@PathVariable String price, @PathVariable Long itemID, @PathVariable Long userID){
        AuctionItems auctionItem = auctionItemsService.findAuctionItemByItemID(itemID);
        int temp = Integer.parseInt(price);
        auctionItem.setActualPrice(temp);
        auctionItem.setWinningUserID(userID);
        auctionItemsService.save(auctionItem);
    }


//    @RequestMapping(value = "/addItemToAuction/{id}")
//    public void addItemToAuction(@PathVariable ("id") Long itemID){
//        Item item = itemService.getItemById(itemID);
//        UserItem userItem = new UserItem(
//                item.getItemPrice(),
//                item.getItemValue(),
//                item.getItemName(),
//                item.getItemType(),
//                item.getItemDamage(),
//                item.getItemDefense(),
//                item.getItemStrength(),
//                item.getItemWidsdom(),
//                item.getItemPicture(),
//                null,
//                null
//        );
//       userItemRepository.save(userItem);
//
//       AuctionItemsService auctionItems = new AuctionItemsService(userItem, userItem.getItemPrice() + 50);
//       auctionItemsRepository.save(auctionItems);
//    }





//    @GetMapping(value = "/getRandomItemsToAuctionHouse")
//    public List<AuctionItemsService> getRandomItemsToAuctionHouse(){
//        List<Item> items = itemService.getRandomItemsToAuctionHouse();
//
//
//        for(int i = 0; i< items.size(); i++){
//            UserItem userItem = new UserItem(
//                    items.get(i).getItemPrice(),
//                    items.get(i).getItemValue(),
//                    items.get(i).getItemName(),
//                    items.get(i).getItemType(),
//                    items.get(i).getItemDamage(),
//                    items.get(i).getItemDefense(),
//                    items.get(i).getItemStrength(),
//                    items.get(i).getItemWidsdom(),
//                    items.get(i).getItemPicture(),
//                    null,
//                    null
//            );
//
//            double randomDouble = Math.random();
//            randomDouble = randomDouble * 150 + 1;
//            userItemRepository.save(userItem);
//            AuctionItemsService auctionItems = new AuctionItemsService(userItem, userItem.getItemPrice() + (int) randomDouble);
//            auctionItemsRepository.save(auctionItems);
//        }
//
//        return auctionItemsRepository.findAll();
//    }

    //    @GetMapping(value = "/updateAuction")
//    public void updateAuction(){
//        List<AuctionItemsService> auctionItems = auctionItemsRepository.findAll();
//        int index = 0;
//        for(int i = 0; i < auctionItems.size(); i++){
//            if(auctionItems.get(i).getWinningUserID() != null){
//                index++;
//                System.out.println("Sprzedano: " + auctionItems.get(i).getUserItem().getItemName()
//                + " użytkownikowi " + auctionItems.get(i).getWinningUserID());
//
//                UserItem userItem = userItemRepository.findUserItemById(auctionItems.get(i).getUserItem().getId());
//                UserBackpack userBackpack = userService.getUser(auctionItems.get(i).getWinningUserID()).getUserBackpack();
//                userItem.setUserBackpack(userBackpack);
//                userBackpackRepository.save(userBackpack);
//                auctionItemsRepository.delete(auctionItems.get(i));
//            }else {
//                auctionItemsRepository.delete(auctionItems.get(i));
//                userItemRepository.deleteuserItemById(auctionItems.get(i).getUserItem().getId());
//                //userItemRepository.deleteuserItemById(auctionItems.get(i).);
//            }
//        }
//        System.out.println("Wylicytowane zostaly " + (index) + " przedmioty.");
//    }
//


}
