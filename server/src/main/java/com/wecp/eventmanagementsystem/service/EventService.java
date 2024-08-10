package com.wecp.eventmanagementsystem.service;


import com.wecp.eventmanagementsystem.entity.Event;
import com.wecp.eventmanagementsystem.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;
    
    public List<Event> getAllEvents(){
        return eventRepository.findAll();
    }

    public Event getEventsById(Long id) {
        Event e = eventRepository.findById(id).orElse(null);
        if(e == null){
            throw new EntityNotFoundException("Event not found!");
        }
        else{
            return e;
        }
        
    }

    public Event createEvent(Event event){
        return eventRepository.save(event);
    }

    public Event updateEventById(Long id, Event event){
        Event e = eventRepository.findById(id).orElse(null);

        if(e != null){
            e.setAllocations(event.getAllocations());
            e.setDateTime(event.getDateTime());
            e.setDescription(event.getDescription());
            e.setLocation(event.getLocation());
            e.setStatus(event.getStatus());
            e.setTitle(event.getTitle());
            return e;
        }
        return null;
    }

}
