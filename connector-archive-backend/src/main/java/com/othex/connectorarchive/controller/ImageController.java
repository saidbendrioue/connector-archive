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

import com.othex.connectorarchive.model.Image;
import com.othex.connectorarchive.repository.ImageRepository;

import jakarta.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/api/image")
public class ImageController {

    private final ImageRepository imageRepository;

    public ImageController(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @GetMapping
    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Image> getImageById(@PathVariable(value = "id") Long imageId) {
        var image = imageRepository.findById(imageId).orElse(null);
        if (image == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(image);
    }

    @PostMapping
    public Image createImage(@Valid @RequestBody Image image) {
        return imageRepository.save(image);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Image> updateImage(@PathVariable(value = "id") Long imageId, @Valid @RequestBody Image imageDetails) {
        var image = imageRepository.findById(imageId).orElse(null);
        
        if (image == null) {
            return ResponseEntity.notFound().build();
        }
        
        image.setImagePath(imageDetails.getImagePath());
      
        image = imageRepository.save(image);
        return ResponseEntity.ok().body(image);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Image> deleteImage(@PathVariable(value = "id") Long imageId) {
        var image = imageRepository.findById(imageId).orElse(null);
        if (image == null) {
            return ResponseEntity.notFound().build();
        }
        imageRepository.delete(image);
        return ResponseEntity.ok().build();
    }
}
