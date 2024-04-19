import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

function NavBar() {
	return (
		<nav id="navbar" class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
					<Nav.Link as={Link} to="/">
						<a class="navbar-brand">
							<img alt="" src="favicon.ico"></img>
							ft_transcendence
						</a>	
					</Nav.Link>
				</div>
				<ul id="navlist" class="nav navbar-nav navbar-right">
					<li><Nav.Link as={Link} to="/Home">Home</Nav.Link></li>
					<li><Nav.Link as={Link} to="/Game">Game</Nav.Link></li>
					<li><Nav.Link as={Link} to="/About">About</Nav.Link></li>
					<li><Nav.Link as={Link} to="/Login">Login</Nav.Link></li>
				</ul>
			</div>
		</nav>
	)
}

export default NavBar;