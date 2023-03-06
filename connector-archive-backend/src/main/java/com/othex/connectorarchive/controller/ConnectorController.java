package com.othex.connectorarchive.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.othex.connectorarchive.model.Connector;
import com.othex.connectorarchive.repository.ConnectorRepository;
import com.othex.connectorarchive.repository.CustomerPartNumberRepository;
import com.othex.connectorarchive.repository.DetectionRepository;
import com.othex.connectorarchive.repository.DocumentRepository;
import com.othex.connectorarchive.repository.MnumberRepository;
import com.othex.connectorarchive.utils.FileUtils;
import org.springframework.transaction.annotation.Transactional;


@CrossOrigin
@RestController
@RequestMapping("/api/connectors")
public class ConnectorController {

    @Autowired
    private ConnectorRepository connectorRepository;
    
    @Autowired
    private DetectionRepository detectionRepository;

    @Autowired
    private MnumberRepository mnumberRepository;
    
    @Autowired
    private DocumentRepository documentRepository;
    
    @Autowired
    private CustomerPartNumberRepository customerPartNumberRepository;

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
    public Connector createConnector(@RequestPart("connector") String connectorJSON,
            @RequestParam(required = false) MultipartFile file) throws Exception {
        var objectMapper = new ObjectMapper();
        var connectorPOJO = objectMapper.readValue(connectorJSON, Connector.class);
       
        
        for(var item : connectorPOJO.getDetections()){
            item.setConnector(connectorPOJO);
        }
        
        for(var item : connectorPOJO.getMnumbers()){
            item.setConnector(connectorPOJO);
        }

        for(var item : connectorPOJO.getDocuments()){
            item.setConnector(connectorPOJO);
        }
        
        for(var item : connectorPOJO.getDocuments()){
            item.setConnector(connectorPOJO);
        }
        
        for(var item : connectorPOJO.getCustomerPartNumbers()){
            item.setConnector(connectorPOJO);
        }

        connectorPOJO = connectorRepository.save(connectorPOJO);

        var thumbnail = FileUtils.writeFileToDirectory(file, String.format("connector_ressources/%s/",connectorPOJO.getId()));
        connectorPOJO.setThumbnail(thumbnail);
        connectorPOJO.setImage(file.getOriginalFilename());

        return connectorRepository.save(connectorPOJO);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Connector> updateConnector(@RequestPart("connector") String connectorJSON,
            @RequestParam(required = false) MultipartFile file) throws Exception {

        var objectMapper = new ObjectMapper();
        var connectorPOJO = objectMapper.readValue(connectorJSON, Connector.class);

        var connector = connectorRepository.findById(connectorPOJO.getId()).orElse(null);

        if (file != null) {
            var thumbnail = FileUtils.writeFileToDirectory(file, String.format("connector_ressources/%s/",connectorPOJO.getId()));
            connectorPOJO.setThumbnail(thumbnail);
            connector.setImage(file.getOriginalFilename());
        }

        if (connector == null) {
            return ResponseEntity.notFound().build();
        }

        connector.setPartNumber(connectorPOJO.getPartNumber());
        connector.setSupplier(connectorPOJO.getSupplier());
        connector.setColor(connectorPOJO.getColor());
        connector.setCavitiesNumber(connectorPOJO.getCavitiesNumber());
        connector.setDescription(connectorPOJO.getDescription());
        connector.setCreationDate(connectorPOJO.getCreationDate());
        connector.setUpdateDate(connectorPOJO.getUpdateDate());

        // update detections
        for(var item : connectorPOJO.getDetections()){
            item.setConnector(connectorPOJO);
        }

        detectionRepository.deleteByConnectorId(connectorPOJO.getId());
        
        // update Mnumbers
        for(var item : connectorPOJO.getMnumbers()){
            item.setConnector(connectorPOJO);
        }
        
        mnumberRepository.deleteByConnectorId(connectorPOJO.getId());

        // update Documents
        for(var item : connectorPOJO.getDocuments()){
            item.setConnector(connectorPOJO);
        }
        
        documentRepository.deleteByConnectorId(connectorPOJO.getId());

       
        // update Customer PartNumbers
        for(var item : connectorPOJO.getCustomerPartNumbers()){
            item.setConnector(connectorPOJO);
        }
        
        customerPartNumberRepository.deleteByConnectorId(connectorPOJO.getId()); 
        
        connector.setDetections(connectorPOJO.getDetections());
        connector.setMnumbers(connectorPOJO.getMnumbers());
        connector.setDocuments(connectorPOJO.getDocuments());
        connector.setCustomerPartNumbers(connectorPOJO.getCustomerPartNumbers());

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
