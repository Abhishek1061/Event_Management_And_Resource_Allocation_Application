# Event Management and Resource Allocation Platform

## Overview

A comprehensive system for organizing and streamlining event planning activities, including task assignment, resource allocation, and client interaction, ensuring a seamless execution of events.

## Users of the System

- **Event Planners**: Organize events, manage resources, and communicate with clients.
- **Venue Staff**: Oversee venue preparation, maintenance, and scheduling.
- **Clients**: Book events, provide specifications, and receive updates.

## Functional Requirements

- **User Registration & Profile Management**: Users sign up, log in, and manage profiles with data validation and secure handling of information.
- **Event Scheduling & Management**: Planners create, update, and manage event details, with authorization for modifications.
- **Resource Allocation to Events**: Allocate resources like staff, equipment, and venues to specific events.
- **Client Interaction Interface**: Clients can view event progress and communicate with planners.
- **User Role-Based Authentication**: System identifies user roles to provide role-specific interfaces and functionalities.
- **JWT Authorization**: Manages user sessions and secures API calls.
- **RESTful API & Angular Service Layer**: Angular services interact with backend RESTful APIs for data exchange and UI updates.

## Technology Stack

- **Backend**: Spring Boot, JPA, MySQL
- **Frontend**: Angular
- **Security**: Spring Security, JWT

## Key Points to Note

- **Security**: Ensure data and API access are secured, especially personal client information.
- **Scalability**: Capable of scaling for large events and increasing user base.
- **User Interface Consistency**: Consistent UI/UX across various modules.
- **Best Practices**: Adhere to coding best practices and ensure code maintainability.

## Backend Functionalities to be Built

- **User Management**: Build endpoints for user registration, login, and profile management.
- **Event Management**: CRUD operations for event details, ensuring data integrity.
- **Resource Management**: Track and assign resources to events, manage inventory.
- **Role-Based Authentication**: Define access levels for planners, staff, and clients.
- **JWT Token Management**: Handle token generation, validation, and expiration.
- Angular: Use Reactive form and declare form with name itemForm
- Angular: Create a service with name AuthService and add these functions saveToken,SetRole,getRole,getLoginStatus,getToken,logout
- Angular: Create a service with name HttpService and add these functions getOrderStatus ,updateCargoStatus,assignDriver,getAssignOrders,getCargo,getDrivers,addCargo,Login,registerUser

Your task is to complete the following backend files:

- `./src/main/java/com/wecp/eventmanagementsystem/config/SecurityConfig.java`
- `./src/main/java/com/wecp/eventmanagementsystem/controller/ClientController.java`
- `./src/main/java/com/wecp/eventmanagementsystem/controller/EventPlannerController.java`
- `./src/main/java/com/wecp/eventmanagementsystem/controller/RegisterAndLoginController.java`
- `./src/main/java/com/wecp/eventmanagementsystem/controller/StaffController.java`
- `./src/main/java/com/wecp/eventmanagementsystem/entity/Allocation.java`
- `./src/main/java/com/wecp/eventmanagementsystem/entity/Event.java`
- `./src/main/java/com/wecp/eventmanagementsystem/entity/Resource.java`
- `./src/main/java/com/wecp/eventmanagementsystem/entity/User.java`
- `./src/main/java/com/wecp/eventmanagementsystem/jwt/JwtRequestFilter.java`
- `./src/main/java/com/wecp/eventmanagementsystem/jwt/JwtUtil.java`
- `./src/main/java/com/wecp/eventmanagementsystem/repository/AllocationRepository.java`
- `./src/main/java/com/wecp/eventmanagementsystem/repository/EventRepository.java`
- `./src/main/java/com/wecp/eventmanagementsystem/repository/ResourceRepository.java`
- `./src/main/java/com/wecp/eventmanagementsystem/repository/UserRepository.java`
- `./src/main/java/com/wecp/eventmanagementsystem/service/EventService.java`
- `./src/main/java/com/wecp/eventmanagementsystem/service/ResourceService.java`
- `./src/main/java/com/wecp/eventmanagementsystem/service/UserService.java`

