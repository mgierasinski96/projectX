package com.zipcompany.gamex.repository;


import com.zipcompany.gamex.domain.UserBackpack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface UserBackpackRepository extends JpaRepository<UserBackpack, Long> {

    UserBackpack findUserBackpackById(Long id);
}
