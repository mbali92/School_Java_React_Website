package com.example.Mainlandschooldatabase.repository;

import com.example.Mainlandschooldatabase.entity.MainlandBlog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogReprository extends JpaRepository<MainlandBlog, Integer> {
}
