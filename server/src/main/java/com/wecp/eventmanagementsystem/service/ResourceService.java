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

  @Autowired
  private EventRepository eventRepository;

  public Resource addResource(Resource resource) {
    return resourceRepository.save(resource);
  }

  public List<Resource> getAllResources() {
    return resourceRepository.findAll();
  }

  public void allocateResources(Long eventId, Long resourceId, Allocation allocation) {
    Event event = eventRepository.findById(eventId)
        .orElseThrow(() -> new EntityNotFoundException("Event not found"));
    Resource resource = resourceRepository.findById(resourceId)
        .orElseThrow(() -> new EntityNotFoundException("Resource not found"));
    allocation.setEvent(event);
    allocation.setResource(resource);
    allocationRepository.save(allocation);
  }

}
