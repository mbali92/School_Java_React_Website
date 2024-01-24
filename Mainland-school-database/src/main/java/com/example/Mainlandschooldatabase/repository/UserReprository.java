package com.example.Mainlandschooldatabase.repository;
import com.example.Mainlandschooldatabase.entity.MainlandUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserReprository extends JpaRepository<MainlandUsers, Integer> {
    Optional<MainlandUsers> findByUsername(String username);
}
