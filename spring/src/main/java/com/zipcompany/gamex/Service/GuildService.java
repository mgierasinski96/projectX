package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.Guild;

import java.util.List;

public interface GuildService {
    List<Guild> getAllGuilds();
    Guild findByGuildName(String guildName);
    Guild safeGuild(Guild guild);
    void upgradeGuildBulding(String guildName,String buildingName, int cost);
}
