package com.zipcompany.gamex.payload.response;

import com.zipcompany.gamex.domain.Guild;

import java.util.Date;
import java.util.List;

public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private Long id;
	private String username;
	private String email;
	private List<String> roles;
	private int gold;
	private int premium_curr;
	private int level;
	private double exp;
	private double total_exp;
	private Guild guild;
	private boolean onAdventure;




	public JwtResponse(String accessToken, Long id, String username, String email, List<String> roles, int level, double total_exp, int gold, int premium_curr, double exp) {
		this.token = accessToken;
		this.id = id;
		this.username = username;
		this.email = email;
		this.roles = roles;
		this.level = level;
		this.gold = gold;
		this.premium_curr = premium_curr;
		this.exp = exp;
		this.total_exp = total_exp;
		this.guild = guild;
		this.onAdventure = onAdventure;
	}



	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public List<String> getRoles() {
		return roles;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public String getToken() {
		return token;
	}

	public String getType() {
		return type;
	}

	public int getGold() {
		return gold;
	}

	public int getPremium_curr() {
		return premium_curr;
	}

	public double getExp() {
		return exp;
	}

	public double getTotal_exp() {
		return total_exp;
	}

	public Guild getGuild() {
		return guild;
	}

	public boolean isOnAdventure() {
		return onAdventure;
	}
}