## Entity Classes and their properties
1. User
   - Long userID (should be auto-generated and primary key)
   - String username
   - String password
   - String email
   - String role // role should be either "PLANNER", "STAFF" or "CLIENT"

2. Event
   - Long eventID (should be auto-generated and primary key)
   - String title
   - String description
   - Date dateTime
   - String location
   - String status
   - List<Allocation> allocations

3. Allocation
   - Long allocationID (should be auto-generated and primary key)
   - Event event
   - Resource resource
   - int quantity
   
4. Resource
   - Long resourceID (should be auto-generated and primary key)
   - String name
   - String type
   - boolean availability

-> Manage the relationships between entities using appropriate annotations.
-> generate constructors, getters, and setters for the Property class as per standard Java conventions.
-> For example: getUserID(), setUserID(Long userID) etc.



## API Endpoints

For Event Planners (Admin Side):

- Register Planner: `POST /api/user/register`
- Login Planner: `POST /api/user/login`
- Create Event: `POST /api/planner/event`
- View Events: `GET /api/planner/events`
- Add Resource: `POST:/api/planner/resource`
- Get Resources: `Get:/api/planner/resources`
- Allocate Resources: `POST api/planner/allocate-resources?eventId=&resourceId=`

For Venue Staff and Clients (User Side):

- Register User: `POST /api/user/register`
- Login User: `POST /api/user/login`
- View Event Details: `GET /api/staff/event-details/{eventId}`
- Update Event Setup: `PUT /api/staff/update-setup/{eventId}`
- View Booking Details: `GET/api/client/booking-details/{eventId}`

## Security Configurations to be Implemented
Set the following security configurations in the `SecurityConfig.java` file:
- /api/user/register: accessible to everyone
- /api/user/login: accessible to everyone
- /api/planner/event: accessible to PLANNER authority
- /api/planner/events: accessible to PLANNER authority
- /api/planner/resource: accessible to PLANNER authority
- /api/planner/resources: accessible to PLANNER authority
- /api/planner/allocate-resources: accessible to PLANNER authority
- /api/staff/event-details/{eventId}: accessible to STAFF authority
- /api/staff/update-setup/{eventId}: accessible to STAFF authority
- /api/client/booking-details/{eventId}: accessible to CLIENT authority
- any other route: accessible to authenticated users

Check the permissions with respect to authority such as hasAuthority("PLANNER") or hasAuthority("STAFF") or hasAuthority("CLIENT").
If a user tries to access a route without the required authority, return a 403 Forbidden status.


## Frontend Functionalities to be Built

- **Registration and Profile Management**: User-friendly registration and profile management for all user types.
- **Event Dashboard**: Tools for planners to manage events and resources.
- **Resource Allocation Interface**: Interface for planners to allocate resources to different events.
- **Client Communication Interface**: Portal for clients to interact and get updates.
- **Role-Specific UI Elements**: Tailor the UI to display options relevant to each role.
- **Session Management with JWT**: Implement JWT token handling for session management.

Your task is to complete the following frontend files:

- `./src/app/add-resource/add-resource.component.ts`
- `./src/app/add-resource/add-resource.component.html`
- `./src/app/booking-details/booking-details.component.ts`
- `./src/app/booking-details/booking-details.component.html`
- `./src/app/create-event/create-event.component.ts`
- `./src/app/create-event/create-event.component.html`
- `./src/app/resource-allocate/resource-allocate.component.ts`
- `./src/app/resource-allocate/resource-allocate.component.html`
- `./src/app/view-events/view-events.component.ts`
- `./src/app/view-events/view-events.component.html`
- `./src/app/login/login.component.ts`
- `./src/app/login/login.component.html`
- `./src/services/http.service.ts`
- `./src/services/auth.service.ts`
- `./src/app/app.component.html`
- `./src/app/registration/registration.component.ts`
- `./src/app/registration/registration.component.html`