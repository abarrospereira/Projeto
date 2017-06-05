package br.com.projeto.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto.controller.converter.TypeOcorrencyConverter;
import br.com.projeto.domain.TypeOcorrency;
import br.com.projeto.dto.type.ocorrency.JsonResult;
import br.com.projeto.dto.type.ocorrency.TypeOcorrencyDTO;
import br.com.projeto.service.JsonService;
import br.com.projeto.service.TypeOcorrencyService;

@RestController 
@RequestMapping("/type-ocorrencies")

public class TypeOcorrencyController {

	@Autowired
	private TypeOcorrencyService typeOcorrencyService;
	
	@Autowired
	private TypeOcorrencyConverter typeOcorrencyConverter;
	
	@Autowired
	private JsonService<TypeOcorrencyDTO, TypeOcorrency> jsonService;
	
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@RequestMapping(method=RequestMethod.GET)
    public JsonResult<List<TypeOcorrencyDTO>> getAll(@RequestParam("draw") int draw,@RequestParam("start") int start, @RequestParam("length") int length){
	
		Page<TypeOcorrency> content = typeOcorrencyService.findAll(start,length);
		List<TypeOcorrencyDTO> ocorrencies = typeOcorrencyConverter.toDTO(content.getContent());
		return jsonService.toJson(content.getTotalElements(), content.getTotalElements(),ocorrencies); 
    }
	
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@RequestMapping(method=RequestMethod.POST)
    public void save(@RequestBody TypeOcorrencyDTO typeOcorrencyDTO){
		TypeOcorrency typeOcorrency = typeOcorrencyConverter.toModel(typeOcorrencyDTO);
		typeOcorrencyService.save(typeOcorrency);
    }
	
	@RequestMapping(value = "/{id}", method=RequestMethod.GET)
	public TypeOcorrencyDTO findById(@PathVariable("id") Long id) {
		return typeOcorrencyConverter.toDTO(typeOcorrencyService.findById(id));
	}
	
	@RequestMapping(value = "/{id}", method=RequestMethod.DELETE)
	public void delete(@PathVariable("id") Long id) {
		typeOcorrencyService.delete(id);
	}
	
}
