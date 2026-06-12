# Avidus Assignment - Task Management System

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Role Based Access Control (Admin/User)

### Admin Features

* View All Users
* Update User Status
* Delete Users
* View All Tasks
* Delete Any Task
* View Activity Logs
* Analytics Dashboard

### User Features

* Create Task
* View Own Tasks
* Update Own Tasks
* Delete Own Tasks
* Mark Task as Completed/Pending

### Activity Logs

* Login Activity
* Task Creation
* Task Update
* Task Deletion

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

### Frontend

* React.js
* React Router DOM
* Axios
* CSS Modules

## Installation

```bash
git clone https://github.com/abhi13mishra/avidus-assignment.git

cd backend

npm install

npm run dev
```

## Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## API Endpoints

### Auth APIs

* POST /api/auth/register
* POST /api/auth/login

### Admin APIs

* GET /api/admin/users
* PATCH /api/admin/users/:id/status
* DELETE /api/admin/users/:id
* GET /api/admin/tasks
* DELETE /api/tasks/:id
* GET /api/admin/logs

### Task APIs

* POST /api/tasks
* GET /api/tasks
* PUT /api/tasks/:id
* DELETE /api/tasks/:id

## Project Status

### Backend

 Completed

### Frontend

 Completed

## Implemented Features

### User Dashboard

* Create Task
* View Tasks
* Update Task
* Delete Task
* Mark Complete/Pending

### Admin Dashboard

* Analytics Cards
* User Management
* Task Monitoring
* Activity Logs

### Security

* Protected Routes
* Admin Protected Routes
* JWT Authentication
* Role Based Authorization
