package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.MonsterItem;
import com.zipcompany.gamex.repository.MonsterItemRepository;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MonsterItemServiceImpl implements MonsterItemService {

    @Autowired
    MonsterItemRepository monsterItemRepository;

    @Override
    public MonsterItem addMonsterItemConnection(MonsterItem monsterItem) {
        //System.out.println(monsterItem.getItem().getItemName());
        //System.out.println(monsterItem.getMonster().getMonsterName());
        return monsterItemRepository.save(monsterItem);
    }


}
