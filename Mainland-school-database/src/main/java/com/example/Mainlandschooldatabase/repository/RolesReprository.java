package com.example.Mainlandschooldatabase.repository;

import com.example.Mainlandschooldatabase.entity.MainlandRoles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolesReprository extends JpaRepository<MainlandRoles, Integer> {
    Optional<MainlandRoles> findByAuthority(String authority);
}

