package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.UserItem;

import java.sql.Blob;


public interface UserItemService {
    public Blob getPhotoById(long id);
    public void transferItemToDifferentSlot(long itemId,String actualSlot);
    public UserItem getUserItemById(long id);
    void upgradeItem(long itemId,int upgradeBoost);


}
