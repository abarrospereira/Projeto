package br.com.projeto.domain;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TypeOcorrency")
public class TypeOcorrency {
	
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "profileId", unique = true, nullable = false)
	private Long typeOcorrecyId;
	
	private String name;

	public Long getTypeOcorrecyId() {
		return typeOcorrecyId;
	}

	public void setTypeOcorrecyId(Long typeOcorrecyId) {
		this.typeOcorrecyId = typeOcorrecyId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
