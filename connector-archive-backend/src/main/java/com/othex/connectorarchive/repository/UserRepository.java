package com.othex.connectorarchive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.othex.connectorarchive.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
