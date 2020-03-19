package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.AuctionItems;
import com.zipcompany.gamex.domain.UserBackpack;
import com.zipcompany.gamex.domain.UserItem;
import com.zipcompany.gamex.repository.AuctionItemsRepository;
import com.zipcompany.gamex.repository.UserBackpackRepository;
import com.zipcompany.gamex.repository.UserItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionItemsServiceImpl implements AuctionItemsService {

    @Autowired
    private AuctionItemsRepository auctionItemsRepository;

    @Autowired
    private UserItemRepository userItemRepository;

    @Autowired
    private UserBackpackRepository userBackpackRepository;

    @Autowired
    private UserServiceImpl userService;

    @Override
    public List<AuctionItems> findAll() {
        return auctionItemsRepository.findAll();
    }

    @Override
    public void delete(AuctionItems auctionItem) {
        auctionItemsRepository.delete(auctionItem);
    }

    @Override
    public void save(AuctionItems auctionItem) {
        auctionItemsRepository.save(auctionItem);
    }

    @Override
    public AuctionItems findAuctionItemByItemID(Long itemID) {
        return auctionItemsRepository.getOne(itemID);
    }

    @Override
    public void updateAuction() {
        List<AuctionItems> auctionItems = auctionItemsRepository.findAll();
        for (int i = 0; i < auctionItems.size(); i++) {
            if (auctionItems.get(i).getWinningUserID() != null) {
                UserBackpack userBackpack = userService.getUser(auctionItems.get(i).getWinningUserID()).getUserBackpack();



                System.out.println(auctionItems.get(i).getItem().getItemPrice())    ;


                // TODO: Zmienic przypisanie na sztywno
                UserItem userItem = new UserItem(
                        auctionItems.get(i).getItem().getItemLevel(),
                        auctionItems.get(i).getActualPrice(),
                        auctionItems.get(i).getItem().getItemValue(),
                        auctionItems.get(i).getItem().getItemName(),
                        auctionItems.get(i).getItem().getItemType(),
                        auctionItems.get(i).getItem().getItemDamage(),
                        auctionItems.get(i).getItem().getItemDefense(),
                        auctionItems.get(i).getItem().getItemStrength(),
                        auctionItems.get(i).getItem().getItemWidsdom(),
                        auctionItems.get(i).getItem().getItemPicture(),
                        "userItem10",
                        userBackpack
                );
                userItemRepository.save(userItem);
                userBackpackRepository.save(userBackpack);
                auctionItemsRepository.delete(auctionItems.get(i));
            } else {
                //jesli niktn ie wylicytowal
                auctionItemsRepository.delete(auctionItems.get(i));
            }
        }

    }
}
