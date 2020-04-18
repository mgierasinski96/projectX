package com.zipcompany.gamex.repository;

import com.zipcompany.gamex.domain.Message;
import com.zipcompany.gamex.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
@Transactional
public interface MessageRepository extends JpaRepository<Message,Long> {

    @Query(value = "select * from message where receiver_id is null ",nativeQuery = true)
    List<Message> getAllPublicMessages();
    List<Message> findAllByReceiverOrderByMessageDateDesc(User receiver);
    Message findById(long id);
}
