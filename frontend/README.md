# Smart Complaint & Service Management - Frontend

This is the frontend client for the Smart Complaint & Service Management Portal. It provides an intuitive, responsive user interface for customers to raise complaints and for admins to manage them.

## Technology Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM (v6)
- **State/Auth**: React Context API
- **HTTP Client**: Axios
- **Icons**: React Icons (Feather Icons)

## Prerequisites
- Node.js (v18 or higher)
- npm (Node Package Manager)

## Configuration
1. Make sure you are in the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the `.env.example` file to `.env` (this is ignored by Git to keep your settings safe).
   ```bash
   cp .env.example .env
   ```
   *By default, it will expect the backend to be running on `http://localhost:8081`.*

## Running the Application
To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

## Building for Production
To build the application for production deployment:
```bash
npm run build
```
The optimized build artifacts will be placed in the `dist` directory.

## Project Structure
- `/src/components` - Reusable UI components (Modals, Protected Routes, etc.)
- `/src/context` - React Context providers (AuthContext)
- `/src/layouts` - Layout wrappers (DashboardLayout, AuthLayout, etc.)
- `/src/pages` - Main page views (Login, Dashboard, Profile, etc.)
