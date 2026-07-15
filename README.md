# Smart Complaint & Service Management Portal

A full-stack, comprehensive web application designed to automate complaint registration, service request tracking, employee assignment, and status monitoring.

## Overview
Many organizations manage customer complaints manually through emails and spreadsheets, resulting in delayed responses and poor tracking. This system provides a centralized digital solution where:
- **Customers** can register complaints online and track real-time status.
- **Support Agents** are assigned to complaints and can update resolution remarks.
- **Admins** manage the overall system, oversee all users, and re-assign complaints dynamically.

## Technology Stack
The project is divided into two distinct parts:
1. **Frontend**: React + Vite with Tailwind CSS
2. **Backend**: Spring Boot + Java 17 with MySQL and Spring Security (JWT)

## Getting Started

### 1. Database Setup
Ensure you have MySQL installed and running on port 3306. Create the database:
```sql
CREATE DATABASE smart_complaint_db;
```

### 2. Backend Setup
Navigate to the backend directory, configure your environment variables, and start the Spring Boot application.
```bash
cd "Smart Backend"
cp .env.example .env

# Edit .env with your MySQL credentials

./mvnw spring-boot:run
```
The API server will start on `http://localhost:8081`.

### 3. Frontend Setup
In a new terminal window, navigate to the frontend directory, install dependencies, and start the Vite dev server.
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
The web app will start on `http://localhost:5173`.

### 4. Default Accounts
When the backend runs for the first time, it automatically creates an admin account:
- **Email**: `admin@test.com`
- **Password**: `password`

## Project Architecture
- **JWT Authentication**: Secured endpoints utilizing stateless JWT tokens.
- **Responsive UI**: Tailwind CSS makes the dashboard completely mobile responsive.
- **Role-Based Access Control**: Different dashboards and permissions for `CUSTOMER`, `AGENT`, and `ADMIN`.

*Please see the individual README.md files inside the `frontend` and `Smart Backend` directories for more technical details.*
# Smart-Complaint-Service-Management
