package com.example.Mainlandschooldatabase.repository;

import com.example.Mainlandschooldatabase.entity.MainlandContact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactReprository extends JpaRepository<MainlandContact,Integer> {
}
