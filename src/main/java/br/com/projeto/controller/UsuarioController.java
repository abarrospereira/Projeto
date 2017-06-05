package br.com.projeto.controller;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto.domain.User;
import br.com.projeto.service.UserService;

@RestController 
@RequestMapping("/Usuario")
@Transactional
public class UsuarioController {

	@Autowired
	private UserService  usuarioService;
	
	 @PreAuthorize("hasRole('ROLE_USER')")
	@RequestMapping(method=RequestMethod.GET)
    public List<User> index(){
		return usuarioService.findAll();
    }
}
