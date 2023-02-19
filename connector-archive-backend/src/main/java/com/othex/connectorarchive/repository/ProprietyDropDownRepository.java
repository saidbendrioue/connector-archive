package com.othex.connectorarchive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.othex.connectorarchive.model.ProprietyDropDown;

@Repository
public interface ProprietyDropDownRepository extends JpaRepository<ProprietyDropDown, Long> {
}
