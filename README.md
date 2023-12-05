# Post It Web App

Post It is a simple web application built using Node.js, Express.js, and EJS templates. It allows users to post images (in the form of URLs) along with captions. The project is connected to a MySQL database hosted on Clever Cloud and deployed on Render. The website features user authentication for a secure and personalized experience.

## Tech Stack

- Node.js
- Express.js
- EJS (HTML, CSS, JavaScript)
- MySQL
- Clever Cloud (for database hosting)
- Render (for deployment)

## Features

- Image posting with captions
- User authentication
- Database connectivity for storing user and post data

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/Vortex-21/InstaProject.git

2. Navigate to the InstaProject Folder and Install the dependencies

    ```bash
      cd InstaProject
      npm install

3. Create a .env file in the root directory and include your database credentials:
    ```bash
      HOST=your-database-host
      USER=your-database-user
      PASSWORD=your-database-password
      DATABASE=your-database-name
4. Run the Application: 
    ```bash
     node index.js
5. Open your browser and visit `http://localhost:3000` to access the Post It web app.
6. Deployment
   The project is deployed on Render. Visit `https://post-it-v2.onrender.com/posts` to see the live version of the application.
