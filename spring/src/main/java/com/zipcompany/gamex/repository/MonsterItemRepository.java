package com.zipcompany.gamex.repository;

import com.zipcompany.gamex.domain.MarketItems;
import com.zipcompany.gamex.domain.Monster;
import com.zipcompany.gamex.domain.MonsterItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface MonsterItemRepository extends JpaRepository<MonsterItem, Long> {

}
