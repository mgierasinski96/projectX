package com.zipcompany.gamex.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "monster")
public class Monster {

    @Id
    @Column(name = "MONSTER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String monsterName;

    @JsonIgnore
    @OneToMany(mappedBy = "primaryKey.monster")
    private List<MonsterItem> monsterItems;

    private int monsterLevel;
    private int monsterHealth;
    private int monsterDamage;
    private long monsterExp;
    @Lob
    private byte[] monsterImage;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    Location location;

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }


    public List<MonsterItem> getMonsterItems() {
        return monsterItems;
    }

    public Monster() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
//    public Monster(String monsterName, int monsterLevel, int monsterHealth, int monsterDamage, long monsterExp) {
//        this.monsterName = monsterName;
//        this.monsterLevel = monsterLevel;
//        this.monsterHealth = monsterHealth;
//        this.monsterDamage = monsterDamage;
//        this.monsterExp = monsterExp;
//    }


    public byte[] getMonsterImage() {
        return monsterImage;
    }

    public void setMonsterImage(byte[] monsterImage) {
        this.monsterImage = monsterImage;
    }

    public Monster(String monsterName) {
        this.monsterName = monsterName;
    }

    public void dodajPowiazanie(MonsterItem monsterItem) {
        this.monsterItems.add(monsterItem);
    }


    public void setMonsterItems(List<MonsterItem> monsterItems) {
        this.monsterItems = monsterItems;
    }

    public String getMonsterName() {
        return monsterName;
    }

    public void setMonsterName(String monsterName) {
        this.monsterName = monsterName;
    }

    public int getMonsterLevel() {
        return monsterLevel;
    }

    public void setMonsterLevel(int monsterLevel) {
        this.monsterLevel = monsterLevel;
    }

    public int getMonsterHealth() {
        return monsterHealth;
    }

    public void setMonsterHealth(int monsterHealth) {
        this.monsterHealth = monsterHealth;
    }

    public int getMonsterDamage() {
        return monsterDamage;
    }

    public void setMonsterDamage(int monsterDamage) {
        this.monsterDamage = monsterDamage;
    }

    public long getMonsterExp() {
        return monsterExp;
    }

    public void setMonsterExp(long monsterExp) {
        this.monsterExp = monsterExp;
    }


    //    @Override
//    public int hashCode() {
//        return Objects.hash(monsterName);
//    }
//
//    @Override
//    public boolean equals(Object obj) {
//        if (this == obj) return true;
//        if (obj == null || getClass() != obj.getClass()) return false;
//
//        Monster monster = (Monster) obj;
//        return id == monster.id && (monsterName == monster.monsterName || (monsterName != null && monsterName.equals(monster.getMonsterName())));
//    }
}
