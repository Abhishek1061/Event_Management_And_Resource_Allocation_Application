package com.wecp.eventmanagementsystem.controller;

import com.wecp.eventmanagementsystem.entity.Event;
import com.wecp.eventmanagementsystem.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


public class ClientController {


    @GetMapping("/api/client/booking-details/{eventId}")
    public ResponseEntity<Event> getBookingDetails(@PathVariable Long eventId) {
        // get event details by event id and return with status code 200 OK
    }
}
