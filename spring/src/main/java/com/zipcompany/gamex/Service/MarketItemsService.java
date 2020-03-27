package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.MarketItems;

import java.util.List;

public interface MarketItemsService {

    List<MarketItems> getAllMarketItems();
    void saveMarketItem(MarketItems marketItem);
    MarketItems findItemByUserItemID(Long userItemID);
    void removeMarketItem(MarketItems marketItem);
}
