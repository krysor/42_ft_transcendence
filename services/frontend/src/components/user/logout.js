import React, {useEffect} from "react";

const backendHost = 'http://' + window.location.hostname + ':8000'; //becomes useless when we have nginx

function Logout () {
	const authtoken = sessionStorage.getItem('authtoken');

	useEffect(() => {
		fetch(backendHost + '/user/logout/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${authtoken}`
			},
		})
		.then(response => {
			if (!response.ok) {
				sessionStorage.removeItem('authtoken');
				sessionStorage.removeItem('user');
				window.location.href = "/";
			}
			return response.json();
		})
		.then(data => {
			console.log(data);
			sessionStorage.removeItem('authtoken');
			sessionStorage.removeItem('user');
			window.location.href = "/";
		})
		.catch(error => {
			console.error('Error fetching user data:', error);
			sessionStorage.removeItem('authtoken');
			sessionStorage.removeItem('user');
			window.location.href = "/";
		});
	});

	return (
	<h3>login out...</h3>
	);
}

export default Logout;