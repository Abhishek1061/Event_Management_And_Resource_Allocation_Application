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

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventsById(Long id) {
        Event e = eventRepository.findById(id).orElse(null);
        if (e == null) {
            throw new EntityNotFoundException("Event not found!");
        } else {
            return e;
        }

    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEventById(Event event, Long id) {
        Event existingEvent = eventRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        existingEvent.setTitle(event.getTitle());
        existingEvent.setDateTime(event.getDateTime());
        existingEvent.setDescription(event.getDescription());
        existingEvent.setLocation(event.getLocation());
        existingEvent.setStatus(event.getStatus());
        existingEvent.setAllocations(event.getAllocations());
        return eventRepository.save(existingEvent);
    }


    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }


}
