package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.controller.WebSocketController;
import com.zipcompany.gamex.domain.AuctionItems;
import com.zipcompany.gamex.domain.Guild;
import com.zipcompany.gamex.domain.Item;
import com.zipcompany.gamex.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.util.Date;
import com.zipcompany.gamex.domain.User;
import java.util.List;

@Service
public class SchedulerServiceImpl implements SchedulerService {


    @Autowired
    private WebSocketController webSocketController;

    @Autowired
    private AuctionItemsService auctionItemsService;

    @Autowired
    private ItemService itemService;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    UserService userService;

    @Autowired
    GuildService guildService;

    @Override
    @Scheduled(cron = "0 0/1 * * * ?")
    public void randomItemsToAuction() {
        auctionItemsService.updateAuction();
        List<Item> items = itemService.getRandomItemsToAuctionHouse();

        for (int i = 0; i < items.size(); i++) {
            AuctionItems auctionItem = new AuctionItems(items.get(i), items.get(i).getItemPrice());
            auctionItemsService.save(auctionItem);
            //System.out.println("Wewnatrz randomItemsToAuction, cena: " + items.get(i).getItemPrice());
        }
        Date date = new Date();
        System.out.println(date);
        webSocketController.sendMessage();
    }


    @Scheduled(cron = "0 0/2 * * * ?")//2 minutes ( CRON format )
    public void randomItemsToShop()//scheduler has to be no arg method
    {
        itemRepository.deleteAllShopItemsForEachUser();
        List<User> allUsers = userService.getAllUsers();
        for (User user : allUsers) {
                //L
            List<Item> items = itemRepository.getRandomItemsToShop(6,user.getLevel(),5); //2 SHOP ITEMS FOR EACH USER
            user.setShopItems(items);
            for (Item item : items) {

                itemRepository.insertNewShopItem(user.getId(),item.getId());
            }
        }

        System.out.println("inserting new shop items for each user");
    }

    @Scheduled(cron = "0 0-5 13 * * ?")//Every minute starting at 1 pm and ending on 1:05 pm, every day:
    public void orcGuildBuilding() {
        List<Guild> guilds = guildService.getAllGuilds();
        for (Guild guild : guilds) {
            if (guild.getOrcLevel() > 0) {
                guild.setGuildGold(guild.getGuildGold() + 100 * guild.getOrcLevel());
                guildService.safeGuild(guild);
            }
        }

    }


}
