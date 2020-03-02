package com.zipcompany.gamex.repository;


import com.zipcompany.gamex.domain.UserBackpack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface UserBackpackRepository extends JpaRepository<UserBackpack, Long> {

    UserBackpack findUserBackpackById(Long id);

    @Transactional
    @Modifying
    @Query(value= " delete ui from user_items ui join users_user uu where uu.id=:userId and ui.backpack_slot=:previousSlot",nativeQuery = true)
    void deleteItemForUser(@Param("userId") long userId, @Param("previousSlot") String previousSlot);
}
