import React, { useState } from "react";

const backendHost = 'https://' + window.location.hostname + ':8000'; //becomes useless when we have nginx

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

			fetch(backendHost + '/user/login/', {
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
				<br />
				<button>Login !</button>
				<br />
				{/* <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-26412c396459fecd3b1ce2d889ece2036d24ca300aa21cd337d38320cd80f828&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F42_auth%2F&response_type=code"> */}
				<a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-26412c396459fecd3b1ce2d889ece2036d24ca300aa21cd337d38320cd80f828&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2F42_auth%2F&response_type=code">
					Login with 42 authentication !
				</a>
				{error && <div>{error}</div>}
			</form>
		);
}



export default Login;