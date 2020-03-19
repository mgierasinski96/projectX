package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.controller.WebSocketController;
import com.zipcompany.gamex.domain.AuctionItems;
import com.zipcompany.gamex.domain.Item;
import com.zipcompany.gamex.domain.UserBackpack;
import com.zipcompany.gamex.domain.UserItem;
import com.zipcompany.gamex.repository.AuctionItemsRepository;
import com.zipcompany.gamex.repository.ItemRepository;
import com.zipcompany.gamex.repository.UserBackpackRepository;
import com.zipcompany.gamex.repository.UserItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class SchedulerServiceImpl implements SchedulerService {


    @Autowired
    private WebSocketController webSocketController;

    @Autowired
    private AuctionItemsService auctionItemsService;

    @Autowired
    private ItemService itemService;

    @Override
    @Scheduled(cron = "0 0/1 * * * ?")
    public void randomItemsToAuction() {
        auctionItemsService.updateAuction();
        List<Item> items = itemService.getRandomItemsToAuctionHouse();

        for (int i = 0; i < items.size(); i++) {
            AuctionItems auctionItem = new AuctionItems(items.get(i), items.get(i).getItemPrice());
            auctionItemsService.save(auctionItem);
            System.out.println("Wewnatrz randomItemsToAuction, cena: " + items.get(i).getItemPrice());
        }
        Date date = new Date();
        System.out.println(date);
        webSocketController.sendMessage();
    }


}
