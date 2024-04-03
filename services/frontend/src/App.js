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
import NotFound from "./components/notfound";
import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

// class App extends Component {

//     render() {
//         return (
//             <Router>
//                 <h1>ft_transcendence</h1>

//                 <Navbar bg="dark" variant="dark">
//         <Container>
//           <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/Game">Game</Nav.Link>
//             <Nav.Link as={Link} to="/about">About</Nav.Link>
//             <Nav.Link as={Link} to="/login">Login</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>
//                 <Routes>
//                         <Route
//                             path="/"
//                             element={<Home />}
//                         ></Route>
//                         <Route
//                             path="/Game"
//                             element={<Game />}
//                         ></Route>
//                         <Route
//                             path="/about"
//                             element={<About />}
//                         ></Route>

//                         <Route
//                             path="/login"
//                             element={<Login />}
//                          ></Route>
// 						             <Route
//                             path="/*"
//                             element={<NotFound />}
//                         ></Route>
//                     </Routes>
//             </Router>
//         );
//     }
// }

class App extends Component {

    render() {
        
        const isToken = localStorage.getItem('authtoken')
        return (
            <Router>
                <h1>ft_transcendence</h1>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/Game">Game</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                            {/* Conditionally render Login or Profile link */}
                            {isToken ? (
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                            ) : (
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            )}
                        </Nav>
                    </Container>
                </Navbar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Game" element={<Game />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    {/* Route to display profile when authenticated */}
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </Router>
        );
    }
}

export default App;