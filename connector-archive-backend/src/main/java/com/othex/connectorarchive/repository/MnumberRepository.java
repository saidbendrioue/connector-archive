package com.othex.connectorarchive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.othex.connectorarchive.model.Mnumber;

@Repository
public interface MnumberRepository extends JpaRepository<Mnumber, Long> {
}
