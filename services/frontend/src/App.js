import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Game from "./components/game";
import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <Router>
                <h1>ft_transcendence</h1>
                <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Game">Game</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
                <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        ></Route>
                        <Route
                            path="/Game"
                            element={<Game />}
                        ></Route>
                        <Route
                            path="/about"
                            element={<About />}
                        ></Route>
                    </Routes>
                    <p>tes</p>
            </Router>
        );
    }
}

export default App;