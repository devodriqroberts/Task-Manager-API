
# Task Manager API

This project was built as part of **Andrew Mead's The Complete Node.js Developer Course (3rd Edition)**. It demonstrates how to create a task management system using **Node.js**, with features for user authentication, task creation, and data management. The app showcases modern Node.js development practices, including **Express**, **MongoDB**, and **JWT authentication**.

## Features

- **User Authentication**: Secure user authentication using **JWT tokens** and password hashing with **bcryptjs**
- **CRUD Operations**: Full **CRUD** functionality (Create, Read, Update, Delete) for managing user tasks and profiles
- **File Upload**: Profile picture uploads using **Multer** and file validation
- **Data Validation**: Input validation using **Validator.js** to ensure data integrity
- **RESTful API**: Built using **Express** with organized routes and middleware for error handling and validation

## Project Setup

### Prerequisites

- **Node.js** and **npm** installed
- **MongoDB** installed locally or a cloud instance (e.g., MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/devodriqroberts/Task-Manager-API.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-manager-api
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project and set the following environment variables:

   ```bash
   PORT=3000
   JWT_SECRET=your-jwt-secret
   MONGODB_URL=mongodb://localhost:27017/task-manager-api
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

### API Endpoints

- **POST** `/users`: Register a new user
- **POST** `/users/login`: Authenticate a user and get a JWT token
- **POST** `/tasks`: Create a new task
- **GET** `/tasks`: Get all tasks for the authenticated user
- **PATCH** `/tasks/:id`: Update a specific task
- **DELETE** `/tasks/:id`: Delete a specific task

### Authentication

This API uses **JWT tokens** for authentication. After logging in, include the token in the `Authorization` header as `Bearer <token>` to access protected routes.

### File Uploads

The API allows users to upload profile pictures using **Multer**. Files are stored locally, and validation is performed to ensure correct file types and sizes.

## Testing

You can run automated tests using **Jest** and **Supertest**:

```bash
npm run test
```

## Technologies Used

- **Node.js** and **Express**: Backend framework and HTTP request handling
- **MongoDB** and **Mongoose**: Database and ORM for managing tasks and users
- **JWT**: Token-based authentication
- **Multer**: File uploads
- **bcryptjs**: Password hashing
- **Jest** and **Supertest**: Testing

## Acknowledgments

This project was built as part of **Andrew Mead's The Complete Node.js Developer Course (3rd Edition)**, which provides a comprehensive introduction to building full-stack Node.js applications.

## License

This project is licensed under the MIT License.

