package com.wecp.eventmanagementsystem.service;

import com.wecp.eventmanagementsystem.entity.Allocation;
import com.wecp.eventmanagementsystem.entity.Event;
import com.wecp.eventmanagementsystem.entity.Resource;
import com.wecp.eventmanagementsystem.repository.AllocationRepository;
import com.wecp.eventmanagementsystem.repository.EventRepository;
import com.wecp.eventmanagementsystem.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;


@Service
public class ResourceService {

    @Autowired
    private AllocationRepository allocationRepository;

    @Autowired
    private ResourceRepository resourceRepository;


    public Resource addResource(Resource resource) {
        return resourceRepository.save(resource);
    }

    public List<Resource> getAllResources() {
      return resourceRepository.findAll();
    }

    public Resource getResourceById(Long resourceId) {
      return null;
    }

    // public ResponseEntity<String> allocateResources(@RequestParam Long eventId, @RequestParam Long resourceId,
    //         @RequestBody Allocation allocation) {

    // }






}
