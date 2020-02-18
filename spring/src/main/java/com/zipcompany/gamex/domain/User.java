package com.zipcompany.gamex.domain;


import javax.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user")
    private String userName;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;
}
