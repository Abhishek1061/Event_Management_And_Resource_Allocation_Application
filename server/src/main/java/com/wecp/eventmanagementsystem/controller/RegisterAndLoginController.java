package com.wecp.eventmanagementsystem.controller;

import com.wecp.eventmanagementsystem.dto.LoginRequest;
import com.wecp.eventmanagementsystem.dto.LoginResponse;
import com.wecp.eventmanagementsystem.entity.User;
import com.wecp.eventmanagementsystem.jwt.JwtUtil;
import com.wecp.eventmanagementsystem.repository.UserRepository;
import com.wecp.eventmanagementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class RegisterAndLoginController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/api/user/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return new ResponseEntity<User>(userService.registerUser(user), HttpStatus.CREATED);
        // register user and return the registered user with status code 201 created
    }

    @PostMapping("/api/user/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        // login user and return the login response with status code 200 ok
        // if authentication fails, return status code 401 unauthorized
        User user = userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());
        if (user != null) {
            String tokens= jwtUtil.generateToken(loginRequest.getUsername());

            
            LoginResponse response = new LoginResponse(tokens, user.getUsername(), user.getEmail(), user.getRole());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }
}
