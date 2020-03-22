package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.Message;
import com.zipcompany.gamex.domain.User;

import java.util.List;

public interface MessageService {

    List<Message> getAllPublicMessages();
    Message safeMessage(Message message);

    List<Message> getAllPrivateMessages(User receiver);
}
