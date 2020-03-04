package com.zipcompany.gamex.domain;


import javax.persistence.*;
import java.util.Date;


@Entity
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private String messageContent;

    private Date messageDate;

    public ChatMessage()
    {
        this.messageDate=new Date();

    }

    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getMessageContent() {
        return messageContent;
    }

    public void messageContent(String messageContent) {
        this.messageContent = messageContent;
    }

    public Date getMessageDate() {
        return messageDate;
    }

    public void setMessageDate(Date messageDate) {
        this.messageDate = messageDate;
    }

    @Override
    public String toString() {
        return "ChatMessage{" +
                "id=" + id +
                ", user=" + user +
                ", messageContent='" + messageContent + '\'' +
                ", messageDate=" + messageDate +
                '}';
    }
}
