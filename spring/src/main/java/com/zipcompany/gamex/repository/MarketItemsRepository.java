package com.zipcompany.gamex.repository;

import com.zipcompany.gamex.domain.MarketItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface MarketItemsRepository extends JpaRepository<MarketItems, Long> {

    @Transactional
    @Query(value = "select * from market_items where userItem_id =:userItemID", nativeQuery = true)
    MarketItems findByUserItemID(@Param("userItemID") Long id);


}
