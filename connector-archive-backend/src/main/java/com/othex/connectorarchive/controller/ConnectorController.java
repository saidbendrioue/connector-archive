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

import com.othex.connectorarchive.model.Connector;
import com.othex.connectorarchive.repository.ConnectorRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/connectors")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class ConnectorController {

    private final ConnectorRepository connectorRepository;

    public ConnectorController(ConnectorRepository connectorRepository) {
        this.connectorRepository = connectorRepository;
    }

    @GetMapping
    public List<Connector> getAllConnectors() {
        return connectorRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Connector> getConnectorById(@PathVariable(value = "id") Long connectorId) {
        var connector = connectorRepository.findById(connectorId).orElse(null);
        if (connector == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(connector);
    }

    @PostMapping
    public Connector createConnector(@Valid @RequestBody Connector connector) {
        return connectorRepository.save(connector);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Connector> updateConnector(@PathVariable(value = "id") Long connectorId, @Valid @RequestBody Connector connectorDetails) {
        var connector = connectorRepository.findById(connectorId).orElse(null);
        
        if (connector == null) {
            return ResponseEntity.notFound().build();
        }
        
        connector.setPartNumber(connectorDetails.getPartNumber());
        connector.setSupplier(connectorDetails.getSupplier());
        connector.setColor(connectorDetails.getColor());
        connector.setImage(connectorDetails.getImage());
        connector.setThumbnail(connectorDetails.getThumbnail());
        connector.setCavitiesNumber(connectorDetails.getCavitiesNumber());
        connector.setDescription(connectorDetails.getDescription());
        connector.setCreationDate(connectorDetails.getCreationDate());
        connector.setUpdateDate(connectorDetails.getUpdateDate());
        
        connector = connectorRepository.save(connector);
        return ResponseEntity.ok().body(connector);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Connector> deleteConnector(@PathVariable(value = "id") Long connectorId) {
        var connector = connectorRepository.findById(connectorId).orElse(null);
        if (connector == null) {
            return ResponseEntity.notFound().build();
        }
        connectorRepository.delete(connector);
        return ResponseEntity.ok().build();
    }
}
