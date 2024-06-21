import {
    Routes,
    Route
} from "react-router-dom";
import React, { useEffect } from 'react';

import NavBar from "./components/navbar"
import Home from "./components/home";

// -----Game-----
import Game from "./components/game/game";
import ThreejsGame from "./components/game/threejs";
// import ThreejsGameAI from "./components/game/threejsai";
import Morpion from "./components/morpion/morpion";
import MorpionVS from "./components/morpion/morpionvs";


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

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ThreejsGameAI from "./components/game/threejsai";
import { useNavigate } from 'react-router-dom';
// const backendHost = 'https://' + window.location.hostname + ':8000';
const backendHost = 'https://' + window.location.hostname + ':8000';


function App () {
	const token = sessionStorage.getItem('authtoken');
	const user = JSON.parse(sessionStorage.getItem('user'));
	const isLoggedIn = !!token;
	const navigate = useNavigate();

	useEffect(() => {
		const tok = sessionStorage.getItem('authtoken');
		if (tok) {

			fetch(backendHost + '/user/user_detail/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Token ${tok}`
				},
			})
			.then(response => { return response.json(); })
			.then(data => {
				console.log(data);
				if (data.user) {
					console.log("still loged in");
					sessionStorage.setItem('user', JSON.stringify(data.user));
					// navigate('/');
				}
				else {
					console.log("token invalid login out");
					sessionStorage.removeItem('authtoken');
					navigate('/');
				}
			})
		}
	}, [token]);

      return (
          <>
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
				<Route path="/Morpionvs" element={<MorpionVS />} />
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
          </>
      );
}
export default App;
