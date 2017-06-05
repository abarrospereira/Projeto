package br.com.projeto.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.projeto.dto.type.ocorrency.JsonResult;


@Service
public class JsonService<T,O> {

	public JsonResult<List<T>> toJson(Long recordsTotal, Long recordsFiltered, List<T> o) {
		return new JsonResult<List<T>>(recordsTotal, recordsFiltered, o);
	}
}
