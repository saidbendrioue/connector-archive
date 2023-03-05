package com.othex.connectorarchive.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.othex.connectorarchive.model.Mnumber;
import com.othex.connectorarchive.repository.MnumberRepository;

import jakarta.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/api/mnumbers")
public class MnumberController {

    private final MnumberRepository mnumberRepository;

    public MnumberController(MnumberRepository mnumberRepository) {
        this.mnumberRepository = mnumberRepository;
    }

    @GetMapping
    public List<Mnumber> getAllMnumbers() {
        return mnumberRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mnumber> getMnumberById(@PathVariable(value = "id") Long mnumberId) {
        var mnumber = mnumberRepository.findById(mnumberId).orElse(null);
        if (mnumber == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(mnumber);
    }

    @PostMapping
    public Mnumber createMnumber(@Valid @RequestBody Mnumber mnumber) {
        return mnumberRepository.save(mnumber);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mnumber> updateMnumber(@PathVariable(value = "id") Long mnumberId, @Valid @RequestBody Mnumber mnumberDetails) {
        var mnumber = mnumberRepository.findById(mnumberId).orElse(null);
        
        if (mnumber == null) {
            return ResponseEntity.notFound().build();
        }
        
        mnumber.setMnumber(mnumberDetails.getMnumber());
        mnumber.setDescription(mnumberDetails.getDescription());
      
        mnumber = mnumberRepository.save(mnumber);
        return ResponseEntity.ok().body(mnumber);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Mnumber> deleteMnumber(@PathVariable(value = "id") Long mnumberId) {
        var mnumber = mnumberRepository.findById(mnumberId).orElse(null);
        if (mnumber == null) {
            return ResponseEntity.notFound().build();
        }
        mnumberRepository.delete(mnumber);
        return ResponseEntity.ok().build();
    }
}
