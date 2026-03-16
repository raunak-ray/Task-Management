# Team Task Manager API

A simple REST API for managing team tasks built with **Node.js, Express, TypeScript, and MongoDB**.

This project was developed as part of the **Collabzz Backend Developer Intern Take-Home Assignment**.

The API provides authentication using JWT and allows authenticated users to create and manage tasks with proper access control.

---

# Features

### Authentication

- Register new users
- Login with email and password
- Password hashing using **bcrypt**
- Authentication using **JWT**

### Task Management

- Create tasks
- Get all tasks (with optional status and title filtering)
- Get task by ID
- Update tasks
- Delete tasks

### Authorization Rules

- Only the **task creator** can update or delete a task
- **Admin users** can manage all tasks

---

# Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt password hashing

---

# Project Structure

```
src
 ├── controllers
 │    auth.controller.ts
 │    task.controller.ts
 │
 ├── middleware
 │    auth.middleware.ts
 |    logger.middleware.ts
 |    error.middleware.ts
 │
 ├── models
 │    user.model.ts
 │    task.model.ts
 │
 ├── routes
 │    auth.routes.ts
 │    task.routes.ts
 │
 ├── lib
 │    AppError.ts
 │    sendResponse.ts
 │    jwtToken.ts
 │
 ├── config
 │    db.ts
 └── server.ts
```

---

# Environment Variables

Create a `.env` file in the root directory:

```
PORT=5500
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# Installation

Clone the repository:

```
git clone <https://github.com/raunak-ray/Task-Management>
cd project
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Server will run at:

```
http://localhost:5500
```

---

# Authentication

## Register User

POST `/auth/register`

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Login User

POST `/auth/login`

Example request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response includes JWT token.

---

# Protected Routes

All task routes require a valid JWT token.

Include the token in request headers:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Task API

## Create Task

POST `/tasks`

```
{
  "title": "Build API",
  "description": "Implement task CRUD endpoints",
  "status": "todo",
  "assignedTo": "<userId>"
}
```

---

## Get All Tasks

GET `/tasks`

Optional filter:

```
/tasks?status=todo
/tasks?title=Title
```

---

## Get Task by ID

GET `/tasks/:id`

---

## Update Task

PUT `/tasks/:id`

```
{
  "status": "in-progress"
}
```

---

## Delete Task

DELETE `/tasks/:id`

---

# Task Status Rules

Allowed values:

```
todo
in-progress
done
```

---

# Admin Test Account

An admin user has been created directly in the database to demonstrate **role-based access control**.

Admin credentials:

```
Email: admin@gmail.com
Password: 12345678
```

Admin users can:

- View all tasks
- Update any task
- Delete any task

---

## Postman Collection

A Postman collection is available to test all API endpoints.

You can access it here:

[Postman Collection Link](https://raunakray3260-7724701.postman.co/workspace/d113eaea-ce12-4d16-97db-0bef77f48bef)

### Steps to Test the API

1. Open the Postman workspace link above.
2. Set the `baseUrl` variable (example: `http://localhost:5500`).
3. Run the **Login** request to obtain a JWT token.
4. Add the token to protected requests using the header:

```
Authorization: Bearer <JWT_TOKEN>
```

All `/tasks` routes require a valid JWT token.
