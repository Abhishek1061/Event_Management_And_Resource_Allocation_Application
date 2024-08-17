package com.wecp.eventmanagementsystem.controller;


import com.wecp.eventmanagementsystem.entity.Event;
import com.wecp.eventmanagementsystem.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class StaffController {

    @Autowired
    private EventService eventService;

    @GetMapping("/api/staff/event-details/{eventId}")
    public ResponseEntity<Event> getEventDetails(@PathVariable Long eventId) {
        // get the event details by eventId and return the event with status code 200 ok
        return new ResponseEntity<Event>(eventService.getEventsById(eventId), HttpStatus.OK);
    }

    @PutMapping("/api/staff/update-setup/{eventId}")
    public ResponseEntity<Event> updateEventSetup( @RequestBody Event updatedEvent, @PathVariable Long eventId) {
        // update the event setup and return the updated event with status code 200 ok
        return new ResponseEntity<Event>(eventService.updateEventById( updatedEvent, eventId),HttpStatus.OK);
    }
}
