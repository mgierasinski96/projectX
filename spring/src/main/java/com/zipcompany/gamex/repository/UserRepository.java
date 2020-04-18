package com.zipcompany.gamex.repository;

import com.zipcompany.gamex.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User,Long> {

    User findUserById(Long id);
    List<User> findAllByOrderByLevelDesc();
    User findByUsername(String username);

    //TODO: OPTIONAL?
    Optional<User> findUserByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    @Transactional
    @Query(value = "select *\n" +
            " from users_user as u join user_items on u.user_backpack_id = user_items.user_backpack_id where user_items.user_item_id = :id",
            nativeQuery = true)
    User findUserByUserItemID(@Param("id") Long id);

    @Query(value = "select * from users_user u where TIMESTAMPDIFF(MINUTE ,u.work_begin_date,UTC_TIMESTAMP())>=u.how_long_working and u.working is true; ", nativeQuery = true)
    @Transactional
    List<User> getUsersWhoFinishedWorking();

    List<User> findByWorking(boolean working);

}
