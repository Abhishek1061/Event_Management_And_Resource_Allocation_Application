package com.wecp.eventmanagementsystem.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ResourcesInUseException extends RuntimeException {
    public ResourcesInUseException(String message) {
        super(message);
    }
}