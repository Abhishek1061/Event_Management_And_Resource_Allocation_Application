package com.wecp.eventmanagementsystem.repository;


import com.wecp.eventmanagementsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // User findByUsername(String username);
    // extend jpa repository and add custom method if needed

    User findByUsername(String username);
    public boolean existsByUsername(String username);
    public boolean existsByEmail(String email);
    // extend jpa repository and add custom method if needed
}

