import React from 'react';
import getCookie from '../utils/getCoockies';

class Signup extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            usernameError: '',
            passwordError: '',
            serverError: ''
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ usernameError: '', passwordError: '' });

        const username = event.target.username.value;
        if (username.length > 20) {
            this.setState({ usernameError: 'Username must be 20 characters or less' });
            return;
        }

        const password = event.target.password.value;
        if (password.length < 8) {
            this.setState({ passwordError: 'Password must be at least 8 characters long' });
            return;
        }

		const csrftoken = getCookie('csrftoken');
        const formData = new FormData(event.target);
        const JsonData = {
            username: formData.get('username'),
            password: formData.get('password'),
        };

        fetch('http://localhost:8000/user/signup/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
							'X-CSRFToken': csrftoken},
                body: JSON.stringify(JsonData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to register new user')
                }
                return response.json();
            })
            .then(data => {
                console.log('User data:', data);
                sessionStorage.setItem('authtoken', data.Token);
                sessionStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = "/";
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                this.setState({ serverError: error.message });
            });
        }

    render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Enter username</label>
          <input id="username" name="username" type="text" />
          {this.state.usernameError && <div>{this.state.usernameError}</div>}
          <br />
          <label htmlFor="password">Enter your password</label>
          <input id="password" name="password" type="password" />
          {this.state.passwordError && <div>{this.state.passwordError}</div>}
          <br />
          {this.state.error && <div>Error: {this.state.error}</div>}
          <br />
          <button>sign up!</button>
        </form>

    );
    }
}

export default Signup;