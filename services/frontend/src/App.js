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
import Login from "./components/auth"
import NotFound from "./components/notfound";
import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './components/favicon.ico'

class App extends Component {
    render() {
        return (
            <Router>
                {
					<nav id="hellnawh" class="navbar navbar-default">
						<div class="container-fluid">
							<div class="navbar-header">
								<a class="navbar-brand" href="/">
									<img alt="" src="favicon.ico"></img>
									ft_transcendence
								</a>
							</div>
							<ul id="navlist" class="nav navbar-nav navbar-right">
								<li><Nav.Link as={Link} to="/Home">Home</Nav.Link></li>
								<li><Nav.Link as={Link} to="/Game">Game</Nav.Link></li>
								<li><Nav.Link as={Link} to="/About">About</Nav.Link></li>
								<li><Nav.Link as={Link} to="/Login">Login</Nav.Link></li>
							</ul>
						</div>
					</nav>
				}	
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

                        <Route
                            path="/login"
                            element={<Login />}
                         ></Route>
						             <Route
                            path="/*"
                            element={<NotFound />}
                        ></Route>
                    </Routes>
            </Router>
        );
    }
}

export default App;