package br.com.projeto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projeto.domain.User;
import br.com.projeto.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository usuarioRepository;
	
	public List<User> findAll(){
		return usuarioRepository.findAll();
	}
	
	public User findByUserName(String id) {
		return usuarioRepository.findByUserName(id);
	}
	
}
