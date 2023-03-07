package com.othex.connectorarchive.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.othex.connectorarchive.model.ProprietyDropDown;

@Repository
public interface ProprietyDropDownRepository extends JpaRepository<ProprietyDropDown, Long> {
    List<ProprietyDropDown> findByType(String type);
}
