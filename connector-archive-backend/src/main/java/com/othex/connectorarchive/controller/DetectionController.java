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

import com.othex.connectorarchive.model.Detection;
import com.othex.connectorarchive.repository.DetectionRepository;

import jakarta.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/api/detections")
public class DetectionController {

    private final DetectionRepository detectionRepository;

    public DetectionController(DetectionRepository detectionRepository) {
        this.detectionRepository = detectionRepository;
    }

    @GetMapping
    public List<Detection> getAllDetections() {
        return detectionRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Detection> getDetectionById(@PathVariable(value = "id") Long detectionId) {
        var detection = detectionRepository.findById(detectionId).orElse(null);
        if (detection == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(detection);
    }

    @PostMapping
    public Detection createDetection(@Valid @RequestBody Detection detection) {
        return detectionRepository.save(detection);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Detection> updateDetection(@PathVariable(value = "id") Long detectionId, @Valid @RequestBody Detection detectionDetails) {
        var detection = detectionRepository.findById(detectionId).orElse(null);
        
        if (detection == null) {
            return ResponseEntity.notFound().build();
        }
        
        detection.setName(detectionDetails.getName());
        detection.setColor(detectionDetails.getColor());
        detection.setDescription(detectionDetails.getDescription());
      
        detection = detectionRepository.save(detection);
        return ResponseEntity.ok().body(detection);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Detection> deleteDetection(@PathVariable(value = "id") Long detectionId) {
        var detection = detectionRepository.findById(detectionId).orElse(null);
        if (detection == null) {
            return ResponseEntity.notFound().build();
        }
        detectionRepository.delete(detection);
        return ResponseEntity.ok().build();
    }
}
