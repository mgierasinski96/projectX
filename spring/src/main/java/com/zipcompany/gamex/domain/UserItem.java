package com.zipcompany.gamex.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Arrays;

@Entity
@Table(name = "USER_ITEMS")
public class UserItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ITEM_ID")
    private Long id;

    private String itemName;

    @Enumerated
    private ItemType itemType;
    private int itemDamage;
    private int itemDefense;
    private int itemStrength;
    private int itemWidsdom;
    private int itemValue;
    private int itemPrice;

    public int getItemValue() {
        return itemValue;
    }

    public void setItemValue(int itemValue) {
        this.itemValue = itemValue;
    }

    public int getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(int itemPrice) {
        this.itemPrice = itemPrice;
    }

    @Lob
    private byte[] itemPicture;

    private String backpackSlot;

    @JsonIgnore
    @ManyToOne
    private UserBackpack userBackpack;

    public UserItem(){

    }
    public UserItem(Item item, UserBackpack userBackpack){
        this.itemName = item.getItemName();
        this.itemType = item.getItemType();
        this.itemDamage = item.getItemDamage();
        this.itemDefense = item.getItemDefense();
        this.itemStrength = item.getItemStrength();
        this.itemWidsdom = item.getItemWidsdom();
        this.itemPicture = item.getItemPicture();
        this.userBackpack = userBackpack;
    }

    public UserItem(int itemPrice, int itemValue,String itemName, ItemType itemType, int itemDamage, int itemDefense, int itemStrength, int itemWidsdom, byte[] itemPicture,String newSlot, UserBackpack userBackpack) {
        this.itemPrice=itemPrice;
        this.itemValue=itemValue;
        this.itemName = itemName;
        this.itemType = itemType;
        this.itemDamage = itemDamage;
        this.itemDefense = itemDefense;
        this.itemStrength = itemStrength;
        this.itemWidsdom = itemWidsdom;
        this.itemPicture = itemPicture;
        this.backpackSlot=newSlot;
        this.userBackpack = userBackpack;
    }

    public String getBackpackSlot() {
        return backpackSlot;
    }

    public void setBackpackSlot(String backpackSlot) {
        this.backpackSlot = backpackSlot;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public ItemType getItemType() {
        return itemType;
    }

    public void setItemType(ItemType itemType) {
        this.itemType = itemType;
    }

    public int getItemDamage() {
        return itemDamage;
    }

    public void setItemDamage(int itemDamage) {
        this.itemDamage = itemDamage;
    }

    public int getItemDefense() {
        return itemDefense;
    }

    public void setItemDefense(int itemDefense) {
        this.itemDefense = itemDefense;
    }

    public int getItemStrength() {
        return itemStrength;
    }

    public void setItemStrength(int itemStrength) {
        this.itemStrength = itemStrength;
    }

    public int getItemWidsdom() {
        return itemWidsdom;
    }

    public void setItemWidsdom(int itemWidsdom) {
        this.itemWidsdom = itemWidsdom;
    }

    public byte[] getItemPicture() {
        return itemPicture;
    }

    public void setItemPicture(byte[] itemPicture) {
        this.itemPicture = itemPicture;
    }

    public UserBackpack getUserBackpack() {
        return userBackpack;
    }

    public void setUserBackpack(UserBackpack userBackpack) {
        this.userBackpack = userBackpack;
    }

    @Override
    public String toString() {
        return "UserItem{" +
                "id=" + id +
                ", itemName='" + itemName + '\'' +
                ", itemType=" + itemType +
                ", itemDamage=" + itemDamage +
                ", itemDefense=" + itemDefense +
                ", itemStrength=" + itemStrength +
                ", itemWidsdom=" + itemWidsdom +
                ", itemPicture=" + Arrays.toString(itemPicture) +
                ", userBackpack=" + userBackpack +
                '}';
    }
}
