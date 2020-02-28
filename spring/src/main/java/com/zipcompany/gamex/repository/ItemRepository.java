package com.zipcompany.gamex.repository;

import com.zipcompany.gamex.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface ItemRepository extends JpaRepository<Item, Long> {

    Item findItemById(Long id);

    @Transactional
    @Query(value = "SELECT * FROM item ORDER BY RAND() LIMIT :pcs ",nativeQuery = true)
    List<Item> getRandomItemsToShop(@Param("pcs") long pcs);

}
