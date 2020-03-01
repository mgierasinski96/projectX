package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.UserItem;

import java.sql.Blob;


public interface UserItemService {
    public Blob getPhotoById(long id);


}
