package br.com.projeto.domain;

import java.util.List;

public class DataFilter {

	private List<String> fieldFilter;
	
	private String value;

	public List<String> getFieldFilter() {
		return fieldFilter;
	}

	public void setFieldFilter(List<String> fieldFilter) {
		this.fieldFilter = fieldFilter;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
	
}
