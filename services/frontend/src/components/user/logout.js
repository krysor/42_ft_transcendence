import React, {useEffect} from "react";

function Logout () {
	const authtoken = sessionStorage.getItem('authtoken');

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
	}, [authtoken]);

	return (
	<h3>login out...</h3>
	);
}

export default Logout;