import React, {useState, useEffect} from "react";

function Profile () {
	const authtoken = sessionStorage.getItem('authtoken');
	const [username, setUsername] = useState(null);
	const [profile_pic, setProfile] = useState(null);
	const [game_lost, setLost] = useState(null);
	const [game_win, setWin] = useState(null);

	useEffect(() => {
		fetch('http://localhost:8000/user/user_detail/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${authtoken}`
			},
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			console.log(data);
			setUsername(data.user.username);
			setProfile(data.user.profile_pic);
			setLost(data.user.loss);
			setWin(data.user.win);
		})
		.catch(error => {
			console.error('Error fetching user data:', error);
		});
	}, [authtoken]);

	return (
		<div>
			{username && <h2>Username: {username}</h2>}
			{profile_pic && <img src={profile_pic} alt="Profile" />}
			{game_lost !== null && <h3>game lost: {game_lost}</h3>}
			{game_win !== null && <h3>game win: {game_win}</h3>}
		</div>
	);
}

export default Profile;