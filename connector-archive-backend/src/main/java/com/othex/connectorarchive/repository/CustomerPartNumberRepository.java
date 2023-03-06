package com.othex.connectorarchive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.othex.connectorarchive.model.CustomerPartNumber;

@Repository
public interface CustomerPartNumberRepository extends JpaRepository<CustomerPartNumber, Long> {
    void deleteByConnectorId(long connectorId);
}