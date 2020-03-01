package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.ChatMessage;
import com.zipcompany.gamex.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ChatServiceImpl implements ChatService{

    @Autowired
    ChatRepository chatRepository;
    @Override
    public List<ChatMessage> getAllChatMessages() {
        return chatRepository.findAll();
    }

    @Override
    public ChatMessage safeMessage(ChatMessage chatMessage) {
        return chatRepository.save(chatMessage);
    }
}
