package com.zipcompany.gamex.repository;

import com.zipcompany.gamex.domain.Guild;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface GuildRepository  extends JpaRepository<Guild,Long> {
   Guild findByGuildName(String guildName);
}
