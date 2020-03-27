package com.zipcompany.gamex.repository;

import com.zipcompany.gamex.domain.Item;
import com.zipcompany.gamex.domain.User;
import com.zipcompany.gamex.domain.UserItem;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.sql.Blob;
import java.util.List;

@Transactional
@Repository
public interface UserItemRepository extends JpaRepository<UserItem, Long> {

    UserItem findUserItemById(Long id);


    @Modifying
    @Query(value = "update user_items u set u.backpack_slot=:newSlot where u.user_item_id=:itemId", nativeQuery = true)
    void transferItemToDifferentSlot(@Param("itemId") long itemId, @Param("newSlot") String newSlot);

    @Modifying
    @Query(value = "delete from user_items where user_items.user_item_id =:itemID", nativeQuery = true)
    void deleteuserItemById(@Param ("itemID") Long itemID);

}
