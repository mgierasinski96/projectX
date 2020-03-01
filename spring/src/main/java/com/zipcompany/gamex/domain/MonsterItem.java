package com.zipcompany.gamex.domain;

import javax.persistence.*;

@Entity
@Table(name =  "Monster_Item")
@AssociationOverrides({
        @AssociationOverride(name = "primaryKey.monster",
                joinColumns = @JoinColumn(name = "MONSTER_ID")),
        @AssociationOverride(name = "primaryKey.item",
                joinColumns = @JoinColumn(name = "ITEM_ID")) })
public class MonsterItem {

    @EmbeddedId
    private MonsterItemID primaryKey = new MonsterItemID();

    private String dropRate;

    public MonsterItemID getPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(MonsterItemID primaryKey) {
        this.primaryKey = primaryKey;
    }

    @Transient
    public Item getItem(){
        return getPrimaryKey().getItem();
    }

    public void setItem(Item item){
        getPrimaryKey().setItem(item);
    }

    @Transient
    public Monster getMonster(){
        return  getPrimaryKey().getMonster();
    }

    public void setMonster(Monster monster){
        getPrimaryKey().setMonster(monster);
    }
    public String getDropRate() {
        return dropRate;
    }

    public void setDropRate(String dropRate) {
        this.dropRate = dropRate;
    }
}
