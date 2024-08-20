package com.wecp.eventmanagementsystem.repository;

import com.wecp.eventmanagementsystem.entity.Event;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByTitle(String title);
    
    public Event findEventByTitle(String title);


}
