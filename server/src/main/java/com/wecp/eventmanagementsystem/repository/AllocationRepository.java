package com.wecp.eventmanagementsystem.repository;


import com.wecp.eventmanagementsystem.entity.Allocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllocationRepository extends JpaRepository<Allocation, Long> {
    // extend jpa repository and add custom methods if needed
}
