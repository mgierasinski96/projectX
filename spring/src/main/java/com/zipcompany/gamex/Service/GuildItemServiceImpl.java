package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.GuildItem;
import com.zipcompany.gamex.domain.UserItem;
import com.zipcompany.gamex.repository.GuildItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GuildItemServiceImpl implements GuildItemService {

    @Autowired
    GuildItemRepository guildItemRepository;

    @Override
    public void safeGuildItem(GuildItem guildItem) {
        guildItemRepository.save(guildItem);
    }
    @Override
    public void deleteGuildItem(GuildItem guildItem) {
        guildItemRepository.delete(guildItem);
    }

    @Override
    public GuildItem findByUserItem(UserItem userItem) {
        return guildItemRepository.findByUserItem(userItem);
    }


}
