// import { Link } from "react-router-dom";
// import { Nav } from "react-bootstrap";

import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfilePic from "./user/getProfilePic";


function NavBar(props) {
	return (
		<Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
			<Container id="containerNavBar">
				<Navbar.Brand as={Link} to="/">
					<img id="logo" alt="" src="favicon.ico"></img>Home
				</Navbar.Brand>
isLoggedIn ? <><Nav.Link as={Link} to="/community">Communiy</Nav.Link>
				<Navbar.Toggle aria-controls="navbar" />
				<Navbar.Collapse id="navbar">
					<Nav id="navBar" className="me-auto">
						{/* <Navbar.Brand as={Link} to="/">Home</Navbar.Brand> */}
						<Nav.Link as={Link} to="/Game">Game</Nav.Link>
           <Nav.Link as={Link} to="/tournament">Tournament</Nav.Link>
						<Nav.Link as={Link} to="/ThreejsGame">ThreeGame</Nav.Link>
						<Nav.Link as={Link} to="/Morpion">Morpion</Nav.Link>
						<Nav.Link as={Link} to="/about">About</Nav.Link>
						{props.isLoggedIn ? <><Nav.Link as={Link} to="/community">Community</Nav.Link>
										  <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
										</>
									  : <><Nav.Link as={Link} to="/login">Login</Nav.Link>
									  	<Nav.Link as={Link} to="/signup">Signup</Nav.Link>
									  	</>}
					</Nav>
				</Navbar.Collapse>
				{props.user && props.isLoggedIn && props.user.profile_pic && (
					<Nav.Link as={Link} to="/profile">
						<ProfilePic filename={props.user.profile_pic} />
					</Nav.Link>)}
			</Container>
		</Navbar>
	)
}

// function NavBar() {
// 	return (
// 		<nav id="navbar" class="navbar navbar-default">
// 			<div class="container-fluid">
// 				<div class="navbar-header">
// 					<Nav.Link as={Link} to="/">
// 						<a class="navbar-brand">
// 							<img alt="" src="favicon.ico"></img>
// 							ft_transcendence
// 						</a>	
// 					</Nav.Link>
// 				</div>
// 				<ul id="navlist" class="nav navbar-nav navbar-right">
// 					<li><Nav.Link as={Link} to="/Home">Home</Nav.Link></li>
// 					<li><Nav.Link as={Link} to="/Game">Game</Nav.Link></li>
// 					<li><Nav.Link as={Link} to="/About">About</Nav.Link></li>
// 					<li><Nav.Link as={Link} to="/Login">Login</Nav.Link></li>
// 				</ul>
// 			</div>
// 		</nav>
// 	)
// }

export default NavBar;