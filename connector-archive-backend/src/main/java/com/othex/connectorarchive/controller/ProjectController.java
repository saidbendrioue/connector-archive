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

import com.othex.connectorarchive.model.Project;
import com.othex.connectorarchive.repository.ProjectRepository;

import jakarta.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable(value = "id") Long projectId) {
        var project = projectRepository.findById(projectId).orElse(null);
        if (project == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(project);
    }

    @PostMapping
    public Project createProject(@Valid @RequestBody Project project) {
        return projectRepository.save(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable(value = "id") Long projectId, @Valid @RequestBody Project projectDetails) {
        var project = projectRepository.findById(projectId).orElse(null);
        
        if (project == null) {
            return ResponseEntity.notFound().build();
        }
        
        project.setName(projectDetails.getName());
        project.setPartNumber(projectDetails.getPartNumber());
        project.setDescription(projectDetails.getDescription());
        

        project.setDescription(projectDetails.getDescription());
      
        project = projectRepository.save(project);
        return ResponseEntity.ok().body(project);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Project> deleteProject(@PathVariable(value = "id") Long projectId) {
        var project = projectRepository.findById(projectId).orElse(null);
        if (project == null) {
            return ResponseEntity.notFound().build();
        }
        projectRepository.delete(project);
        return ResponseEntity.ok().build();
    }
}
