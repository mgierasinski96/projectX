package com.zipcompany.gamex.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String password;
    private String email;
    private String username;

    private Date date_joined;
    private Date last_login;

    private boolean is_admin;
    private boolean is_active;
    private boolean is_staff;
    private boolean is_superuser;

    private int gold;
    private int premium_curr;
    private String profession;
    private double max_hp;
    private double current_hp;
    private int level;
    private double exp;
    private double total_exp;
    private int stamina;
    private int strength;
    private int wisdom;
    private int luck;
    private int toughness;
    private double total_damage;
    private double defense;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "userShopItems",
            joinColumns = @JoinColumn(name = "userId"),
            inverseJoinColumns = @JoinColumn(name = "itemId"))
    private List<Item> shopItems = new ArrayList<>();

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userBackpack_id")
    private UserBackpack userBackpack;

    @OneToOne
    @JoinColumn(name = "guild_id")
    private Guild guild;

    public Guild getGuild() {
        return guild;
    }

    public void setGuild(Guild guild) {
        this.guild = guild;
    }

    public List<Item> getShopItems() {
        return shopItems;
    }

    public void setShopItems(List<Item> shopItems) {
        this.shopItems = shopItems;
    }

    public UserBackpack getUserBackpack() {
        return userBackpack;
    }

    public void setUserBackpack(UserBackpack userBackpack) {
        this.userBackpack = userBackpack;
    }

    public User(){ this.date_joined=new Date();
    this.last_login=new Date();
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getDate_joined() {
        return date_joined;
    }

    public void setDate_joined(Date date_joined) {
        this.date_joined = date_joined;
    }

    public Date getLast_login() {
        return last_login;
    }

    public void setLast_login(Date last_login) {
        this.last_login = last_login;
    }

    public boolean isIs_admin() {
        return is_admin;
    }

    public void setIs_admin(boolean is_admin) {
        this.is_admin = is_admin;
    }

    public boolean isIs_active() {
        return is_active;
    }

    public void setIs_active(boolean is_active) {
        this.is_active = is_active;
    }

    public boolean isIs_staff() {
        return is_staff;
    }

    public void setIs_staff(boolean is_staff) {
        this.is_staff = is_staff;
    }

    public boolean isIs_superuser() {
        return is_superuser;
    }

    public void setIs_superuser(boolean is_superuser) {
        this.is_superuser = is_superuser;
    }

    public int getGold() {
        return gold;
    }

    public void setGold(int gold) {
        this.gold = gold;
    }

    public int getPremium_curr() {
        return premium_curr;
    }

    public void setPremium_curr(int premium_curr) {
        this.premium_curr = premium_curr;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public double getMax_hp() {
        return max_hp;
    }

    public void setMax_hp(double max_hp) {
        this.max_hp = max_hp;
    }

    public double getCurrent_hp() {
        return current_hp;
    }

    public void setCurrent_hp(double current_hp) {
        this.current_hp = current_hp;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public double getExp() {
        return exp;
    }

    public void setExp(double exp) {
        this.exp = exp;
    }

    public double getTotal_exp() {
        return total_exp;
    }

    public void setTotal_exp(double total_exp) {
        this.total_exp = total_exp;
    }

    public int getStamina() {
        return stamina;
    }

    public void setStamina(int stamina) {
        this.stamina = stamina;
    }

    public int getStrength() {
        return strength;
    }

    public void setStrength(int strength) {
        this.strength = strength;
    }

    public int getWisdom() {
        return wisdom;
    }

    public void setWisdom(int wisdom) {
        this.wisdom = wisdom;
    }

    public int getLuck() {
        return luck;
    }

    public void setLuck(int luck) {
        this.luck = luck;
    }

    public int getToughness() {
        return toughness;
    }

    public void setToughness(int toughness) {
        this.toughness = toughness;
    }

    public double getTotal_damage() {
        return total_damage;
    }

    public void setTotal_damage(double total_damage) {
        this.total_damage = total_damage;
    }

    public double getDefense() {
        return defense;
    }

    public void setDefense(double defense) {
        this.defense = defense;
    }
}
