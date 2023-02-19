package com.othex.connectorarchive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.othex.connectorarchive.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}
