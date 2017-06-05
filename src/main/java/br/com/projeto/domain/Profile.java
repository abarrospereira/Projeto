package br.com.projeto.domain;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "Profile",
	uniqueConstraints = @UniqueConstraint(
		columnNames = { "role", "username" }))
public class Profile {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "profileId", unique = true, nullable = false)
	private Long profileId;
	
	private String role;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "username", nullable = false)
	private User user;
	
	public String getName() {
		return role;
	}

	public void setName(String name) {
		this.role = name;
	}

	public Long getProfileId() {
		return profileId;
	}

	public void setProfileId(Long profileId) {
		this.profileId = profileId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
	
}
