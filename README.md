# Lending System

A web-based platform that enables users to lend and borrow items using a credit-based system. This project is built with React for the frontend, Spring Boot for the backend, and MongoDB as the database.

## Overview

The Lending System allows users to:
- Register and gain initial 100 credits
- Add personal items to the lending marketplace and gain 100 credits for every items added.
- Borrow items from other users using credits
- Manage lending contracts
- Download contract PDFs
- Search for available items

## Tech Stack

### Frontend
- **React**: Single Page Application (SPA) architecture with routing
- Key features:
  - User authentication (login/logout/signup)
  - Profile management
  - Item search functionality
  - Contract management and PDF download
  - Responsive item display using cards

### Backend
- **Spring Boot**: RESTful API services with MVC architecture
- **Security**:
  - JWT (JSON Web Token) authentication
  - BCrypt password encryption
- **Scheduled Tasks**: Automatic contract management and cleanup

### Database
- **MongoDB**: NoSQL database for storing user data, items, and contracts

## Features

### User Management
- User registration with initial 100 credits
- Secure login using JWT authentication
- Profile management (update email and password)
- Credit-based transaction system

### Item Management
- Add personal items to the lending system
- View and update user's own items
- Search functionality to find items by name
- Items owned by the current user are hidden from their home page view

### Contract System
- Automatic contract creation when items are borrowed
- Contract viewing through "My Contracts" section
- PDF generation and download functionality
- Automatic contract expiration and cleanup using scheduled tasks

## Application Flow

1. User registers and receives 100 initial credits
2. User can add items to the system (increasing their available credits)
3. Users can search and borrow items from other users
4. When an item is borrowed:
   - A contract is created between lender and borrower
   - Credits are transferred from borrower to lender
5. Contracts are managed automatically:
   - Users can view active contracts
   - Contracts are automatically removed upon expiration
   - Contract PDFs can be downloaded for record-keeping

## Security Features

- JWT token-based authentication
- CSRF disabled
- Encrypted passwords using BCrypt
- Protected routes requiring authentication
- Secure API endpoints

## System Architecture

The application follows a classic MVC (Model-View-Controller) pattern:
- **Model**: MongoDB document schemas
- **View**: React components
- **Controller**: Spring Boot REST controllers
- **repo**: Handles the database repository.

## Installation and Setup

### Prerequisites
- Node.js and npm
- Java JDK 8 or higher
- Maven
- MongoDB

### Frontend Setup
```bash
# Clone the repository
git clone [repository-url]

# Navigate to frontend directory
cd LendingSystem/frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Backend Setup
```bash
# Navigate to backend directory
cd LendingSystem/backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

### MongoDB Setup
1. Install MongoDB
2. Create a database named 'lending_system'
3. Configure connection in `application.properties`

### API Endpoints
- Authentication
Base URL: `http://localhost:8080`

- `POST /addUser` - Register new user
- `POST /login` - Authenticate user and get JWT token

**User Management**
Base URL: `http://localhost:8080`

- `GET /user` - Get all users
- `PUT /updateUser/{userId}` - Update user details
- `GET /csrf` - Get CSRF token

**Item Management**
Base URL: `http://localhost:8080/itemContract`

- `POST /addItem/{ownerId}` - Add new item
- `GET /items` - Get all available items
- `GET /myItems/{ownerId}` - Get user's items
- `PUT /updateItem/{itemId}` - Update item

**Contract Management**
Base URL: `http://localhost:8080/itemContract`

- `POST /addContract/{borrowerId}/{itemId}/{startDate}/{endDate}` - Create new contract
- `GET /myContracts/{userId}` - Get user's contracts

## Future Enhancements
- Rating system for users and items
- In-app notifications
- Advanced search filters
- Payment gateway integration
- Community features and social sharing