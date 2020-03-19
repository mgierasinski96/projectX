package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.Item;

import java.sql.Blob;
import java.util.List;

public interface ItemService {

    Item addItem(Item item);
    List<Item> getAllItems();
    Item getItemById(Long id);
    public Blob getPhotoById(long id);
    public List<Item> getRandomItemsToAuctionHouse();
    void itemBoughtGenerateNewItem(long userId,long itemId);

}
