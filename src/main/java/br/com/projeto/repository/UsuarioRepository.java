package br.com.projeto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projeto.domain.Usuario;

@Repository
public interface UsuarioRepository  extends JpaRepository<Usuario, Long>{

	List<Usuario> findByName(String name);
}
