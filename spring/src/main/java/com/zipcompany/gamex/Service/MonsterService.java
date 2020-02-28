package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.Monster;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.List;


public interface MonsterService {

    Monster saveMonster(Monster monster);
    List<Monster> getAllMonsters();
    Monster findMonsterById(Long id);
    List<Monster> findMonstersById(Long id);
    public Blob getPhotoById(long id);

    Monster getMonsterById(Long monsterId);

    Monster getOneRandomMonsterForLocation(String locationName);

    // Monster findMonsterByName(String monsterName);

}
