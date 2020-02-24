package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.MonsterItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MonsterItemService{

    MonsterItem addMonsterItemConnection(MonsterItem monsterItem);


}
