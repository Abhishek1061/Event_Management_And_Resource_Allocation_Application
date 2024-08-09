package com.wecp.eventmanagementsystem.repository;


import com.wecp.eventmanagementsystem.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceRepository  extends JpaRepository<Resource, Long>{
    // extend jpa repository and add custom method if needed
}
