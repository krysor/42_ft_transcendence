import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import NavBar from "./components/navbar"
import Home from "./components/home";
import About from "./components/about";
import Game from "./components/game/game";
import Login from "./components/auth"
import NotFound from "./components/notfound";

import "./App.css";

function App() {
	return (
		<Router>
			<NavBar />
			<Routes>
				<Route path="/"		 element={<Home />}></Route>
				<Route path="/home"	 element={<Home />}></Route>
				<Route path="/game"	 element={<Game />}></Route>
				<Route path="/about" element={<About />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/*" 	 element={<NotFound />}></Route>
			</Routes>
		</Router>)
}

export default App;