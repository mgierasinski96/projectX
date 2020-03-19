package com.zipcompany.gamex.domain;

import javax.persistence.*;

@Entity
@Table(name = "AUCTION_ITEMS")
public class AuctionItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int actualPrice;

    private Long winningUserID;

    @OneToOne
    @JoinColumn(name = "ITEM_ID")
    private Item item;

    public AuctionItems(){

    }

    public AuctionItems(Item item, int actualPrice){
        this.item = item;
        this.actualPrice = actualPrice;
    }

//    public AuctionItemsService(UserItem userItem, int actualPrice){
//        this.userItem = userItem;
//        this.actualPrice = actualPrice;
//    }


    public Long getWinningUserID() {
        return winningUserID;
    }

    public void setWinningUserID(Long winningUserID) {
        this.winningUserID = winningUserID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getActualPrice() {
        return actualPrice;
    }

    public void setActualPrice(int actualPrice) {
        this.actualPrice = actualPrice;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
//    public UserItem getUserItem() {
//        return userItem;
//    }
//
//    public void setUserItem(UserItem userItem) {
//        this.userItem = userItem;
//    }
}
