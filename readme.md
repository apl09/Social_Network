# Backend Project - Social Network 🚀

<h1>Exploring the Possibilities of Mongoose</h1>

<h3 align="center">TEAM TESTING</h3>

<p align="center">
  <a><strong>Who we are?</strong>
  <br />
  ·
  <a href="https://github.com/apl09">Adrián Pastor</a>
  🤜🏽🤛🏽
  <a href="https://github.com/AdrianRgGit">Adrián Ramírez</a>
  ·
</p>


## Introduction 📜

Greetings! In this backend project, We will be combining my acquired knowledge in the technologies 🛠️ Node.js + Express, along with MongoDB/Mongoose, to create a fabulous API REST for a social network.

## Description 📝

After carefully analyzing the project requirements, We will develop an API REST capable of the following features:

- User registration using Bcrypt for secure storage of passwords 🔒.
- User login with token and middleware authentication 🎫.
- A powerful CRUD system for managing posts 📝.
- Giving and removing Likes from posts 👍👎.
- Deploying the backend in a production environment for availability.

## Essential Project Requirements

To ensure a smooth workflow and deliver an outstanding project,We will adhere to the following indispensable requirements:

- Version control using Git with two main branches: master (or main) and develop.
- An exceptional README presentation, covering all necessary information.

## Technologies Used 💻

For building this marvelous API,We will rely on the following technologies:

- Node.js: A powerful JavaScript runtime environment based on the Chrome V8 engine 🟩.
- Express.js: A fantastic Node.js framework for developing web applications and APIs with ease 🚀.
- MongoDB: An excellent NoSQL database for flexible and scalable data storage 🍃.
- Mongoose: A remarkable Node.js library for object modeling and interaction with MongoDB 🏗️.

## Endpoints 🛣️

Below are some of the endpoints We will be implementing in the API:

### Posts

- `POST /api/posts`: Endpoint for creating a post (authentication required).
- `PUT /api/posts/:id`: Endpoint for updating a post (authentication required).
- `DELETE /api/posts/:id`: Endpoint for deleting a post (authentication required).
- `GET /api/posts`: Endpoint for fetching all posts along with their authors and comments.
- `GET /api/posts/search:name`: Endpoint for searching posts by name.
- `GET /api/posts/:id`: Endpoint for fetching a specific post by ID.
- Validation is implemented while creating a post to ensure all fields are filled (except the image, which is optional).

### Likes

- `POST /api/posts/:id/like`: Endpoint for liking a specific post (authentication required).
- `DELETE /api/posts/:id/like`: Endpoint for unliking a specific post (authentication required).
- Users can unlike a post without having liked it before.
- Only one Like per user is allowed for each post.

### Comments

- `POST /api/posts/:id/comment`: Endpoint for creating a comment on a specific post (authentication required).

### Users

- `POST /api/users/register`: Endpoint for registering a user using bcrypt for secure password storage.
- `POST /api/users/login`: Endpoint for user login using bcrypt + JWT.
- `GET /api/users/me`: Endpoint for fetching information about the currently logged-in user.
- `POST /api/users/logout`: Endpoint for user logout.
- Validation is implemented while creating a user to ensure all fields are filled.

## Extras ✨

In addition to the main requirements, we've gone above and beyond and added these marvelous features:

- Middleware to check comment authorship when editing/deleting comments.
- Usage of the `multer` middleware to attach images when creating or updating posts, comments, and users 📷.
- Implementation of the followers feature, allowing users to follow and unfollow each other 👥.
- Users cannot follow themselves, and they can unfollow without already following.
- The endpoint that fetches information about the user also returns their posts and number of followers.
- Implementation of confirmation email for user registration ✉️.
- Implementation of confirmation email for email recovery.
- Validation in the login process: users must have confirmed their email to log in 📧.
- The endpoint that fetches information about the user, along with their posts and number of followers, also displays the names of the followers.
- The endpoint that fetches all posts also includes information about the users who created the post and the comments, including the users who made the comments.
- Endpoint for searching users by name.
- Endpoint for searching users by ID.
- Error middleware for handling errors in endpoints and providing useful information to users.
- Endpoints that return only useful information.
- Creation of documentation for the project's endpoints.
- Comments CRUD (Create, Read, Update, Delete).
- Likes for comments: ability to like/unlike a comment.

## Deliverables 📦

I will upload the project to a public repository on GitHub and leave the link to the repository attached in Classroom. I ensure a comprehensive README with all necessary information.

Thank you for taking the time to review my README! 😄 If you have any other requests or changes, please let me know. Good luck with your task! 🚀
