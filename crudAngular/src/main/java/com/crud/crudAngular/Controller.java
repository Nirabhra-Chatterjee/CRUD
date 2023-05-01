package com.crud.crudAngular;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Entity;

@RestController
@CrossOrigin
@RequestMapping("/Employee")
public class Controller {
	
	@Autowired
	private Service service;
	@GetMapping("/view")
	public List<Entity1> view()
	{
		return service.view();
	}
	@PostMapping("/add")
	public List<Entity1> add(@RequestBody Entity1 e1)
	{
		return service.add(e1);
	}
	@PutMapping("/edit")
	public Entity1 edit(@RequestBody Entity1 e1)
	{
		return service.edit(e1);
	}
	@DeleteMapping("/delete/{id}")
	public List<Entity1> delete(@PathVariable(value="id") int id)
	{
		service.delete(id);
		return service.view();
	}

}
