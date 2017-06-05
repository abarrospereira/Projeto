package br.com.projeto.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class MainController {

	 @RequestMapping(method = RequestMethod.GET)
	 @PreAuthorize("hasRole('ROLE_USER')")
     public ModelAndView index() {
		 ModelAndView model = new ModelAndView();
		 
		 model.addObject("error", "Invalid username and password!");
		 model.setViewName("index");
		 
		 return model;
	 }
}
