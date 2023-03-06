package com.othex.connectorarchive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.othex.connectorarchive.model.Document;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    void deleteByConnectorId(long connectorId);
}
