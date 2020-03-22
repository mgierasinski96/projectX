package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.Message;
import com.zipcompany.gamex.domain.User;
import com.zipcompany.gamex.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MessageServiceImpl implements MessageService {

    @Autowired
    MessageRepository messageRepository;
    @Override
    public List<Message> getAllPublicMessages() {
        return messageRepository.getAllPublicMessages();
    }

    @Override
    public Message safeMessage(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public List<Message> getAllPrivateMessages(User receiver) {
        return messageRepository.findAllByReceiverOrderByMessageDateDesc(receiver);
    }
}
