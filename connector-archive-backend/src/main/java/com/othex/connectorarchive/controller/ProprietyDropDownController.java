package com.othex.connectorarchive.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.othex.connectorarchive.model.ProprietyDropDown;
import com.othex.connectorarchive.repository.ProprietyDropDownRepository;

@RestController
@RequestMapping("/api/pdp")
public class ProprietyDropDownController {

	private final ProprietyDropDownRepository pdpRepository;

	@Autowired
    public ProprietyDropDownController(ProprietyDropDownRepository pdpRepository) {
        this.pdpRepository = pdpRepository;
    }
	
	@GetMapping
	public List<ProprietyDropDown> getAll() {
		return pdpRepository.findAll();
	}

	@PostMapping("/{id}")
	public ProprietyDropDown create(@RequestBody ProprietyDropDown proprietyDropDown) {
		return pdpRepository.save(proprietyDropDown);
	}

	@GetMapping("/{id}")
	public ProprietyDropDown getById(@PathVariable Long id) {
		return pdpRepository.findById(id).orElse(null);
	}

	@PutMapping("/{id}")
	public ProprietyDropDown update(@RequestBody ProprietyDropDown proprietyDropDown, @PathVariable Long id) {
		proprietyDropDown.setId(id);
		return pdpRepository.save(proprietyDropDown);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		pdpRepository.deleteById(id);
	}
}