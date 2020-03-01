package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.ChatMessage;

import java.util.List;

public interface ChatService {

    List<ChatMessage> getAllChatMessages();
    ChatMessage safeMessage(ChatMessage chatMessage);
}
