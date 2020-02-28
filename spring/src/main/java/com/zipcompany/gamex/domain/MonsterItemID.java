package com.zipcompany.gamex.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class MonsterItemID implements Serializable {

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    private Monster monster;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    private Item item;


    public Monster getMonster(){
        return monster;
    }

    public void setMonster(Monster monster){
        this.monster = monster;
    }


    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        MonsterItemID that = (MonsterItemID) o;
        return Objects.equals(monster, that.monster) &&
                Objects.equals(item, that.item);
    }

    @Override
    public int hashCode() {
        return Objects.hash(monster, item);
    }
}
