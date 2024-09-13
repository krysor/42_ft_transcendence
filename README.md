# Ft_transcendence - Fun Transcending Time

![42](https://img.shields.io/badge/School-42-black?style=flat-square&logo=42)

Ft_transcendence is a full-stack web application that combines the joy of classic games with the power of modern web technologies. Whether you're a seasoned gamer or just looking for a fun way to pass the time, Ft_transcendence offers a unique and engaging experience.

## Table of Contents

- [Project Overview](#project-overview)
- [How to Run the Project](#how-to-run-the-project)
- [Project Structure](#project-structure)
- [Main Features](#main-features)
- [Front-end Logic](#front-end-logic)
- [Back-end Logic](#back-end-logic)
- [Contribution Guidelines](#contribution-guidelines)
- [Additional Resources](#additional-resources)
- [Contact Information](#contact-information)

## Project Overview

Ft_transcendence is a gaming platform that brings together a collection of classic games, including Pong, Tic-Tac-Toe (Morpion), and more. The project aims to provide a nostalgic and immersive gaming experience while leveraging modern web technologies for seamless gameplay and user interactions.

Key features of Ft_transcendence include:

- **Classic Games**: Enjoy timeless games like Pong and Tic-Tac-Toe (Morpion) in a modern web environment.
- **Multiplayer**: Challenge your friends or other players in exciting multiplayer matches.
- **Leaderboards**: Track your progress and compete against others on global leaderboards.
- **User Profiles**: Create and customize your user profile, track your game statistics, and connect with friends.
- **Responsive Design**: Enjoy a seamless gaming experience across various devices and screen sizes.

Ft_transcendence is designed for gamers of all ages and skill levels, providing a nostalgic and engaging gaming experience that transcends time.

## How to Run the Project

To run the Ft_transcendence project locally, follow these steps:

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/Ft_transcendence.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Ft_transcendence
   ```

3. Build and start the containers:

   ```bash
   docker-compose up --build
   ```

   This command will build the necessary Docker images and start the containers for the backend, frontend, and database.

4. Access the application:

   - Frontend: Open your web browser and navigate to `http://localhost:3000`.
   - Backend: The backend API will be available at `http://localhost:8000`.

### Running Tests

To run the tests for the project, use the following command:

```bash
# Run frontend tests
npm test --prefix services/frontend

# Run backend tests
python manage.py test --settings=project.settings services/backend/project
```

## Project Structure

The project follows a standard structure for a Django and React-based web application:

```
Ft_transcendence
├── docker-compose.yml
├── .git/
├── services/
│   ├── backend/
│   │   ├── media/
│   │   ├── project/
│   │   │   ├── authentication/
│   │   │   ├── project/
│   │   │   ├── score/
│   │   │   ├── tournament/
│   │   │   ├── manage.py
│   │   │   └── ...
│   │   └── ssl/
│   └── frontend/
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   │   ├── game/
│       │   │   ├── morpion/
│       │   │   ├── tournament/
│       │   │   ├── user/
│       │   │   └── ...
│       ├── serv_config.js
│       └── ...
└── ...
```

- `docker-compose.yml`: Docker Compose configuration file for setting up the project's containers.
- `services/backend/`: Django backend application.
  - `media/`: Directory for storing user-uploaded media files.
  - `project/`: Django project directory containing apps, settings, and other configuration files.
    - `authentication/`: Django app for user authentication and management.
    - `score/`: Django app for handling game scores and leaderboards.
    - `tournament/`: Django app for managing tournaments and matchmaking.
    - `manage.py`: Django's command-line utility for administrative tasks.
  - `ssl/`: Directory for storing SSL certificates (if needed).
- `services/frontend/`: React frontend application.
  - `public/`: Directory for static files.
  - `src/`: Source code directory.
    - `components/`: React components for different parts of the application.
      - `game/`: Components related to the game logic and rendering.
      - `morpion/`: Components for the Tic-Tac-Toe (Morpion) game.
      - `tournament/`: Components for managing tournaments and matchmaking.
      - `user/`: Components for user authentication, profiles, and community features.
  - `serv_config.js`: Configuration file for the frontend server.

## Main Features

### Classic Games

Ft_transcendence offers a collection of classic games, including:

- **Pong**: The iconic arcade game where players control paddles and try to keep the ball in play.
- **Tic-Tac-Toe (Morpion)**: The timeless game of strategy and wit, where players take turns placing X's and O's on a 3x3 grid.

### Multiplayer

Challenge your friends or other players in exciting multiplayer matches. Ft_transcendence supports both real-time multiplayer and asynchronous gameplay, allowing you to compete with players from around the world.

### Leaderboards

Track your progress and compete against other players on global leaderboards. Climb the ranks and showcase your skills to the community.

### User Profiles

Create and customize your user profile, track your game statistics, and connect with friends. Share your achievements, view your match history, and stay up-to-date with your gaming progress.

### Responsive Design

Ft_transcendence is designed with a responsive and modern user interface, ensuring a seamless gaming experience across various devices and screen sizes, from desktops to mobile devices.

## Front-end Logic

The Ft_transcendence frontend is built using React, a popular JavaScript library for building user interfaces. The frontend follows a component-based architecture, allowing for modular and reusable code.

Key technologies and libraries used in the frontend include:

- **React**: The core library for building the user interface.
- **React Router**: For handling client-side routing and navigation.
- **Three.js**: A powerful 3D graphics library used for rendering the Pong game.
- **Bootstrap**: A popular CSS framework for responsive and modern UI design.
- **i18next**: A library for internationalization and localization, supporting multiple languages.

The frontend components are organized into different directories based on their functionality, such as `game`, `morpion`, `tournament`, and `user`. This structure promotes code organization and maintainability.

## Back-end Logic

The Ft_transcendence backend is built using Django, a high-level Python web framework. The backend follows the Model-View-Template (MVT) architectural pattern and is responsible for handling data processing, authentication, and API endpoints.

Key technologies and frameworks used in the backend include:

- **Django**: The core web framework for building the backend application.
- **Django REST Framework**: For creating RESTful APIs and handling HTTP requests.
- **PostgreSQL**: The relational database management system used for storing application data.
- **Django Channels**: For enabling real-time communication and multiplayer functionality.

The backend consists of several Django apps, each responsible for a specific part of the application:

- `authentication`: Handles user authentication, registration, and profile management.
- `score`: Manages game scores, leaderboards, and match history.
- `tournament`: Handles tournament management, matchmaking, and multiplayer functionality.

The backend follows best practices for security, scalability, and maintainability, ensuring a robust and efficient server-side implementation.

## Contribution Guidelines

We welcome contributions from the community to enhance Ft_transcendence and make it even better. If you'd like to contribute, please follow these guidelines:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and ensure that the code follows the project's coding style and conventions.
3. Write tests for your changes and ensure that all existing tests pass.
4. Update the documentation if necessary.
5. Submit a pull request with a clear description of your changes and the problem they solve.

For more detailed contribution guidelines, please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## Additional Resources

- [Ft_transcendence Documentation](https://your-repo.github.io/Ft_transcendence/docs)
- [Django Documentation](https://docs.djangoproject.com/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Three.js Documentation](https://threejs.org/docs/)

## Contact Information

If you have any questions, suggestions, or need further assistance, please feel free to reach out to us:

- Email: [support@Ft_transcendence.com](mailto:support@Ft_transcendence.com)

We appreciate your interest in Ft_transcendence and look forward to your contributions!
