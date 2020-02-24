package com.zipcompany.gamex.repository;

import com.zipcompany.gamex.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ItemRepository extends JpaRepository<Item, Long> {

    Item findItemById(Long id);
}
