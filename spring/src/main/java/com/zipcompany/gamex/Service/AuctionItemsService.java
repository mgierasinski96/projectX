package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.AuctionItems;

import java.util.List;

public interface AuctionItemsService {

    void updateAuction();
    List<AuctionItems> findAll();
    void save (AuctionItems auctionItem);
    void delete(AuctionItems auctionItem);
    AuctionItems findAuctionItemByItemID(Long itemID);
}
