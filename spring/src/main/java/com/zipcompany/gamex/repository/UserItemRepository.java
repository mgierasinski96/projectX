package com.zipcompany.gamex.repository;

import com.zipcompany.gamex.domain.Item;
import com.zipcompany.gamex.domain.User;
import com.zipcompany.gamex.domain.UserItem;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.sql.Blob;
import java.util.List;

@Transactional
@Repository
public interface UserItemRepository extends JpaRepository<UserItem, Long> {

    UserItem findUserItemById(Long id);





//    @Transactional
//    @Query(value = "SELECT * FROM item ORDER BY RAND() LIMIT :pcs ",nativeQuery = true)
//    List<Item> getRandomItemsToShop(@Param("pcs") long pcs);



}
