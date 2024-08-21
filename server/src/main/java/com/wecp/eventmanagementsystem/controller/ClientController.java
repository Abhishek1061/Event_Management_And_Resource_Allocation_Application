package com.wecp.eventmanagementsystem.controller;

import com.wecp.eventmanagementsystem.entity.Event;
import com.wecp.eventmanagementsystem.service.EventService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClientController {

    @Autowired
    private EventService eventService;

    @GetMapping("/api/client/booking-details/{eventId}")
    public ResponseEntity<Event> getBookingDetails(@PathVariable Long eventId) {
        // get event details by event id and return with status code 200 OK
        return new ResponseEntity<Event>(eventService.getEventsById(eventId), HttpStatus.OK);
        
    }

    @GetMapping("/api/client/allEvents")
    public ResponseEntity<List<Event>> getEvents() {
        // get all events and return the list with status code 200 (OK)
        return new ResponseEntity<List<Event>>(eventService.getAllEvents(),HttpStatus.OK);
    }

    @GetMapping("/api/client/event-detailsbyTitleforClient/{title}")
    public ResponseEntity<Event> getBookingDetailsbyTitle(@PathVariable String title) {
        // get event details by event id and return with status code 200 OK
        return new ResponseEntity<Event>(eventService.getAllEventByTitles(title), HttpStatus.OK);
        
    }
}
