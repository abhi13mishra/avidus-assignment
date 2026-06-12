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

### User Features

* Create Task
* View Own Tasks
* Update Own Tasks
* Delete Own Tasks

### Activity Logs

* User Login
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

## Installation

```bash
git clone https://github.com/abhi13mishra/avidus-assignment.git

cd backend

npm install

npm run dev
```

## Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## API Endpoints

### Auth

* POST /api/auth/register
* POST /api/auth/login

### Admin

* GET /api/admin/users
* PATCH /api/admin/users/:id/status
* DELETE /api/admin/users/:id
* GET /api/admin/tasks
* DELETE /api/admin/tasks/:id
* GET /api/admin/logs

### Tasks

* POST /api/tasks
* GET /api/tasks
* PUT /api/tasks/:id
* DELETE /api/tasks/:id

```
```
