package com.othex.connectorarchive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.othex.connectorarchive.model.Connector;

@Repository
public interface ConnectorRepository extends JpaRepository<Connector, Long> {
}
