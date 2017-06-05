package br.com.projeto.service;

import java.util.List;

public interface ServiceGeneric<T,I> {

	T findById(I id);
	
	void saveOrUpdate(T entity);
	
	T delete(I id);
	
	List<T> find();
}
