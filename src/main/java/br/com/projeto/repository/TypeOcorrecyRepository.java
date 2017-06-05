package br.com.projeto.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projeto.domain.TypeOcorrency;

@Repository
public interface TypeOcorrecyRepository  extends JpaRepository<TypeOcorrency, Long>{

	Page<TypeOcorrency> findAll(Pageable pageRequest); 
}
