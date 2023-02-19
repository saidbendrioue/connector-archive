package com.othex.connectorarchive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.othex.connectorarchive.model.Detection;

@Repository
public interface DetectionRepository extends JpaRepository<Detection, Long> {
}
