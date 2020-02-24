package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.Monster;
import org.springframework.stereotype.Service;

import java.util.List;


public interface MonsterService {

    Monster saveMonster(Monster monster);
    List<Monster> getAllMonsters();
    Monster findMonsterById(Long id);
    List<Monster> findMonstersById(Long id);

   // Monster findMonsterByName(String monsterName);

}
