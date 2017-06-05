package br.com.projeto.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.projeto.domain.TypeOcorrency;
import br.com.projeto.repository.TypeOcorrecyRepository;

@Service
@Transactional
public class TypeOcorrencyService {

	private static final int PAGE_SIZE = 10;
	
	@Autowired
	private TypeOcorrecyRepository typeOcorrecyRepository;
	
	public Page<TypeOcorrency> findAll(Integer pageNumber, Integer size){
		 PageRequest request =  new PageRequest(pageNumber, size);
		return typeOcorrecyRepository.findAll(request);
	}
	
	public void save(TypeOcorrency typeOcorrency) {
		typeOcorrecyRepository.save(typeOcorrency);
	}
	
	public TypeOcorrency findById(Long id) {
		return typeOcorrecyRepository.findOne(id);
	}
	
	public void delete(Long id) {
		typeOcorrecyRepository.delete(id);
	}
	
}
