package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.Guild;
import com.zipcompany.gamex.repository.GuildRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GuildServiceImpl implements GuildService {

    @Autowired
    GuildRepository guildRepository;

    public List<Guild> getAllGuilds() {
        return guildRepository.findAll();
    }

    @Override
    public Guild findByGuildName(String guildName) {
        return guildRepository.findByGuildName(guildName);
    }

    @Override
    public Guild safeGuild(Guild guild) {
        return guildRepository.save(guild);
    }

}
