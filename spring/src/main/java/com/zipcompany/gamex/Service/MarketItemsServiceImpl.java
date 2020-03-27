package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.MarketItems;
import com.zipcompany.gamex.repository.MarketItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarketItemsServiceImpl implements MarketItemsService {

    private MarketItemsRepository marketItemsRepository;

    @Autowired
    public MarketItemsServiceImpl(MarketItemsRepository marketItemsRepository) {
        this.marketItemsRepository = marketItemsRepository;
    }

    @Override
    public List<MarketItems> getAllMarketItems() {
        return marketItemsRepository.findAll();
    }

    @Override
    public void saveMarketItem(MarketItems marketItem) {
        marketItemsRepository.save(marketItem);
    }

    @Override
    public MarketItems findItemByUserItemID(Long userItemID) {
        return marketItemsRepository.findByUserItemID(userItemID);
    }

    @Override
    public void removeMarketItem(MarketItems marketItem) {
        marketItemsRepository.delete(marketItem);
    }
}
