package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.UserItem;
import com.zipcompany.gamex.repository.UserItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import javax.transaction.Transactional;
import java.sql.Blob;

@Service
public class UserItemServiceImpl implements UserItemService {

    @Autowired
    UserItemRepository userItemRepository;


    private JdbcTemplate jdbcTemp;

    public UserItemServiceImpl(DataSource dataSource) {
        jdbcTemp = new JdbcTemplate(dataSource);
    }

    @Transactional
    public Blob getPhotoById(long id) {
        String query = "select i.item_picture from user_items i where i.user_item_id=?";
        Blob photo = jdbcTemp.queryForObject(query, new Object[] { id }, Blob.class);
        return photo;
    }

    @Override
    public void transferItemToDifferentSlot(long itemId, String actualSlot) {
        userItemRepository.transferItemToDifferentSlot(itemId,actualSlot);
    }

    @Override
    public void deleteUserItemById(Long id) {
        System.out.println("kasacja " +id);
        userItemRepository.deleteuserItemById(id);
    }
}
