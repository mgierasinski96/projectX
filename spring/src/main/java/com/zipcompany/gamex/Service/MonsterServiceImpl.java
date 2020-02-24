package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.Monster;
import com.zipcompany.gamex.repository.MonsterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MonsterServiceImpl implements MonsterService {

    @Autowired
    private MonsterRepository monsterRepository;

    @Override
    public Monster saveMonster(Monster monster) {
        return monsterRepository.save(monster);
    }

    @Override
    public List<Monster> getAllMonsters() {
        return monsterRepository.findAll();
    }

    @Override
    public Monster findMonsterById(Long id) {
        return monsterRepository.findMonsterById(id);
    }

    @Override
    public List<Monster> findMonstersById(Long id) {
        return monsterRepository.findMonstersById(id);
    }
    //    @Override
//    public Monster findMonsterByName(String monsterName) {
//        return monsterRepository.findMonsterByName(monsterName);
//    }
}
