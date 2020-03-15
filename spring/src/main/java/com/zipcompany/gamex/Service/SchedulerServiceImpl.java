package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.Item;
import com.zipcompany.gamex.domain.User;
import com.zipcompany.gamex.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SchedulerServiceImpl implements SchedulerService {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    UserService userService;


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
}
