
# Interview Experiences Application

## Objective

Build aInterview Experiences  Application where users can:

- **Upload** their interview experiences.
- **View** their and everyone interview experiences.
- **Edit** their experiences.
- **Delete** their experiences.
- **Authentication** is secured by **JWT & bcrypt**

The application includes user authentication, allowing users to manage only their products securely.

---

## Features

### Functionalities

```plaintext
1. User Authentication
   - Sign up and log in to access the application secured by JWT & bcrypt.

2. Interview Experiences
   - Add their experiences:
     - name, country,company, questions.
   - View a list of all experiences created by the logged-in user.
   - Update experience details.
   - Delete submissions.

3. Detailed View
   - View experiences of all users.

4. Sign Up / Login Page
   - Enable user registration and login.

6. Pagination
   - Enabled pagination while listing all data.

```
---
## API Endpoints

### 1. POST /users/signup
   - Create a new user.

### 2. POST /users/login
   - Authenticate a user and provide access.

### 3. POST /submission
   - Create a new experience.

### 4. GET /all_submissions
   - Retrieve a list of all submissions.

### 5. GET /user_submissions
   - Retrieve a list of all loggedin user submissions.

### 6. POST /cars/:id
   - Update the details of a specific submission by loggedin user (name, country,company,question).

### 7. DELETE /user_submissions/:id
   - Delete a specific submission.

---
---

## Technologies Used

### 1. Backend:
   - NodeJs
   - MongoDB (Database)
   - 
### 2. Frontend:
   - React.js

### 3. Postman
   - API Testing

---
---




## Thankyou

