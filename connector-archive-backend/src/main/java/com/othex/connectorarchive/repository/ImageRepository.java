package com.othex.connectorarchive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.othex.connectorarchive.model.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
}
