import React, { useState } from "react";

function Login () {
		const [error, setError] = useState('');

		const handleSubmit = async (event) => {
			event.preventDefault();

			setError('');

			const formData = new FormData(event.target);
			const jsonData = {
				username: formData.get('username'),
				password: formData.get('password')
			};

			fetch('http://localhost:8000/user/login/', {
				method: 'POST',
				headers: {'Content-Type': 'application/json' },
									body: JSON.stringify(jsonData)
			})
			.then(response => { return response.json(); })
			.then(data => {
				console.log(data);
				if (data.Token) {
					sessionStorage.setItem('authtoken', data.Token);
					sessionStorage.setItem('user', JSON.stringify(data.user));
					window.location.href = "/";
				}
				else if (data.error){
					setError(data.error);
				}
			})
			.catch(error => {console.error('There was a problem with the fetch operation:', error);});
		};

		return (
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Enter username: </label>
				<input id="username" name="username" type="text" />
				<br />
				<label htmlFor="password">Enter your password: </label>
				<input id="password" name="password" type="password" />
				{error && <div>{error}</div>}
				<br />
				<button>Login !</button>
			</form>
		);
}



export default Login;