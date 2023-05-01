package com.crud.crudAngular;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service
public class ServiceImpl implements Service {
	
	@Autowired
	private Dao dao;

	@Override
	public List<Entity1> view() {
		List<Entity1> l1=new ArrayList<>();
		dao.findAll().forEach(l1::add);
		return l1;
	}

	@Override
	public List<Entity1> add(Entity1 e1) {
		Entity1 e2 =new Entity1(
				e1.getId(),
				e1.getName(),
				e1.getDesignation());
		dao.save(e2);
		List<Entity1> l1=new ArrayList<>();
		dao.findAll().forEach(l1::add);
		return l1;
	}

	@Override
	public Entity1 edit(Entity1 e1) {
		if(dao.existsById(e1.getId()))
		{
			@SuppressWarnings("deprecation")
			Entity1 e2 =dao.getById(e1.getId());
			e2.setName(e1.getName());
			e2.setDesignation(e1.getDesignation());
			return dao.save(e2);
		}
		else
		{
			e1.setName("Id Does Not Exist");
			
			return e1;
		}
		
	}

	@Override
	public void delete(int id) {
		dao.deleteById(id);
	}

}
