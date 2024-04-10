import React, {useState, useEffect} from "react";

function Logout () {
	const authtoken = localStorage.getItem('authtoken');

	useEffect(() => {
		fetch('http://localhost:8000/user/logout/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${authtoken}`
			},
		})
		.then(response => {
			if (!response.ok) {
				localStorage.removeItem('authtoken');
				window.location.href = "/";
			}
			return response.json();
		})
		.then(data => {
			console.log(data);
			localStorage.removeItem('authtoken');
			window.location.href = "/";
		})
		.catch(error => {
			console.error('Error fetching user data:', error);
			localStorage.removeItem('authtoken');
			window.location.href = "/";
		});
	}, [authtoken]);

	return (
	<h3>login out...</h3>
	);
}

export default Logout;