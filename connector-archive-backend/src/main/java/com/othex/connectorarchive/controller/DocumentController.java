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

import com.othex.connectorarchive.model.Document;
import com.othex.connectorarchive.repository.DocumentRepository;

import jakarta.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentRepository documentRepository;

    public DocumentController(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @GetMapping
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Document> getDocumentById(@PathVariable(value = "id") Long documentId) {
        var document = documentRepository.findById(documentId).orElse(null);
        if (document == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(document);
    }

    @PostMapping
    public Document createDocument(@Valid @RequestBody Document document) {
        return documentRepository.save(document);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Document> updateDocument(@PathVariable(value = "id") Long documentId, @Valid @RequestBody Document documentDetails) {
        var document = documentRepository.findById(documentId).orElse(null);
        
        if (document == null) {
            return ResponseEntity.notFound().build();
        }
        
        document.setFilePath(documentDetails.getFilePath());
      
        document = documentRepository.save(document);
        return ResponseEntity.ok().body(document);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Document> deleteDocument(@PathVariable(value = "id") Long documentId) {
        var document = documentRepository.findById(documentId).orElse(null);
        if (document == null) {
            return ResponseEntity.notFound().build();
        }
        documentRepository.delete(document);
        return ResponseEntity.ok().build();
    }
}
