package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.Monster;
import com.zipcompany.gamex.repository.MonsterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import javax.transaction.Transactional;
import java.sql.Blob;

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

    private JdbcTemplate jdbcTemp;

    public MonsterServiceImpl(DataSource dataSource) {
        jdbcTemp = new JdbcTemplate(dataSource);
    }


    @Transactional
    public Blob getPhotoById(long id) {
        String query = "select m.monster_image from monster m where monster_id=?";
        Blob photo = jdbcTemp.queryForObject(query, new Object[] { id }, Blob.class);
        return photo;
    }

    @Override
    public Monster getMonsterById(Long monsterId) {
        return monsterRepository.findMonsterById(monsterId);
    }

    @Override
    public Monster getOneRandomMonsterForLocation(String locationName) {
        return monsterRepository.getOneRandomMonsterForLocation(locationName);
    }
}
