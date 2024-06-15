import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import React from 'react';

import NavBar from "./components/navbar"
import Home from "./components/home";

// -----Game-----
import Game from "./components/game/game";
import ThreejsGame from "./components/game/threejs";
// import ThreejsGameAI from "./components/game/threejsai";
import Morpion from "./components/morpion/morpion";

// ------Tournament------
import Tournament from "./components/tournament/tournament";
import Matchmaking from "./components/tournament/Matchmaking";
import FtAuthTournament from "./components/tournament/42_auth_tournament";
import { UserProvider } from "./components/tournament/UserContext";
import { TournamentProvider } from "./components/tournament/TournamentContext";

// -----user-----
import Login from "./components/user/login";
import Profile from "./components/user/profile";
import Signup from "./components/user/signup";
import Logout from "./components/user/logout";
import Community from "./components/user/community"
import EditProfile from "./components/user/edit_profile"
import FtAuth from "./components/user/42_auth";
import UserPage from "./components/user/userPage";

// -----error-----
import NotFound from "./components/notfound";

// -----translation-----
import { useTranslation } from 'react-i18next'

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ThreejsGameAI from "./components/game/threejsai";

// const backendHost = 'http://' + window.location.hostname + ':8000';

function App () {
	const token = sessionStorage.getItem('authtoken')
	const user = JSON.parse(sessionStorage.getItem('user'))
	const isLoggedIn = !!token;
	
	const { t } = useTranslation()

      return (
          <Router>
            <div class="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
                <div class="bg-dark p-4">
                    <h5 class="text-body-emphasis h4">Collapsed content</h5>
                    <span class="text-body-secondary">Toggleable via the navbar brand.</span>
                </div>
            </div>
			<NavBar isLoggedIn={isLoggedIn} user={user}/>
			<UserProvider>
			<TournamentProvider>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/*" element={<NotFound />} />
				{/* -----Game----- */}
				<Route path="/Game" element={<Game />} />
				<Route path="/ThreejsGame" element={<ThreejsGame />} />
				<Route path="/Morpion" element={<Morpion />} />
				<Route path="/pong_ai" element={<ThreejsGameAI/>} />
				{/* -----Tournament----- */}
				<Route path="/tournament" element={<Tournament />} />
				<Route path="/tournament/Matchmaking" element={<Matchmaking />} />
				<Route path="/42_auth_tournament" element={<FtAuthTournament />} />
				{/* -----User----- */}
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/42_auth" element={<FtAuth />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/user_profile/:user_id" element={<UserPage />} />
				<Route path="/community" element={<Community />} />
				<Route path="/edit_profile" element={<EditProfile />} />
			</Routes>
		</TournamentProvider>
      	</UserProvider>
          </Router>
      );
}
export default App;
