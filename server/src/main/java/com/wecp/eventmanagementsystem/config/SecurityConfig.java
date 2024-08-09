package com.wecp.eventmanagementsystem.config;

import com.wecp.eventmanagementsystem.jwt.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


public class SecurityConfig  {
        // TODO: implement the security configuration

        // configure CORS and CSRF
        // configure the routes that are accessible without authentication
        // configure the routes that are accessible with specific roles
        // set the permission w.r.t to authorities
        // - /api/user/register: accessible to everyone
        // - /api/user/login: accessible to everyone
        // - /api/planner/event: accessible to PLANNER authority
        // - /api/planner/events: accessible to PLANNER authority
        // - /api/planner/resource: accessible to PLANNER authority
        // - /api/planner/resources: accessible to PLANNER authority
        // - /api/planner/allocate-resources: accessible to PLANNER authority
        // - /api/staff/event-details/{eventId}: accessible to STAFF authority
        // - /api/staff/update-setup/{eventId}: accessible to STAFF authority
        // - /api/client/booking-details/{eventId}: accessible to CLIENT authority
        // - any other route: accessible to authenticated users
        // configure the session management
        // add the jwtRequestFilter before the UsernamePasswordAuthenticationFilter
}