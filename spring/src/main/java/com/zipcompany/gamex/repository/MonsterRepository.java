package com.zipcompany.gamex.repository;


import com.zipcompany.gamex.domain.Item;
import com.zipcompany.gamex.domain.Monster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface MonsterRepository extends JpaRepository<Monster, Long> {

    Monster findMonsterById(Long id);
    List<Monster> findMonstersById(Long id);

    @Transactional
    @Query(value = "select * from location l join monster m where m.location_id=l.id and l.location_name=:locationName ORDER BY RAND() LIMIT 1",nativeQuery = true)
    Monster getOneRandomMonsterForLocation(@Param("locationName") String locationName);

}
