import React from 'react';
import getCookie from '../utils/getCoockies';

class Signup extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

		const csrftoken = getCookie('csrftoken');
        const formData = new FormData(event.target);
        const JsonData = {
            username: formData.get('username'),
            password: formData.get('password'),
        };

        fetch('http://localhost:8000/signup/', {
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
                localStorage.setItem('username', data.username);
                localStorage.setItem('password', data.password);
                localStorage.setItem('authtoken', data.Token);
                window.location.href = "/";
            })
            .catch(error => {console.error('There was a problem with the fetch operation:', error);});
    }

    render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Enter username</label>
          <input id="username" name="username" type="text" />
          <br></br>
          <label htmlFor="password">Enter your password</label>
          <input id="password" name="password" type="password" />
          <br></br>
          <button>sign up!</button>
            </form>

    );
    }
}

export default Signup;