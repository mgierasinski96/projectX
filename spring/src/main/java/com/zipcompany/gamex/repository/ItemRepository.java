package com.zipcompany.gamex.repository;

import com.zipcompany.gamex.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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
    @Query(value = "SELECT * FROM item where item_level between :userLvl-:varietyLvl and :userLvl+:varietyLvl ORDER BY RAND() LIMIT :pcs ",nativeQuery = true)
    List<Item> getRandomItemsToShop(@Param("pcs") long pcs,@Param("userLvl") long userLvl,@Param("varietyLvl") long varietyLvl);

    @Transactional
    @Modifying
    @Query(value = "delete from user_shop_items where user_id>0 and item_id>0", nativeQuery = true)
    void deleteAllShopItemsForEachUser();

    @Transactional
    @Modifying
    @Query(value = "insert into user_shop_items(user_id,item_id) values (:userId,:itemId)", nativeQuery = true)
    void insertNewShopItem(@Param("userId") long userId, @Param("itemId") long itemId);

    @Transactional
    @Modifying
    @Query(value = "update user_shop_items u set u.item_id=:newItemId where u.item_id=:boughtItemId and u.user_id=:userId", nativeQuery = true)
    void generateNewItem(@Param("userId") long userId, @Param("boughtItemId") long boughtItemId,@Param("newItemId") long newItemId);

    @Query(value=" SELECT * FROM item WHERE item.id NOT IN (SELECT item_id FROM user_shop_items where user_id=:userId) and item_level between :userLvl-:varietyLvl and :userLvl+:varietyLvl  ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Item getOneRandomItemThatIsNotInUserShop(@Param("userId") long userId,@Param("userLvl") long userLvl,@Param("varietyLvl") long varietyLvl);

    @Transactional
    @Query(value = "SELECT * from item ORDER BY RAND() LIMIT 4 ", nativeQuery = true)
    List<Item> getRandomItemsToAuctionHouse();

}
