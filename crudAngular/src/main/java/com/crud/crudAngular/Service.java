package com.crud.crudAngular;

import java.util.List;

public interface Service {

	List<Entity1> view();

	List<Entity1> add(Entity1 e1);

	Entity1 edit(Entity1 e1);

	void delete(int id);

}
