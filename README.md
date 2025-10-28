# ROLE BASED ACCESS SYSTEM – MERN Stack Application

## Project Overview
This project was developed as part of the **NextAstra Technologies – Jr. Full Stack Developer** assignment.  
It demonstrates a basic authentication flow and secure backend API using the **MERN (MySQL, Express, React, Node)** stack.  

The backend is fully implemented, and the frontend currently includes login functionality. Further frontend features can be extended in the future.

## Tech Stack
- **Frontend:** React, Axios, React Router  
- **Backend:** Node.js, Express  
- **Database:** MySQL  
- **Authentication:** JWT (JSON Web Token)  
- **Password Security:** bcrypt  

## Features Implemented
- User authentication (login & JWT-based token validation)  
- Protected routes using middleware  
- Password hashing with bcrypt  
- RESTful API endpoints for authentication  
- Error handling and validation
- Create roles and assign module-level permissions (Read, Create, Update, Delete).
- Role-specific dashboard showing only authorized modules. 
 
## How to Run

### 1. Clone the Repository
```bash
git clone <your-repo-link>
```

### 2. Backend Setup
```bash
cd server
npm install
```

#### create a .env file inside server folder:
```bash
PORT=Port number
DATABASE_NAME= Your database name
DATABASE_USER= username
DATABASE_PASSWORD= Password of your database
SECRET_KEY= Key for JWT
ADMIN_NAME= Admin Name
ADMIN_PASSWORD= Admin Password
ADMIN_EMAIL= Email ID of Admin.
```

#### Start the backend server
```bash
node server
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
#### create a .env file inside client folder 
```bash
VITE_USER_API=user api
```

## Author
### Rakesh Bhati
MERN Stack Developer


