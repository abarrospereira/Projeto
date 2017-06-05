package br.com.projeto.controller.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.com.projeto.domain.TypeOcorrency;
import br.com.projeto.dto.type.ocorrency.TypeOcorrencyDTO;

@Service
public class TypeOcorrencyConverter {

	public TypeOcorrency toModel(TypeOcorrencyDTO typeOcorrencyDTO) {
		if(typeOcorrencyDTO == null) {
			return null;
		}
		
		TypeOcorrency typeOcorrency = new TypeOcorrency();
		typeOcorrency.setName(typeOcorrencyDTO.getName());
		typeOcorrency.setTypeOcorrecyId(typeOcorrencyDTO.getId());
		
		return typeOcorrency;
	}
	
	public TypeOcorrencyDTO toDTO(TypeOcorrency typeOcorrency) {
		if(typeOcorrency == null) {
			return null;
		}
		
		TypeOcorrencyDTO typeOcorrencyDTO = new TypeOcorrencyDTO();
		typeOcorrencyDTO.setName(typeOcorrency.getName());
		typeOcorrencyDTO.setId(typeOcorrency.getTypeOcorrecyId());
		
		return typeOcorrencyDTO;
	}
	
	public List<TypeOcorrencyDTO> toDTO(List<TypeOcorrency> typeOcorrencies) {
		return typeOcorrencies.stream().map(x -> toDTO(x)).collect(Collectors.toList());
	}
}
