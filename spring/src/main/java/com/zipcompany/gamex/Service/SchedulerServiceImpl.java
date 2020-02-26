//package com.zipcompany.gamex.Service;
//
//import com.zipcompany.gamex.domain.Item;
//import com.zipcompany.gamex.repository.ItemRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class SchedulerServiceImpl implements SchedulerService {
//
//    @Autowired
//    ItemRepository itemRepository;
//
//    @Scheduled(cron="0 0/1 * * * ?")//minute
//    public List<Item> randomItemsToShop()//scheduler has to be no arg method
//    {
//        System.out.println("scheduled task");
//        return itemRepository.getRandomItemsToShop(5);//scheduler will call this method
//        // every minute returning different items (due to the fact each query call
//        // returns different items)
//
//
//    }
//}
