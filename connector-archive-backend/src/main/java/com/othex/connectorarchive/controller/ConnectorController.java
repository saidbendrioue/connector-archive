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
import com.othex.connectorarchive.repository.DetectionRepository;
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
        var thumbnail = FileUtils.writeFileToDirectory(file);
        connectorPOJO.setThumbnail(thumbnail);
        connectorPOJO.setImage(file.getOriginalFilename());
        
        for(var detection : connectorPOJO.getDetections()){
            detection.setConnector(connectorPOJO);
        }
        
        for(var mnumber : connectorPOJO.getMnumbers()){
            mnumber.setConnector(connectorPOJO);
        }
        
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
            var thumbnail = FileUtils.writeFileToDirectory(file);
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
        for(var detection : connectorPOJO.getDetections()){
            detection.setConnector(connectorPOJO);
        }

        detectionRepository.deleteByConnectorId(connectorPOJO.getId());
        
        // update Mnumbers
        for(var mnumber : connectorPOJO.getMnumbers()){
            mnumber.setConnector(connectorPOJO);
        }
        
        mnumberRepository.deleteByConnectorId(connectorPOJO.getId());
        
        connector.setDetections(connectorPOJO.getDetections());
        connector.setMnumbers(connectorPOJO.getMnumbers());
        
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
    
    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<byte[]> getFile(@PathVariable String filename) {
        var path = Paths.get("images", filename);
        byte[] fileContents = null;
        try {
            fileContents = Files.readAllBytes(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDisposition(ContentDisposition.builder("attachment").filename(filename).build());
        return new ResponseEntity<>(fileContents, headers, HttpStatus.OK);
    }
}
