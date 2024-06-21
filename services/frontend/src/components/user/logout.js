import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
const backendHost = 'https://' + window.location.hostname + ':8000'; //becomes useless when we have nginx

function Logout () {
	const authtoken = sessionStorage.getItem('authtoken');
	const navigate = useNavigate();
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
				navigate(`/`);
			}
			return response.json();
		})
		.then(data => {
			console.log(data);
			sessionStorage.removeItem('authtoken');
			sessionStorage.removeItem('user');
			navigate(`/`);
		})
		.catch(error => {
			console.error('Error fetching user data:', error);
			sessionStorage.removeItem('authtoken');
			sessionStorage.removeItem('user');
			navigate(`/`);
		});
	});

	return (
	<h3>login out...</h3>
	);
}

export default Logout;