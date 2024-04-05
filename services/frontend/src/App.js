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

import Login from "./components/user/auth"
import Profile from "./components/user/profile"
import Signup from "./components/user/signup";

import NotFound from "./components/notfound";

import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './components/favicon.ico'

class App extends Component {
  render() {
      
      const username = localStorage.getItem('username')
      return (
          <Router>
              <Navbar bg="dark" variant="dark">
                  <Container>
                      <Nav className="me-auto">
                      <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                          <Nav.Link as={Link} to="/Game">Game</Nav.Link>
                          <Nav.Link as={Link} to="/about">About</Nav.Link>
                          {username ? (
                              <>
                                  <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                              </>
                          ) : (
                              <>
                                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                  <Nav.Link as={Link} to="/signup">signup</Nav.Link>
                              </>
                          )}
                      </Nav>
                          Hello {username} :)
                  </Container>
              </Navbar>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Game" element={<Game />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/*" element={<NotFound />} />
              </Routes>
          </Router>
      );
  }
}

export default App;