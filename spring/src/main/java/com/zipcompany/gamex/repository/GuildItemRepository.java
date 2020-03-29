package com.zipcompany.gamex.repository;

import com.zipcompany.gamex.domain.GuildItem;
import com.zipcompany.gamex.domain.UserItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuildItemRepository extends JpaRepository<GuildItem, Long> {
    GuildItem findByUserItem(UserItem userItem);
}
