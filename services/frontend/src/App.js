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
import Community from "./components/user/community"
import EditProfile from "./components/user/edit_profile"
import NotFound from "./components/notfound";

import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfilePic from "./components/user/getProfilePic";


class App extends Component {
  render() {
      const token = sessionStorage.getItem('authtoken')
      const user = JSON.parse(sessionStorage.getItem('user'))
      const isLoggedIn = !!token;

      return (
          <Router>
            <div class="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
                <div class="bg-dark p-4">
                    <h5 class="text-body-emphasis h4">Collapsed content</h5>
                    <span class="text-body-secondary">Toggleable via the navbar brand.</span>
                </div>
            </div>
              <Navbar bg="dark" variant="dark">
                  <Container>
                      <Nav className="me-auto">
                      <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                        <Nav.Link as={Link} to="/Game">Game</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        {isLoggedIn &&<Nav.Link as={Link} to="/community">Community</Nav.Link>}
                        {!isLoggedIn && <Nav.Link as={Link} to="/signup">Signup</Nav.Link>}
                        {!isLoggedIn && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                        {/* {isLoggedIn && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>} */}
                        {isLoggedIn && <Nav.Link as={Link} to="/logout">Logout</Nav.Link>}
                      </Nav>
                        {isLoggedIn && <Nav.Link as={Link} to="/profile">
                        {user && user.profile_pic &&
                        <ProfilePic />
                        }
                        </Nav.Link>}
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
                  <Route path="/community" element={<Community />} />
                  <Route path="/edit_profile" element={<EditProfile />} />
                  <Route path="/*" element={<NotFound />} />
              </Routes>
          </Router>
      );
  }
}

export default App;