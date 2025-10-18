# Project Management Client

## Short Description

A web client for project management built with React + TypeScript and Vite.  
Supports role-based access and project/user management for Admin, Manager, and User roles.

---

## Tech Stack

- **Frontend:** React (TypeScript), Vite
- **Routing:** React Router
- **State Management:** Redux
- **API & Data Fetching:** React Query
- **Styling:** Tailwind CSS
- **Tooling:** ESLint
- **Deployment:** Vercel

---

## Features

### Authentication & Authorization

- Login and logout functionality
- Role-based access (Admin, Manager, User)
- Protected routes with role-specific permissions
- Public routes for login and unauthorized pages

### User Management

- Admin can view, add, edit, and delete users
- Manager can view and edit users (as per permissions)

### Project Management

- Create, edit, and delete projects (role-based)
- Paginated project lists with server side pagination

### Dashboard & Analytics

- Role-based dashboard for Admin and Manager
- Visual representation of project status counts
- User activity statistics

### UI & UX

- Responsive design (mobile-first)
- Reusable components (Buttons, Selects, Modals, Tables)
- Lazy-loaded pages for performance optimization
- Loading spinners and skeletons for asynchronous data
- Error handling pages (`404`, `Unauthorized`, `Error boundary`)

### Additional Feature

- Search and Filter (Projects and Users)

### State Management & API

- Global state management using Redux
- React Query for data fetching and caching

### Development & Tooling

- TypeScript for type safety
- ESLint for code linting
- Vite for fast development and builds
- Environment configuration with `.env` file

### Deployment

- Configured for Vercel deployment

---

## Quickstart

### Prerequisites

- Node.js 18+
- npm
- A `.env` file at the project root (a sample provided as `.env`)

### Install

```bash
npm install

# Developement
npm run dev

# Build
npm run build

# Preview
npm run preview

```

## Live Demo

[View Live Project](https://project-management-portal-client.vercel.app)

## GitHub Repository

[View Source Code](https://github.com/ParveshM/Project-Management-Portal-Client)
