package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.GuildItem;
import com.zipcompany.gamex.domain.UserItem;

public interface GuildItemService {
void safeGuildItem(GuildItem guildItem);
    void deleteGuildItem(GuildItem guildItem);
    GuildItem findByUserItem(UserItem userItem);
}
