package com.zipcompany.gamex.domain;


import javax.persistence.*;

@Entity
@Table(name = "MARKET_ITEMS")
public class MarketItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private int price;

    private String sellerName;

    @OneToOne
    @JoinColumn(name = "USERITEM_ID")
    private UserItem userItem;

    public MarketItems(){

    }

    public MarketItems(int price, String sellerName, UserItem userItem) {
        this.price = price;
        this.sellerName = sellerName;
        this.userItem = userItem;
    }


    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

    public UserItem getUserItem() {
        return userItem;
    }

    public void setUserItem(UserItem userItem) {
        this.userItem = userItem;
    }
}
