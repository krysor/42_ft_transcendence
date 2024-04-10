import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import Home from "./components/home";
import About from "./components/about";

import Game from "./components/game/game";

import Login from "./components/user/login";
import Profile from "./components/user/profile";
import Signup from "./components/user/signup";
import Logout from "./components/user/logout";

import NotFound from "./components/notfound";

import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
      
      const token = localStorage.getItem('authtoken')
      const isLoggedIn = !!token;
      return (
          <Router>
              <Navbar bg="dark" variant="dark">
                  <Container>
                      <Nav className="me-auto">
                      <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                        <Nav.Link as={Link} to="/Game">Game</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        {!isLoggedIn && <Nav.Link as={Link} to="/signup">Signup</Nav.Link>}
                        {!isLoggedIn && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                        {isLoggedIn && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
                        {isLoggedIn && <Nav.Link as={Link} to="/logout">Logout</Nav.Link>}
                      </Nav>
                  </Container>
              </Navbar>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Game" element={<Game />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/*" element={<NotFound />} />
              </Routes>
          </Router>
      );
  }
}

export default App;