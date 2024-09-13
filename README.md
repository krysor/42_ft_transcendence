# Ft_transcendence (Full-Stack Pong Tournament)

![42](https://img.shields.io/badge/School-42-black?style=flat-square&logo=42)

Ft_transcendence is a full-stack web application that provides a platform for users to engage in online tournaments and games. It features a variety of games, including Pong and Tic-Tac-Toe, and allows users to participate in tournaments, track their scores, and interact with other players.

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

Ft_transcendence aims to provide an immersive and engaging gaming experience for users of all skill levels. Whether you're a casual gamer or a competitive player, Ft_transcendence offers a variety of challenges and opportunities to showcase your skills. The project's key features include:

- User authentication and profile management
- Online multiplayer games (Pong and Tic-Tac-Toe)
- Tournament mode with matchmaking and leaderboards
- Real-time gameplay with smooth animations and responsive controls
- Social features like friend lists and chat functionality
- Customizable game settings and difficulty levels

## How to Run the Project

To run the Ft_transcendence project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/krysor/42_ft_transcendence.git`
2. Navigate to the project directory: `cd 42_ft_transcendence)`
3. Install the required dependencies:
   - For the backend: `cd services/backend && pip install -r requirements.txt`
   - For the frontend: `cd services/frontend && npm install`
4. Set up the database:
   - Create a new PostgreSQL database
   - Update the database credentials in `services/backend/project/project/settings.py`
5. Run the backend server: `cd services/backend/project && python manage.py runserver`
6. In a separate terminal, run the frontend development server: `cd services/frontend && npm start`
7. Open your web browser and visit `http://localhost:3000` to access the application.

To run the tests:

- For the backend: `cd services/backend/project && python manage.py test`
- For the frontend: `cd services/frontend && npm test`

## Project Structure

```
42_ft_transcendence
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
│       │   └── skybox/
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

The project is structured into two main directories: `services/backend` and `services/frontend`. The backend is built using Django and Python, while the frontend is built with React and JavaScript.

The `services/backend/project` directory contains the Django project, including the authentication, score, and tournament apps. The `services/frontend/src/components` directory contains the React components for various features like games, tournaments, and user management.

## Main Features

- **User Authentication**: Users can sign up, log in, and manage their profiles. Authentication is handled securely using Django's built-in authentication system and JSON Web Tokens (JWT) for stateless authentication.

- **Online Games**: Users can play Pong and Tic-Tac-Toe games against other players or an AI opponent. The games are built using Three.js for smooth 3D rendering and animations.

- **Tournament Mode**: Users can participate in tournaments for Pong and Tic-Tac-Toe. The tournament system includes matchmaking, leaderboards, and real-time score tracking.

- **Social Features**: Users can add friends, view their profiles, and interact with other players through a community page.

- **Responsive Design**: The application is designed to be responsive and accessible across different devices and screen sizes.

## Front-end Logic

The front-end of Ft_transcendence is built using React, a popular JavaScript library for building user interfaces. The application follows a component-based architecture, with each feature or functionality encapsulated in reusable components.

The `components` directory contains various subdirectories for different parts of the application, such as `game`, `morpion` (Tic-Tac-Toe), `tournament`, and `user`. These components handle rendering, user interactions, and state management.

The Three.js library is used to render the 3D games, such as Pong, with smooth animations and realistic physics. The game logic and controls are implemented using JavaScript and React hooks.

The front-end also utilizes React Router for client-side routing and i18next for internationalization and localization support.

## Back-end Logic

The back-end of Ft_transcendence is built using Django, a high-level Python web framework. The project follows the Model-View-Template (MVT) architectural pattern, with the models, views, and templates separated into different directories.

The `authentication` app handles user authentication, registration, and profile management. It uses Django's built-in authentication system and includes models for storing user data, such as usernames, passwords, and profile pictures.

The `score` app manages the scoring system for games and tournaments. It includes models for storing game scores, match histories, and leaderboard data.

The `tournament` app handles the tournament functionality, including matchmaking, bracket generation, and real-time score tracking.

The back-end communicates with the front-end through a RESTful API built using Django REST Framework. The API endpoints are defined in the `views.py` files within each app.

The project uses PostgreSQL as the database management system to store user data, game scores, and tournament information.

## Contribution Guidelines

We welcome contributions from the community! If you'd like to contribute to the Ft_transcendence project, please follow these guidelines:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and ensure that the code follows the project's coding conventions and style guidelines.
3. Write tests for your changes and ensure that all existing tests pass.
4. Update the documentation if necessary.
5. Submit a pull request with a detailed description of your changes.

Please note that all contributions are subject to review, and we may request changes or additional improvements before merging.

## Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [React Documentation](https://reactjs.org/docs/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Django REST Framework Documentation](https://www.django-rest-framework.org/)

## Contact Information

If you have any questions, suggestions, or need further assistance, please feel free to reach out to us:

- Email: [your-email@example.com](mailto:your-email@example.com)
- Twitter: [@yourusername](https://twitter.com/yourusername)
- GitHub: [https://github.com/krysor/42_ft_transcendence](https://github.com/krysor/42_ft_transcendence)
```

This README provides a comprehensive overview of the Ft_transcendence project, including its features, structure, technologies used, and guidelines for contributing. It covers both the front-end and back-end components, as well as instructions for running the project locally and additional resources for further learning.

Feel free to modify and customize this README as needed to better fit your project's specific requirements and details.
