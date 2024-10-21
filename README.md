# Event Management Platform

## Overview
Developed an event management platform using Spring Boot for the backend, Angular for the frontend, and MySQL for database management. The application features a layered architecture, ensuring a modular and scalable system.

## Features
- **User Registration and Profile Management:** Allows users to register, manage their profiles, and update their information securely.
- **Event Scheduling and Management:** Enables users to schedule, manage, and track events effortlessly.
- **Resource Allocation:** Efficiently allocates resources based on event requirements.
- **Real-Time Updates and Communication:** Provides a client interaction interface for real-time updates and communication.
- **Secure Data Handling and Role-Based Authentication:** Utilizes Spring Security and JWT for secure data handling and authentication.

## Technologies Used
- **Backend:** Spring Boot
- **Frontend:** Angular
- **Database:** MySQL
- **Security:** Spring Security, JWT

## Installation and Setup
1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/event-management-platform.git
    ```
2. **Backend Setup:**
    - Navigate to the `backend` directory:
        ```bash
        cd backend
        ```
    - Update the MySQL database configuration in `application.properties`.
    - Build and run the backend application:
        ```bash
        mvn clean install
        mvn spring-boot:run
        ```
3. **Frontend Setup:**
    - Navigate to the `frontend` directory:
        ```bash
        cd frontend
        ```
    - Install the required dependencies:
        ```bash
        npm install
        ```
    - Run the Angular application:
        ```bash
        ng serve
        ```

## Testing
Conducted thorough testing to ensure the application's reliability, security, and scalability.

## Contributing
Feel free to submit issues or pull requests for improvements. Contributions are welcome!

<!--
## License
This project is licensed under the MIT -->
