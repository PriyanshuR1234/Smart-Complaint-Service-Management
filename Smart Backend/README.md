# Smart Complaint & Service Management - Backend

This is the backend REST API for the Smart Complaint & Service Management Portal. It is built using Java 17 and Spring Boot.

## Technology Stack
- **Framework**: Spring Boot 3.x
- **Language**: Java 17
- **Database**: MySQL
- **ORM**: Spring Data JPA / Hibernate
- **Security**: Spring Security & JWT (JSON Web Tokens)
- **Build Tool**: Maven

## Prerequisites
- Java Development Kit (JDK) 17 or higher
- MySQL Server running locally on default port 3306
- Maven (optional, wrapper is included)

## Configuration
1. Create a MySQL database named `smart_complaint_db`.
   ```sql
   CREATE DATABASE smart_complaint_db;
   ```
2. Copy the `.env.example` file to `.env` in the root of the backend folder.
   ```bash
   cp .env.example .env
   ```
3. Update the `.env` file with your actual MySQL credentials and JWT secret key.

## Running the Application
To run the backend server locally, use the Maven wrapper from the root of the backend directory:

```bash
# Mac/Linux
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

The server will start on `http://localhost:8081`.

## API Documentation
The API provides endpoints for:
- Authentication (`/api/auth/**`)
- User Profile Management (`/api/users/**`)
- Complaints Management (`/api/complaints/**`)
- Admin Operations (`/api/admin/**`)

## Default Admin Credentials
When the application starts, it automatically seeds an admin user if it doesn't exist:
- **Email**: `admin@test.com`
- **Password**: `password`
